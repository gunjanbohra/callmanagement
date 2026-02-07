import { RefreshCw, Lock, User } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onUpdatePassword?: () => void;
}

export function DashboardHeader({ onRefresh, onUpdatePassword }: DashboardHeaderProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 gap-3 shadow-sm">
      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-300"
      >
        <RefreshCw size={16} />
        <span className="text-sm font-medium">Refresh</span>
      </button>

      <button
        onClick={onUpdatePassword}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-300"
      >
        <Lock size={16} />
        <span className="text-sm font-medium">Update Password</span>
      </button>

      <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-300">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
          <User className="text-white" size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">Admin User</span>
          <span className="text-xs text-gray-500">admin@etcpr.com</span>
        </div>
      </div>
    </div>
  );
}
