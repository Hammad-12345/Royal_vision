import React, { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../UserDashboard/Component/Table";
import { FaUsers, FaTimes } from "react-icons/fa";

const ReferalUser = () => {
  const [referrals, setReferrals] = useState([]);
  console.log(referrals);
  const [loading, setLoading] = useState(true);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("userId._id", {
      header: "Referral From (ID)",
      cell: (info) => (
        <span className="font-medium text-white">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("userId.EmailAddress", {
      header: "Referral From (Email)",
      cell: (info) => (
        <span className="text-blue-600 hover:text-blue-800 transition-colors">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("referralCode", {
      header: "Referral From (Code)",
      cell: (info) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("totalReferrals", {
      header: "Total Referrals",
      cell: (info) => (
        <span className="font-semibold text-emerald-600">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("referredTo", {
      header: "Referred To",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-400">{info.getValue()?.length || 0}</span>
          {info.getValue()?.length > 0 && (
            <button
              onClick={() => {
                setSelectedReferral(info.row.original);
                setShowModal(true);
              }}
              className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              View Details
            </button>
          )}
        </div>
      ),
    }),
  ];

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await fetch(
          "https://overlandbackendnew-d897dd9d7fdc.herokuapp.com/api/admin/referrals"
        );
        const data = await response.json();
        console.log(data);
        setReferrals(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching referrals:", error);
        setLoading(false);
      }
    };

    fetchReferrals();
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
        <div>
          <Table data={referrals} columns={columns} pagination={true} />
        </div>
      </div>

      {/* Referral Details Modal */}
      {showModal && selectedReferral && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-black">
                Referred Users
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {selectedReferral.referredTo.map((email, index) => (
                <div
                  key={index}
                  className="border-b py-3 last:border-b-0 space-y-0"
                >
                  <p className="font-semibold text-black">Email:</p>
                  <p className="text-sm text-gray-600">{email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferalUser;
