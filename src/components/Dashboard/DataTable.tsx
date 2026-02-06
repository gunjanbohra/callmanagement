import { SlidersHorizontal } from 'lucide-react';

interface DataTableProps {
  title: string;
  dateRange: string;
  hasData?: boolean;
}

export function DataTable({ title, dateRange, hasData = false }: DataTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-900">
          {title} ({dateRange})
        </h3>
        <button className="text-blue-600 hover:text-blue-700 transition-colors">
          <SlidersHorizontal size={20} />
        </button>
      </div>

      <div className="bg-cyan-50 p-8">
        {!hasData && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
