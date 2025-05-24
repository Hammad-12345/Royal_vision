import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const Table = ({ data, columns,pagination }) => {
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
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
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

  return (
    <div className="bg-gradient-to-br from-[#0F1120] to-[#1E2140] rounded-2xl p-6 shadow-lg text-white overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead className="text-gray-300 text-sm uppercase">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 text-center text-gray-400 bg-[#1E2140] border border-gray-700 rounded-lg">
                No data found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="bg-[#1E2140] hover:bg-[#2a2e52] transition rounded-lg"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {
        pagination && <div className="flex items-center justify-between mt-4 text-sm">
        <div>
          Page {pageIndex + 1} of {table.getPageCount()}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPageIndex(old => Math.max(old - 1, 0))}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPageIndex(old => {
              const maxPage = table.getPageCount() - 1;
              return Math.min(old + 1, maxPage);
            })}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      }
      
    </div>
  );
};

export default Table;
