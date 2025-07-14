import React, { useState, useEffect, useMemo } from 'react';
import Table from '../../UserDashboard/Component/Table';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
};

// Add styles for highlighted row
const styles = `
  .highlight-row {
    animation: highlight 2s ease-out;
  }

  @keyframes highlight {
    0% {
      background-color: rgba(59, 130, 246, 0.2);
    }
    100% {
      background-color: transparent;
    }
  }
`;

// Inject styles into document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  // console.log(investments)
  const [loading, setLoading] = useState(true);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  console.log(selectedInvestment)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {id} = useParams()

  // Add ref for table scrolling
  const tableRef = React.useRef(null);

  // Function to scroll to specific investment
  const scrollToInvestment = (investmentId) => {
    if (tableRef.current) {
      const element = document.getElementById(`investment-${investmentId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Find the closest tr element and add the highlight class
        const row = element.closest('tr');
        if (row) {
          row.classList.add('highlight-row');
          setTimeout(() => {
            row.classList.remove('highlight-row');
          }, 2000);
        }
      }
    }
  };

  const handleEdit = (investment) => {
    setSelectedInvestment(investment);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedInvestment(null);
    setIsModalOpen(false);
  };

  const handleUpdatePaymentMode = async () => {
    console.log(selectedInvestment)
    try {
      const response = await fetch(`https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/updateinvestments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedInvestment),
      });

      if (response.ok) {
        // Update the local state
        fetchInvestments();
        handleClose();
      } else {
        console.error('Failed to update payment mode');
      }
    } catch (error) {
      console.error('Error updating payment mode:', error);
    }
  };

  const handleDelete = async (investmentId) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      // alert(investmentId)
      try {
        const response = await fetch(`https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/deleteinvest/${investmentId}`, {
          method: 'DELETE',
        });
        const data=await response.json()
        if (response.ok) {
          toast.success(data.message);
          fetchInvestments()
          // Update the local state by removing the deleted investment
        } else {
          console.error('Failed to delete investment');
        }
      } catch (error) {
        console.error('Error deleting investment:', error);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Investment ID',
        cell: (info) => (
          <span className="font-medium">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: 'userId',
        header: 'User ID',
        cell: (info) => (
          <span className="font-medium">{info.getValue()}</span>
        ),
      },
      {
        accessorKey: 'userName',
        header: 'userName',
        cell: (info) => (
          <span className="text-purple-600 font-semibold hover:text-purple-800 transition-colors">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'userEmail',
        header: 'Email',
        cell: (info) => (
          <span className="text-blue-600 hover:text-blue-800 transition-colors">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'investmentPlan',
        header: 'Plan',
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Amount',
        cell: (info) => (
          <span className="font-semibold text-emerald-600">
            ${info.getValue().toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: 'paymentMode',
        header: 'Status',
        cell: (info) => (
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              info.getValue() === 'active' ? 'bg-green-100 text-green-800 border border-green-200' :
              info.getValue() === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
              info.getValue() === 'reject' ? 'bg-red-100 text-red-800 border border-red-200' :
              'bg-gray-100 text-gray-800 border border-gray-200'
            }`}>
              {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
            </span>
            {/* <button
              onClick={() => handleEdit(info.row.original)}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button> */}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: (info) => (
          <span className="text-gray-600 text-sm">{formatTimestamp(info.getValue())}</span>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex items-center">
            <button
              onClick={() => handleEdit(info.row.original)}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => handleDelete(info.row.original.id)}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const fetchInvestments = async () => {
    try {
      const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/investments');
      const data = await response.json();
      console.log(data)
      setInvestments(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching investments:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInvestments();
  }, []);

  // Add effect to handle ID parameter
  useEffect(() => {
    if (id && investments.length > 0 && !loading) {
      const investment = investments.find(inv => inv.id === parseInt(id));
      if (investment) {
        scrollToInvestment(investment.id);
      }
    }
  }, [id, investments, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      <div className="overflow-x-auto rounded-lg shadow-sm" ref={tableRef}>
        <div className="min-w-full">
          <Table 
            data={investments} 
            columns={columns} 
            pagination={true}
          />
        </div>
        
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl transform transition-all duration-300 scale-100 opacity-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Payment Mode</h2>
            
            {/* Screenshot Preview */}
            {selectedInvestment?.screenshot && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Screenshot
                </label>
                <div className="w-full rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={selectedInvestment.screenshot} 
                    alt="Payment Screenshot" 
                    className="w-full h-96 object-contain"
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Mode
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                defaultValue={selectedInvestment?.paymentMode}
                onChange={(e) => setSelectedInvestment({...selectedInvestment, paymentMode: e.target.value})}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdatePaymentMode()}
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investments; 