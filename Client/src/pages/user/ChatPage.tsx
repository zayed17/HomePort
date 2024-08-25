import React from 'react';
import ChatSidebar from '../../components/ChatSideBar';
import ChatInterface from '../../components/chat';
const ChatPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage;