import { FileText } from 'lucide-react';

interface DashboardMetricCardProps {
  title: string;
  value: number;
  color: 'red' | 'blue' | 'green' | 'yellow';
}

const colorClasses = {
  red: 'bg-red-50',
  blue: 'bg-blue-50',
  green: 'bg-green-50',
  yellow: 'bg-yellow-50',
};

const iconBgClasses = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
};

export function DashboardMetricCard({ title, value, color }: DashboardMetricCardProps) {
  return (
    <div className={`rounded-2xl p-6 ${colorClasses[color]} shadow-sm border border-gray-100`}>
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 ${iconBgClasses[color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <FileText size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
