import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space, Typography, Spin, Alert } from 'antd';
import { useFindAllUsersQuery, useBlockAndUnblockMutation } from '../../store/user/userApi';

const { Title } = Typography;

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
}

const User: React.FC = () => {
  const { data: users = [], error, isLoading, refetch } = useFindAllUsersQuery({});
  const [updateUserStatus] = useBlockAndUnblockMutation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    if (Array.isArray(users)) {
      setFilteredUsers(
        users.filter(user =>
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm)
        )
      );
    }
  }, [searchTerm, users]);

  const handleUserStatus = async (userId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await updateUserStatus({ userId, newStatus }).unwrap();
      refetch(); 
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      render: (text: string, record: User, index: number) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, user: User) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, user: User) => (
        <Space size="middle">
          <Button
            className={`text-white py-1 px-3 rounded ${user.active ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}
            onClick={() => handleUserStatus(user._id, user.active)}
          >
            {user.active ? 'Block' : 'Unblock'}
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><Spin tip="Loading..." /></div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8"><Alert message="Error" description="Failed to load users" type="error" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={2} className="text-center mb-8">User List</Title>
      <Input.Search
        placeholder="Search by name, email, or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-8 w-1/3"
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filteredUsers.map(user => ({ ...user, key: user._id }))}
        pagination={{ pageSize: 10 }}
        rowKey="_id"
        className="bg-white shadow-lg rounded-lg"
      />
    </div>
  );
};

export default User;