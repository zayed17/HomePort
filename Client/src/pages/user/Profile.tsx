// Profile.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import ProfileSidebar from '../../components/user/ProfileSidebar';
import ProfileNav from '../../components/user/ProfileNav';

const Profile: React.FC = () => {
  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
