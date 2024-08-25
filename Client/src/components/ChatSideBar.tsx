import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetChatsQuery } from '../store/chattingApi';
import { useUserDetails } from '../hooks/useUserDetails';

const ChatSidebar: React.FC = () => {
  const { userDetails } = useUserDetails();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { data: chats = [], isLoading, isError } = useGetChatsQuery({}, {
    skip: !userDetails,
  });

  useEffect(() => {
    const pathChatId = location.pathname.split('/').pop(); 
    setSelectedChatId(pathChatId || null);
  }, [location.pathname]);

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    navigate(`/chat/${chatId}`);
  };

  if (isLoading) return <div className="text-center text-gray-600 py-4">Loading chats...</div>;
  if (isError) return <div className="text-center text-gray-600 py-4">Error loading chats.</div>;

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-300 shadow-md flex flex-col h-screen">
      <div className="bg-gray-200 p-3 border-b border-gray-300 text-gray-700 font-semibold text-lg">
        Chat Sidebar
      </div>

      <ul className="flex-1 overflow-y-auto mt-0">
        {chats.map((chat) => {
          const otherParticipant = chat.participants.find(
            (participant) => participant.userId !== userDetails?._id
          );

          return (
            <li
              key={chat._id}
              className={`flex items-center  cursor-pointer hover:bg-gray-200 rounded-lg p-2 m-4 transition duration-300 ${selectedChatId === chat._id ? 'bg-gray-300' : ''}`}
              onClick={() => handleChatSelect(chat._id)}
            >
              <img
                src={otherParticipant?.photo || 'https://via.placeholder.com/50'}
                alt={otherParticipant?.name}
                className="rounded-full w-10 h-10 mr-4 shadow-sm border border-gray-300"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-700">{otherParticipant?.name}</h3>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatSidebar;