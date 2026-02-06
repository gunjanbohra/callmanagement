import { atom } from 'recoil';

interface OwnerMetrics {
  totalCalls: number;
  closedCalls: number;
  totalCollection: number;
  bankBalance: number;
}

interface PeriodMetrics {
  newCalls: number;
  closedCalls: number;
  pendingCalls: number;
}

interface CallAnalytics {
  daily: PeriodMetrics;
  weekly: PeriodMetrics;
  monthly: PeriodMetrics;
}

interface FinancialPeriodMetrics {
  totalCollection: number;
  advanceAdjusted: number;
  bankBalance: number;
}

interface FinancialMetrics {
  daily: FinancialPeriodMetrics;
  weekly: FinancialPeriodMetrics;
  monthly: FinancialPeriodMetrics;
}

interface EngineerPeriodMetrics {
  calls: number;
  collection: number;
}

interface EngineerMetrics {
  id: string;
  name: string;
  daily: EngineerPeriodMetrics;
  weekly: EngineerPeriodMetrics;
  monthly: EngineerPeriodMetrics;
}

export const ownerMetricsState = atom<OwnerMetrics>({
  key: 'ownerMetricsState',
  default: {
    totalCalls: 150,
    closedCalls: 120,
    totalCollection: 250000,
    bankBalance: 180000,
  },
});

export const callAnalyticsState = atom<CallAnalytics>({
  key: 'callAnalyticsState',
  default: {
    daily: {
      newCalls: 15,
      closedCalls: 12,
      pendingCalls: 3,
    },
    weekly: {
      newCalls: 85,
      closedCalls: 75,
      pendingCalls: 10,
    },
    monthly: {
      newCalls: 350,
      closedCalls: 320,
      pendingCalls: 30,
    },
  },
});

export const financialMetricsState = atom<FinancialMetrics>({
  key: 'financialMetricsState',
  default: {
    daily: {
      totalCollection: 25000,
      advanceAdjusted: 5000,
      bankBalance: 180000,
    },
    weekly: {
      totalCollection: 150000,
      advanceAdjusted: 30000,
      bankBalance: 180000,
    },
    monthly: {
      totalCollection: 600000,
      advanceAdjusted: 120000,
      bankBalance: 180000,
    },
  },
});

export const engineerPerformanceState = atom<EngineerMetrics[]>({
  key: 'engineerPerformanceState',
  default: [
    {
      id: '1',
      name: 'John Doe',
      daily: { calls: 5, collection: 15000 },
      weekly: { calls: 25, collection: 75000 },
      monthly: { calls: 100, collection: 300000 },
    },
    {
      id: '2',
      name: 'Jane Smith',
      daily: { calls: 4, collection: 12000 },
      weekly: { calls: 20, collection: 60000 },
      monthly: { calls: 80, collection: 240000 },
    },
  ],
});