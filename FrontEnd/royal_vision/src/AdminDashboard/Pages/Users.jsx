import React, { useState, useEffect } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../UserDashboard/Component/Table';
import { FaUser } from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log(users)
  const [loading, setLoading] = useState(true);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('Name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('EmailAddress', {
      header: 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('DateOfBirth', {
      header: 'Date of Birth',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('ContactNumber', {
      header: 'Contact',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('_id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('profileImage', {
      header: 'Profile Image',
      cell: info => info.getValue() ? (
        <img 
          src={info.getValue()} 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <FaUser className="w-6 h-6 text-gray-500" />
        </div>
      ),
    }),
  ];

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-poppins font-bold">Users Management</h1>
      <Table 
        columns={columns}
        data={users}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default Users; 