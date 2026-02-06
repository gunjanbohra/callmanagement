import { RefreshCw, Lock, Zap } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onUpdatePassword?: () => void;
}

export function DashboardHeader({ onRefresh, onUpdatePassword }: DashboardHeaderProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 gap-3">
      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        <Zap size={20} />
      </button>

      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
      >
        <RefreshCw size={16} />
        <span className="text-sm font-medium">Refresh</span>
      </button>

      <button
        onClick={onUpdatePassword}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
      >
        <Lock size={16} />
        <span className="text-sm font-medium">Update Password</span>
      </button>

      <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">A</span>
        </div>
        <span className="text-sm font-medium text-gray-700">adminETCPR</span>
      </div>
    </div>
  );
}
