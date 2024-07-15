import React from 'react';
import ProfileSidebar from '../../components/admin/AdminSideBar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import User from '../../components/admin/User'
const AdminUser: React.FC = () => {

  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <AdminNavbar />
        <div>
          <User />
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
