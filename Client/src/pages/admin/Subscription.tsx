import React from 'react';
import ProfileSidebar from '../../components/admin/AdminSideBar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import SubscriptionMain from '../../components/admin/SubscriptionMain';

const Subscription: React.FC = () => {

  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <AdminNavbar />
        <div>
          <SubscriptionMain />
        </div>
      </div>
    </div>
  );
};

export default Subscription;
