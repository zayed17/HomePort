import React from 'react'
import ProfileSidebar from '../../components/user/ProfileSidebar'
import ProfileNav from '../../components/user/ProfileNav'
import Chat from '../../components/user/sections/profile/Chat'

const ChatPage = () => {
  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4">
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default ChatPage