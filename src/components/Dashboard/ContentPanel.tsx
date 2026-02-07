import { ReactNode } from 'react';

interface ContentPanelProps {
  title: string;
  children?: ReactNode;
  isEmpty?: boolean;
}

export function ContentPanel({ title, children, isEmpty = false }: ContentPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">
        {isEmpty ? (
          <div className="flex items-center justify-center py-12 bg-blue-50 rounded-lg">
            <p className="text-blue-600 font-medium">No data available</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
