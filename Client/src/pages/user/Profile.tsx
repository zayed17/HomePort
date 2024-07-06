import React from 'react';
import ProfileSidebar from '../../components/user/ProfileSidebar';
import ProfileNav from '../../components/user/ProfileNav';
import UserDetails from '../../components/user/sections/profile/UserDetails';

const Profile: React.FC = () => {
  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4">
          <UserDetails />
        </div>
      </div>
    </div>
  );
};

export default Profile;
