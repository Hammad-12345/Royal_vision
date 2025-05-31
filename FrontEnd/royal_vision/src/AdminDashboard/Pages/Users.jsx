import React, { useState, useEffect } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../UserDashboard/Component/Table';
import { FaUser, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log(users)
  const [loading, setLoading] = useState(true);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('Name', {
      header: 'Name',
      cell: info => (
        <span className="font-medium text-white">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('EmailAddress', {
      header: 'Email',
      cell: info => (
        <span className="text-blue-600 hover:text-blue-800 transition-colors">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('DateOfBirth', {
      header: 'DOB',
      cell: info => (
        <span className="text-gray-400">
          {new Date(info.getValue()).toLocaleDateString()}
        </span>
      ),
    }),
    columnHelper.accessor('ContactNumber', {
      header: 'Contact',
      cell: info => (
        <span className="font-medium text-white">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('_id', {
      header: 'ID',
      cell: info => (
        <span className="font-medium text-white">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('profileImage', {
      header: 'Image',
      cell: info => info.getValue() ? (
        <img 
          src={info.getValue()} 
          alt="Profile" 
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
          <FaUser className="w-6 h-6 text-gray-500" />
        </div>
      ),
    }),
    columnHelper.accessor('_id', {
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <button
          onClick={() => handleDeleteUser(info.getValue())}
          className="p-2 text-red-600 hover:text-red-800 transition-colors flex items-center justify-center w-full text-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
        </button>
      ),
    }),
  ];

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      
      try {
        const response = await fetch(`https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/deleteuser/${userId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          toast.success('User deleted successfully!');
          fetchUsers()

        } else {
          console.error('Failed to delete user');
          toast.error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/users');
      const data = await response.json();
      setUsers(data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-xl shadow-md overflow-hidden">
        <div className="min-w-full">
          <Table 
            columns={columns}
            data={users}
            loading={loading}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Users; 