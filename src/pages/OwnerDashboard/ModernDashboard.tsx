import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  LayoutDashboard,
  Phone,
  FileText,
  Settings,
  Users,
  Filter,
  Wallet,
  CreditCard,
  Banknote,
  Receipt
} from 'lucide-react';
import { DashboardHeader } from '../../components/Layout/DashboardHeader';
import { ownerMetricsState, financialMetricsState } from '../../store/owner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UpdatePasswordModal } from '../../components/Dashboard/UpdatePasswordModal';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Phone, label: 'Calls', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Users, label: 'Engineers', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const employeeCountData = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 15 },
  { month: 'Mar', count: 14 },
  { month: 'Apr', count: 18 },
  { month: 'May', count: 20 },
  { month: 'Jun', count: 22 },
];

const cashDepositData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 58000 },
  { month: 'Jun', amount: 70000 },
];

export function ModernDashboard() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const metrics = useRecoilValue(ownerMetricsState);
  const financialMetrics = useRecoilValue(financialMetricsState);

  const handleRefresh = () => {
    console.log('Refreshing dashboard...');
  };

  const handleApplyFilters = (filters: { startDate: string; endDate: string; role: string }) => {
    console.log('Filters applied:', filters);
    setFilterOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-0 h-full flex flex-col shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg text-gray-900">Dashboard</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                item.active
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <DashboardHeader
          onRefresh={handleRefresh}
          onUpdatePassword={() => setPasswordModalOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Actions */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back to your dashboard</p>
            </div>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Opening Balance Card */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Opening Balance</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ₹{financialMetrics.daily.bankBalance.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Current balance</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Wallet className="text-red-600" size={24} />
                </div>
              </div>
            </div>

            {/* Cash Memo Card */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Cash Memo</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ₹{financialMetrics.daily.totalCollection.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Daily collection</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            {/* Deposit Card */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Deposit</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ₹{financialMetrics.monthly.totalCollection.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Monthly total</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Banknote className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            {/* Settlement Card */}
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Settlement</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ₹{financialMetrics.daily.advanceAdjusted.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Adjusted today</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Receipt className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Employee Count Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Employee Count</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={employeeCountData}>
                  <defs>
                    <linearGradient id="colorEmployee" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorEmployee)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Cash Deposit Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Deposit</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={cashDepositData}>
                  <defs>
                    <linearGradient id="colorDeposit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorDeposit)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lists Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Revenue Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Daily Revenue</h3>
              </div>
              <div className="p-8">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <FileText className="text-blue-400" size={32} />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No data available</p>
                  <p className="text-xs text-gray-400 mt-1">Revenue data will appear here</p>
                </div>
              </div>
            </div>

            {/* Cash Memo Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Cash Memo</h3>
              </div>
              <div className="p-8">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Receipt className="text-blue-400" size={32} />
                  </div>
                  <p className="text-sm font-medium text-gray-500">No data available</p>
                  <p className="text-xs text-gray-400 mt-1">Memo records will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Filter Drawer */}
      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} onApply={handleApplyFilters} />

      {/* Update Password Modal */}
      <UpdatePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
    </div>
  );
}

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: { startDate: string; endDate: string; role: string }) => void;
}

function FilterDrawer({ open, onClose, onApply }: FilterDrawerProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [role, setRole] = useState('');

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setRole('');
  };

  const handleApply = () => {
    onApply({ startDate, endDate, role });
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filter Options</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                <option value="engineer">Engineer</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
