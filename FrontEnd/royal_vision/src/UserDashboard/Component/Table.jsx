import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const Table = ({ data, columns, pagination, loading }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    pageCount: Math.ceil(data.length / pageSize),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
      } else {
        setPageIndex(updater.pageIndex);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-2xl p-6 shadow-lg text-white overflow-x-auto w-full">
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <svg
            className="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-2xl p-6 shadow-lg text-white overflow-x-auto w-full">
      <table className="border-separate border-spacing-y-2 w-full">
        <thead className="text-gray-300 text-sm uppercase">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-3 text-center text-gray-400 bg-[#1E2140] border border-gray-700 rounded-lg"
              >
                No data found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-[#1E2140] hover:bg-[#2a2e52] transition rounded-lg"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <div>
            Page {pageIndex + 1} of {table.getPageCount()}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPageIndex((old) => {
                  const maxPage = table.getPageCount() - 1;
                  return Math.min(old + 1, maxPage);
                })
              }
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
