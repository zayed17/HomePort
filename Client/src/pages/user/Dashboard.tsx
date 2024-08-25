import React from 'react';
import ProfileSidebar from '../../components/user/ProfileSidebar';
import ProfileNav from '../../components/user/ProfileNav';
import DashboardMain from '../../components/user/DashboardMain';

const Dashboard: React.FC = () => {

  return (
    <div className="flex h-auto bg-gray-100">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <ProfileNav />
        <div className="p-4">
          <DashboardMain />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
