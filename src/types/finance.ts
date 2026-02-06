export interface FinanceMetrics {
  totalDueAmount: number;
  advancePaid: number;
  remainingBalance: number;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'due' | 'advance';
  date: string;
  description: string;
}