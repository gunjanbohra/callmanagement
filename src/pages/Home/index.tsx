import { SlidersHorizontal } from 'lucide-react';
import { DashboardMetricCard } from '@/components/Dashboard/DashboardMetricCard';
import { DataTable } from '@/components/Dashboard/DataTable';

export function Home() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
          <SlidersHorizontal size={18} />
          <span className="text-sm font-semibold">Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardMetricCard
          title="Opening Balance"
          value={6000}
          color="red"
        />
        <DashboardMetricCard
          title="Cash Memo"
          value={0}
          color="blue"
        />
        <DashboardMetricCard
          title="Cash Deposit"
          value={0}
          color="green"
        />
        <DashboardMetricCard
          title="Revenue Settlement"
          value={0}
          color="yellow"
        />
      </div>

      <div className="space-y-6">
        <DataTable
          title="Daily Revenue Settlement"
          dateRange="01/02/2026 to 06/02/2026"
          hasData={false}
        />

        <DataTable
          title="Daily Cash Memo"
          dateRange="01/02/2026 to 06/02/2026"
          hasData={false}
        />
      </div>
    </div>
  );
}