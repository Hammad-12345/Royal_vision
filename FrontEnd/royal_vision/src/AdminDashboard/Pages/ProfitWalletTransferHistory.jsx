import React, { useState, useEffect } from 'react'
import Table from '../../UserDashboard/Component/Table'
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
const ProfitWalletTransferHistory = () => {
  const [transferData, setTransferData] = useState([])
  const [loading, setLoading] = useState(true)

  const columns = [
    {
      header: 'Profit Transfer Id',
      accessorKey: '_id',
      cell: (info) => (
        <span className="text-cyan-400 font-medium">#{info.getValue()}</span>
      )
    },
    {
      header: 'userId',
      accessorKey: 'userId._id',
      cell: (info) => (
        <span className="text-blue-400 font-medium">{info.getValue()}</span>
      )
    },
    {
      header: 'user email',
      accessorKey: 'userId.EmailAddress',
      cell: (info) => (
        <span className="text-purple-400 font-medium">{info.getValue()}</span>
      )
    },
    {
      header: 'investmentId',
      accessorKey: 'investmentId',
      cell: (info) => (
        <span className="text-indigo-400 font-medium">{info.getValue()}</span>
      )
    },
    {
      header: 'investmentPlan',
      accessorKey: 'investmentPlan',
      cell: (info) => (
        <span className="text-violet-400 font-medium">{info.getValue()}</span>
      )
    },
    {
      header: 'originalAmount',
      accessorKey: 'originalAmount',
      cell: (info) => (
        <span className="text-green-400 font-medium">${info.getValue()}</span>
      )
    },
    {
      header: 'profitAmount',
      accessorKey: 'profitAmount',
      cell: (info) => (
        <span className="text-emerald-400 font-medium">${info.getValue()}</span>
      )
    },
    {
      header: 'paymentMethod',
      accessorKey: 'paymentMethod',
      cell: (info) => (
        <span className="text-amber-400 font-medium">{info.getValue()}</span>
      )
    },
    {
      header: 'createdAt',
      accessorKey: 'createdAt',
      cell: (info) => (
        <span className="text-slate-400 text-sm">{formatTimestamp(info.getValue())}</span>
      )
    }
  ];

  useEffect(() => {
    const fetchTransferHistory = async () => {
      try {
        const response = await fetch('https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/PlanProfitToWallet', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers if needed
            // 'Authorization': `Bearer ${token}`
          },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log(data)
        setTransferData(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching transfer history:', error)
        setLoading(false)
      }
    }

    fetchTransferHistory()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    )
  }

  return (
    <div className="p-2">
      <Table 
        data={transferData} 
        columns={columns}
        pagination={true}
      />
    </div>
  )
}

export default ProfitWalletTransferHistory
