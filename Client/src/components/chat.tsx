import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSocket from '../hooks/useSocket';

interface ChatMessage {
  _id: string;
  senderId: string;
  message: string;
  createdAt: string;
}

const ChatInterface: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const socket = useSocket();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    if (socket && chatId) {
      console.log('Joining chat room with chatId:', chatId);
      socket.emit('joinRoom', chatId);

      socket.on('receiveMessage', (message: ChatMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    } else {
      console.error('ChatInterface: chatId is not defined');
    }
  }, [socket, chatId]);

  const handleSendMessage = () => {
    if (socket && newMessage.trim()) {
      const messageData = {
        chatId,
        senderId: 'currentUserId', // Replace with actual logged-in user's ID
        message: newMessage,
      };

      socket.emit('sendMessage', messageData);

      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center p-4 bg-blue-600 text-white">
        <img
          src="https://via.placeholder.com/50"
          alt="Owner"
          className="rounded-full w-10 h-10 mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">Owner's Name</h2>
          <p className="text-sm">Online</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-4 max-w-xs ${msg.senderId === 'currentUserId' ? 'ml-auto text-right' : ''}`}
          >
            <div
              className={`p-3 rounded-lg ${msg.senderId === 'currentUserId' ? 'bg-blue-500 text-white' : 'bg-white text-black border'}`}
            >
              <p>{msg.message}</p>
              <span className="block text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;