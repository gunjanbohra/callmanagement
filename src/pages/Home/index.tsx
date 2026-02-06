import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { DashboardMetricCard } from '@/components/Dashboard/DashboardMetricCard';
import { DataTable } from '@/components/Dashboard/DataTable';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

interface FinancialMetrics {
  opening_balance: number;
  cash_memo: number;
  cash_deposit: number;
  revenue_settlement: number;
}

export function Home() {
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    opening_balance: 0,
    cash_memo: 0,
    cash_deposit: 0,
    revenue_settlement: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_metrics')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setMetrics({
          opening_balance: data.opening_balance || 0,
          cash_memo: data.cash_memo || 0,
          cash_deposit: data.cash_deposit || 0,
          revenue_settlement: data.revenue_settlement || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDateRange = () => {
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);

    return `${format(fiveDaysAgo, 'dd/MM/yyyy')} to ${format(today, 'dd/MM/yyyy')}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

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
          value={metrics.opening_balance}
          color="red"
        />
        <DashboardMetricCard
          title="Cash Memo"
          value={metrics.cash_memo}
          color="blue"
        />
        <DashboardMetricCard
          title="Cash Deposit"
          value={metrics.cash_deposit}
          color="green"
        />
        <DashboardMetricCard
          title="Revenue Settlement"
          value={metrics.revenue_settlement}
          color="yellow"
        />
      </div>

      <div className="space-y-6">
        <DataTable
          title="Daily Revenue Settlement"
          dateRange={getDateRange()}
          hasData={false}
        />

        <DataTable
          title="Daily Cash Memo"
          dateRange={getDateRange()}
          hasData={false}
        />
      </div>
    </div>
  );
}