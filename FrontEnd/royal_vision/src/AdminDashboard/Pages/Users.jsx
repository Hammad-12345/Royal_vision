import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/admin/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-poppins font-bold text-gray-800">Users Management</h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Wallet Balance</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">${user.walletBalance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-poppins text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users; 