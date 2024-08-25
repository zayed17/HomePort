import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetChatMessagesQuery, useGetChatsQuery } from '../store/chattingApi';
import useSocket from '../hooks/useSocket';
import { useUserDetails } from '../hooks/useUserDetails';
import MediaPreviewModal from './MediaPreviewModal';

interface ChatMessage {
  _id: string;
  senderId: string;
  message: string;
  timestamp: string;
  photoUrl?: string;
  videoUrl?: string;
  reactions: { type: string; userId: string }[];
}

interface ChatParams {
  chatId?: string;
}

const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

const ChatPage: React.FC = () => {
  const { chatId } = useParams<ChatParams>();
  const navigate = useNavigate();
  const socket = useSocket();
  const { userDetails } = useUserDetails();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [media, setMedia] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [uploadingMessageId, setUploadingMessageId] = useState<string | null>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [reactionMessageId, setReactionMessageId] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [usersOnline, setUsersOnline] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: initialMessages = [], isError: messagesError, isLoading: messagesLoading } = useGetChatMessagesQuery(chatId || '', {
    skip: !chatId,
  });

  const { data: chats = [] } = useGetChatsQuery({}, {
    skip: !userDetails,
  });

  useEffect(() => {
    if (socket && chatId) {
      socket.emit('joinRoom', chatId);

      socket.on('receiveMessage', (message: ChatMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('receiveReaction', (data: {
        messageId: string;
        reaction: { type: string; userId: string };
      }) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === data.messageId
              ? {
                ...msg,
                reactions: msg.reactions.some(reaction => reaction.userId === data.reaction.userId)
                  ? msg.reactions.map(reaction =>
                    reaction.userId === data.reaction.userId
                      ? data.reaction
                      : reaction
                  )
                  : [...msg.reactions, data.reaction],
              }
              : msg
          )
        );
      });
      socket.on('userStatusUpdate', (userId: string, status: 'online' | 'offline') => {
        setUsersOnline((prevUsersOnline) => {
          const updatedUsersOnline = new Set(prevUsersOnline);
          if (status === 'online') {
            updatedUsersOnline.add(userId);
          } else {
            updatedUsersOnline.delete(userId);
          }
          return updatedUsersOnline;
        });
      });

      return () => {
        socket.off('receiveMessage');
        socket.off('receiveReaction');
        socket.off('userStatusUpdate');
      };
    }
  }, [socket, chatId]);

  useEffect(() => {
    if (chatId) {
      setMessages(initialMessages);
    }
  }, [initialMessages, chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const handleSendMessage = async () => {
    if (socket && (newMessage.trim() || media) && userDetails && chatId) {
      let photoUrl = '';

      if (media) {
        const formData = new FormData();
        formData.append('file', media);

        try {
          setUploadingMessageId('temp'); 
          const response = await fetch('http://localhost:3000/chat/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload media');
          }

          const data = await response.json();
          photoUrl = data.url || '';
        } catch (error) {
          console.error('Error uploading media:', error);
        } finally {
          setMedia(null);
          setMediaUrl(null); // Clear the preview URL
          setUploadingMessageId(null);
        }
      }

      const messageData = {
        chatId,
        senderId: userDetails._id,
        message: newMessage.trim(),
        photoUrl,
      };

      socket.emit('sendMessage', messageData);
      setNewMessage('');
    }
  };

  const handleAddReaction = (messageId: string, reactionType: string) => {
    if (socket && userDetails && chatId) {
      const reactionData = {
        messageId,
        reactionType,
        userId: userDetails._id,
        chatId,
      };
      socket.emit('addReaction', reactionData);
      setReactionMessageId(null);
    }
  };

  const handleBackToChatList = () => {
    navigate('/chat');
  };

  const selectedChat = chats.find(chat => chat._id === chatId);
  const otherParticipant = selectedChat?.participants.find(
    participant => participant.userId !== userDetails?._id
  );

  const handleMouseEnter = (messageId: string) => {
    setHoveredMessageId(messageId);
  };

  const handleMouseLeave = () => {
    if (reactionMessageId === null) {
      setHoveredMessageId(null);
    }
  };

  const handleReactionMouseEnter = (messageId: string) => {
    setReactionMessageId(messageId);
  };

  const handleReactionMouseLeave = () => {
    setReactionMessageId(null);
  };
  const handleSendMedia = () => {
    setShowPreviewModal(false); 
    handleSendMessage(); 
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMedia(file);
      setMediaUrl(URL.createObjectURL(file));
      setShowPreviewModal(true); 
    }
  };

  if (messagesLoading) return <div className="text-center mt-8">Loading messages...</div>;
  if (messagesError) return <div className="text-center mt-8">Error loading messages.</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {chatId && (

        <header className="bg-gray-800 text-gray-200 shadow-md py-2 px-6 flex items-center justify-between">
          <div className="flex items-center">
            {otherParticipant && (
              <div className="flex items-center">
                <img
                  src={otherParticipant.photo || 'https://via.placeholder.com/50'}
                  alt={otherParticipant.name || 'User'}
                  className="rounded-full w-12 h-12 border-2 border-gray-600 shadow-md"
                />
                 <div className="ml-3">
                  <h2 className="text-xl font-semibold">{otherParticipant.name || 'User'}</h2>
                  <p className={`text-sm ${usersOnline.has(otherParticipant.userId) ? 'text-green-400' : 'text-gray-400'}`}>
                    {usersOnline.has(otherParticipant.userId) ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleBackToChatList}
            className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
        </header>
      )}
      <main className="flex-1 overflow-y-auto p-4 relative bg-gray-100">
        {chatId ? (
          messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`mb-4 flex ${msg.senderId === userDetails?._id ? 'justify-end' : 'justify-start'} relative`}
              >
                <div
                  onMouseEnter={() => handleMouseEnter(msg._id)}
                  onMouseLeave={handleMouseLeave}
                  className={`p-3 rounded-lg max-w-xs w-full ${msg.senderId === userDetails?._id ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-600 border border-gray-300'} cursor-pointer relative shadow-sm hover:shadow-md transition duration-300`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
                  {msg.photoUrl && (
                    <div className="mt-2 relative">
                      {msg._id === uploadingMessageId && (
                        <div className="absolute inset-0 bg-gray-300 opacity-75 flex items-center justify-center">
                          <div className="loader"></div>
                        </div>
                      )}
                      <img
                        src={msg.photoUrl}
                        alt="Message attachment"
                        className="max-w-full rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                  {hoveredMessageId === msg._id && (
                    <div
                      onMouseEnter={() => handleReactionMouseEnter(msg._id)}
                      onMouseLeave={handleReactionMouseLeave}
                      className="absolute bottom-full left-0 right-0 mx-auto mt-1 flex space-x-2 bg-gray-200 border border-gray-300 rounded-lg shadow-lg p-2 z-10"
                    >
                      {reactions.map((reaction, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddReaction(msg._id, reaction)}
                          className={`text-2xl ${msg.reactions.some(r => r.type === reaction) ? 'text-gray-800' : 'text-gray-500'} hover:text-gray-700 transition duration-300`}
                        >
                          {reaction}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between items-end mt-2">
                    <span className="block text-xs text-gray-400">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                    {msg.reactions.length > 0 && (
                      <div className={`flex items-center space-x-1 ${msg.senderId === userDetails?._id ? 'justify-end' : 'justify-start'}`}>
                        {msg.reactions.map((reaction, index) => (
                          <span key={index} className="text-sm bg-gray-300 rounded-full px-2 py-1 shadow-sm">{reaction.type}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-auto mt-8">
              <img
                src="/assets/StartMessage.png"
                alt="No messages"
                className="w-3/4 max-w-md mb-4 object-cover"
              />
              <p className="text-gray-600 text-lg font-semibold">No messages yet.</p>
              <p className="text-gray-500">Start the conversation to connect with someone!</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-auto mt-8">
            <img
              src="/assets/noMessage.png"
              alt="Select a chat"
              className="w-full h-auto max-w-md object-cover mb-4"
            />
            <p className="text-gray-600 text-lg font-semibold">Select a chat to start messaging.</p>
            <p className="text-gray-500">Choose a conversation from the sidebar to begin chatting.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      {chatId && (
       <footer className="bg-gray-100 shadow-md p-4 flex items-center space-x-4 border-t border-gray-200">
       <label htmlFor="file-upload" className="flex items-center cursor-pointer">
         <svg
           className="w-6 h-6 text-gray-600 hover:text-gray-800 transition duration-300"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M15.172 7l-6.586 6.586a1 1 0 001.414 1.414L16.586 8.414M17 3h4v4M13 21H6a2 2 0 01-2-2V7a2 2 0 012-2h3.5"
           />
         </svg>
         <input
           type="file"
           id="file-upload"
           accept="image/*,video/*"
           onChange={handleFileChange}
           className="hidden"
         />
       </label>
       <input
         type="text"
         value={newMessage}
         onChange={(e) => setNewMessage(e.target.value)}
         placeholder="Type a message..."
         className="flex-1 bg-gray-200 border border-gray-300 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
       />
       <button
         onClick={handleSendMessage}
         className="bg-gray-700 text-gray-200 px-6 py-2 rounded-full shadow-lg hover:bg-gray-600 hover:shadow-xl transition duration-300 flex items-center space-x-2"
       >
         <svg
           className="w-5 h-5 text-gray-200"
           fill="none"
           stroke="currentColor"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M7 8h10M7 12h8m-3 4h3M5 16h2"
           />
         </svg>
         <span>Send</span>
       </button>
     </footer>
      )}
      {showPreviewModal && media && (
        <MediaPreviewModal
          mediaUrl={mediaUrl}
          onClose={() => setShowPreviewModal(false)}
          onSend={handleSendMedia}
        />
      )}
    </div>
  );
};

export default ChatPage;




