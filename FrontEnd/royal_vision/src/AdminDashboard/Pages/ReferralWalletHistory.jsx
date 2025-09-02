import React, { useEffect, useState } from 'react';
import Table from '../../UserDashboard/Component/Table';
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
const ReferralWalletHistory = () => {
    const [referralWalletHistory, setReferralWalletHistory] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const columns = [
        {
            header: 'Referral to wallet Id',
            accessorFn: (row) => row._id || 'N/A',
            cell: (info) => (
                <span className="text-gray-300 font-medium">
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'User Id',
            accessorFn: (row) => row.userId?._id || 'N/A',
            cell: (info) => (
                <span className="text-blue-400 font-medium">
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'User Name',
            accessorFn: (row) => row.userId?.Name || 'N/A',
            cell: (info) => (
                <span className="text-blue-400 font-medium">
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'Email',
            accessorFn: (row) => row.userId?.EmailAddress || 'N/A',
            cell: (info) => (
                <span className="text-purple-400 font-medium">
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'Refered User Id',
            accessorFn: (row) => row.ReferedTo || 'N/A',
            cell: (info) => (
                <span className="text-blue-400 font-medium">
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'Investment Id',
            accessorFn: (row) => row.investmentId || 'N/A',
            cell: (info) => (
                <span className="text-blue-400 font-medium">
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'Investment Plan',
            accessorKey: 'investmentPlan',
            cell: (info) => (
                <span className="text-emerald-400 font-medium">
                    {info.getValue()}
                </span>
            )
        },
        {
            header: 'Investment Amount',
            accessorKey: 'InvestmentAmount',
            cell: (info) => (
                <span className="text-green-400 font-medium">
                    ${info.getValue().toLocaleString()}
                </span>
            )
        },
        {
            header: 'Amount To Wallet',
            accessorKey: 'AmountToWallet',
            cell: (info) => (
                <span className="text-amber-400 font-medium">
                    ${info.getValue().toLocaleString()}
                </span>
            )
        },
        // {
        //     header: 'Remaining Amount',
        //     accessorKey: 'RemainingInvestmentAmount',
        //     cell: (info) => (
        //         <span className="text-orange-400 font-medium">
        //             ${parseFloat(info.getValue()).toLocaleString()}
        //         </span>
        //     )
        // },
        {
            header: 'Date',
            accessorKey: 'createdAt',
            cell: (info) => (
                <span className="text-cyan-400 font-medium">
                    {formatTimestamp(info.getValue())}
                </span>
            )
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (info) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    info.getValue() === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                    {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
                </span>
            )
        }
    ];

    useEffect(() => {   
        const fetchReferralWalletHistory = async () => {
            try {
                const response = await fetch('https://overland-23a4680d9e06.herokuapp.com/api/admin/referralwallethistory');
                const data = await response.json()
                console.log(data);
                setReferralWalletHistory(data.data);
                setTotal(data.total);
                setLoading(false);  
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchReferralWalletHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center">
                Error loading referral wallet history
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-end items-center mb-6">
                <div className="text-gray-300">
                    Total: {total.toLocaleString()}
                </div>
            </div>
            <Table 
                data={referralWalletHistory} 
                columns={columns}
                pagination={true}
            />
        </div>  
    );
};

export default ReferralWalletHistory;