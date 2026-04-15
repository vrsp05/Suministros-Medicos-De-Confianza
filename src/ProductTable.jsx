import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import * as XLSX from 'xlsx';

export default function ProductTable({ data }) {
  const [filtering, setFiltering] = useState('');

  const columns = useMemo(() => [
    { header: 'Marca', accessorKey: 'brand' },
    { header: 'Descripción', accessorKey: 'description' },
    { header: 'Medida', accessorKey: 'size' },
    { header: 'Referencia', accessorKey: 'reference' },
    { 
      header: 'Estado', 
      accessorKey: 'stock',
      cell: (info) => (
        <span className={`font-bold ${info.getValue() === 'Disponible' ? 'text-green-600' : 'text-red-500'}`}>
          {info.getValue() || 'Consultar'}
        </span>
      )
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Logic for pages
    state: { globalFilter: filtering },
    onGlobalFilterChange: setFiltering,
    initialState: { pagination: { pageSize: 15 } } // Show 15 per page
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Catálogo");
    XLSX.writeFile(workbook, "Catalogo_Suministros_Medicos.xlsx");
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <input
            value={filtering}
            onChange={e => setFiltering(e.target.value)}
            placeholder="Buscar en miles de productos..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition-all"
          />
          <span className="absolute left-3 top-3.5 text-gray-400 pointer-events-none">🔍</span>
        </div>

        {/* Export Button */}
        <button 
          onClick={exportToExcel}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-md flex items-center gap-2"
        >
          📥 Descargar Excel (.xlsx)
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-blue-900 border-b">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-5 text-sm font-black uppercase tracking-tighter text-blue-900 bg-blue-50/50">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-50">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* High-Visibility Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
                <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold disabled:bg-gray-200 disabled:text-gray-400 hover:bg-blue-700 transition-all shadow-md"
                >
                {"<<"}
                </button>
                <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold disabled:bg-gray-200 disabled:text-gray-400 hover:bg-blue-700 transition-all shadow-md"
                >
                Anterior
                </button>
                <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold disabled:bg-gray-200 disabled:text-gray-400 hover:bg-blue-700 transition-all shadow-md"
                >
                Siguiente
                </button>
                <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold disabled:bg-gray-200 disabled:text-gray-400 hover:bg-blue-700 transition-all shadow-md"
                >
                {">>"}
                </button>
            </div>
            
            <div className="flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100 shadow-sm">
                <span className="text-sm font-medium text-blue-900">Página</span>
                <span className="text-lg font-black text-blue-700">{table.getState().pagination.pageIndex + 1}</span>
                <span className="text-sm font-medium text-blue-900">de</span>
                <span className="text-lg font-black text-blue-700">{table.getPageCount()}</span>
            </div>
            </div>
    </div>
  );
}