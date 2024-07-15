import React from 'react';
import ProfileSidebar from '../../components/admin/AdminSideBar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import Dashboard from '../../components/admin/AdminDashboard'
const AdminDashboard: React.FC = () => {

  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <div className="flex-1 md:ml-64 ml-20 transition-all duration-300">
        <AdminNavbar />
        <div>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
