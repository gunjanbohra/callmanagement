import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Wallet2, CreditCard, Banknote, DollarSign, Filter } from 'lucide-react';
import { StatCard } from '@/components/Dashboard/StatCard';
import { ContentPanel } from '@/components/Dashboard/ContentPanel';
import { AreaChart } from '@/components/Dashboard/AreaChart';
import { FilterDrawer } from '@/components/Dashboard/FilterDrawer';
import { ownerMetricsState } from '@/store/owner';

export function ModernDashboard() {
  const metrics = useRecoilValue(ownerMetricsState);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const employeeData = [
    { label: 'Jan', value: 12 },
    { label: 'Feb', value: 19 },
    { label: 'Mar', value: 15 },
    { label: 'Apr', value: 25 },
    { label: 'May', value: 22 },
    { label: 'Jun', value: 30 },
  ];

  const cashDepositData = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Jun', value: 67000 },
  ];

  const handleApplyFilters = (filters: { startDate: string; endDate: string; role: string }) => {
    console.log('Filters applied:', filters);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Filter size={16} />
          <span className="text-sm font-medium">Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Opening Balance"
          value={`₹${metrics.bankBalance.toLocaleString()}`}
          icon={Wallet2}
          iconColor="red"
        />
        <StatCard
          title="Cash Memo"
          value={metrics.closedCalls}
          icon={CreditCard}
          iconColor="blue"
        />
        <StatCard
          title="Deposit"
          value={`₹${metrics.totalCollection.toLocaleString()}`}
          icon={Banknote}
          iconColor="green"
        />
        <StatCard
          title="Settlement"
          value={`₹${(metrics.totalCollection * 0.85).toLocaleString()}`}
          icon={DollarSign}
          iconColor="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentPanel title="Daily Revenue" isEmpty />
        <ContentPanel title="Cash Memo" isEmpty />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentPanel title="Monthly Employee Count">
          <AreaChart data={employeeData} color="#3b82f6" height={250} />
        </ContentPanel>
        <ContentPanel title="Cash Deposit">
          <AreaChart data={cashDepositData} color="#10b981" height={250} />
        </ContentPanel>
      </div>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
}
