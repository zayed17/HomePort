// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useGetChatsQuery } from '../../store/chatting/chattingApi';
// import { useUserDetails } from '../../hooks/useUserDetails';
// import { FiSearch, FiMessageCircle } from 'react-icons/fi';

// const ChatSidebar: React.FC = () => {
//   const { userDetails } = useUserDetails();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [filteredChats, setFilteredChats] = useState<any[]>([]);

//   const { data: chats = [], isLoading, isError } = useGetChatsQuery({}, {
//     skip: !userDetails,
//   });
// console.log(chats,"chants checking on console")
//   useEffect(() => {
//     const pathChatId = location.pathname.split('/').pop(); 
//     setSelectedChatId(pathChatId || null);
//   }, [location.pathname]);

//   useEffect(() => {
//     setFilteredChats(
//       chats.filter((chat:any) => {
//         const otherParticipant = chat.participants.find(
//           (participant:any) => participant.userId !== userDetails?._id
//         );
//         return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
//       })
//     );
//   }, [searchQuery, chats, userDetails]);



//   const handleChatSelect = (chatId: string) => {
//     setSelectedChatId(chatId);
//     navigate(`/chat/${chatId}`);
//   };

//   if (isLoading) return <div className="flex items-center justify-center h-screen text-gray-600">Loading chats...</div>;
//   if (isError) return <div className="flex items-center justify-center h-screen text-red-600">Error loading chats.</div>;

//   return (
//     <div className="w-60 bg-gray-100 border-r border-gray-300 flex flex-col h-screen">
//       <div className="bg-gray-200 p-3 flex items-center justify-between border-b border-gray-300">
//         <div className="flex items-center space-x-2">
//           <FiMessageCircle className="text-xl text-gray-700" />
//           <span className="text-gray-700 font-bold text-lg">Chats</span>
//         </div>
//       </div>

//       <div className="p-3">
//         <div className="relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search..."
//             className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-full bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent"
//           />
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>
//       </div>

//       <ul className="flex-1 overflow-y-auto">
//         {filteredChats.length > 0 ? (
//           filteredChats.map((chat) => {
//             const otherParticipant = chat.participants.find(
//               (participant:any) => participant.userId !== userDetails?._id
//             );

//             return (
//               <li
//                 key={chat._id}
//                 className={`cursor-pointer hover:bg-gray-200 p-3 transition duration-200 ${selectedChatId === chat._id ? 'bg-gray-300 border-l-2 border-gray-600' : ''}`}
//                 onClick={() => handleChatSelect(chat._id)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <img
//                     src={otherParticipant?.photo || 'https://via.placeholder.com/40'}
//                     alt={otherParticipant?.name}
//                     className="rounded-full w-10 h-10 object-cover border-2 border-gray-300"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm font-semibold text-gray-800 truncate">{otherParticipant?.name}</h3>
//                     <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
//                   </div>
//                 </div>
//               </li>
//             );
//           })
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500 text-sm">No chats found</div>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default ChatSidebar;




import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetChatsQuery } from '../../store/chatting/chattingApi';
import { useUserDetails } from '../../hooks/useUserDetails';
import { FiSearch, FiMessageCircle } from 'react-icons/fi';

const ChatSidebar: React.FC = () => {
  const { userDetails } = useUserDetails();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: chats = [], isLoading, isError } = useGetChatsQuery({}, {
    skip: !userDetails,
  });

  useEffect(() => {
    // Extract chat ID from URL and update selectedChatId
    const pathChatId = location.pathname.split('/').pop();
    if (pathChatId !== selectedChatId) {
      setSelectedChatId(pathChatId || null);
    }
  }, [location.pathname, selectedChatId]);

  // Filter chats memoized to avoid unnecessary re-computation
  const filteredChats = useMemo(() => {
    if (!chats.length || !userDetails) return [];
    console.log("chding")
    return chats.filter((chat: any) => {
      const otherParticipant = chat.participants.find(
        (participant: any) => participant.userId !== userDetails._id
      );
      return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [chats, searchQuery, userDetails]);

  const handleChatSelect = (chatId: string) => {
    if (chatId !== selectedChatId) {
      setSelectedChatId(chatId);
      navigate(`/chat/${chatId}`);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Loading chats...</div>;
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen text-red-600">Error loading chats.</div>;
  }

  return (
    <div className="w-60 bg-gray-100 border-r border-gray-300 flex flex-col h-screen">
      <div className="bg-gray-200 p-3 flex items-center justify-between border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <FiMessageCircle className="text-xl text-gray-700" />
          <span className="text-gray-700 font-bold text-lg">Chats</span>
        </div>
      </div>

      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-full bg-white text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat: any) => {
            const otherParticipant = chat.participants.find(
              (participant: any) => participant.userId !== userDetails._id
            );

            return (
              <li
                key={chat._id}
                className={`cursor-pointer hover:bg-gray-200 p-3 transition duration-200 ${selectedChatId === chat._id ? 'bg-gray-300 border-l-2 border-gray-600' : ''}`}
                onClick={() => handleChatSelect(chat._id)}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={otherParticipant?.photo || 'https://via.placeholder.com/40'}
                    alt={otherParticipant?.name}
                    className="rounded-full w-10 h-10 object-cover border-2 border-gray-300"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{otherParticipant?.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">No chats found</div>
        )}
      </ul>
    </div>
  );
};

export default ChatSidebar;
