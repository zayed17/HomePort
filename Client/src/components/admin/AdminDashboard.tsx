import React from 'react';
import { FaUsers, FaClipboardList, FaHome } from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen py-6 px-4">
      <h2 className="text-3xl font-bold text-DarkBlue mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaUsers className="mr-2" />
            User Management
          </h3>
          <p className="text-gray-700">
            Manage user accounts, view details, and update user information.
          </p>
          <a href="/admin/users" className="text-blue-500 mt-4 inline-block hover:underline">
            View All Users
          </a>
        </div>

\        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaClipboardList className="mr-2" />
            Subscription Management
          </h3>
          <p className="text-gray-700">
            Monitor and manage user subscriptions, upgrade/downgrade plans.
          </p>
          <a href="/admin/subscriptions" className="text-blue-500 mt-4 inline-block hover:underline">
            Manage Subscriptions
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FaHome className="mr-2" />
            Property Management
          </h3>
          <p className="text-gray-700">
            Add new properties, edit existing listings, and manage property details.
          </p>
          <a href="/admin/properties" className="text-blue-500 mt-4 inline-block hover:underline">
            Manage Properties
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;