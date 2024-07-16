import { useEffect, useState } from 'react';
import { useFindAllUsersMutation, useBlockAndUnblockMutation } from '../../store/user/userApi';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
}

const User = () => {
  const [findAllUsers] = useFindAllUsersMutation();
  const [blockUnblock] = useBlockAndUnblockMutation();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await findAllUsers({ query: {} }).unwrap();
        setUsers(res.users);
        setFilteredUsers(res.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [findAllUsers]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      )
    );
  }, [searchTerm, users]);

  const handleUserStatus = async (userId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await blockUnblock({ userId, newStatus }).unwrap();
      setUsers(prevUsers => prevUsers.map(user => user._id === userId ? { ...user, active: newStatus } : user));
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">User List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{user.firstName} {user.lastName}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.phone}</td>
                  <td className="py-3 px-6 text-center">
                    <button className={`text-xs ${user.active ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white py-1 px-3 rounded-full mr-2`} onClick={() => handleUserStatus(user._id, user.active)}>
                      {user.active ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 px-6 text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;