import { atom, selector } from 'recoil';
import { FinanceMetrics, Transaction } from '@/types/finance';

export const financeState = atom<FinanceMetrics>({
  key: 'financeState',
  default: {
    totalDueAmount: 25000,
    advancePaid: 10000,
    remainingBalance: 15000,
    lastUpdated: new Date().toISOString(),
  },
});

export const transactionsState = atom<Transaction[]>({
  key: 'transactionsState',
  default: [
    {
      id: '1',
      amount: 10000,
      type: 'advance',
      date: '2024-02-20T10:00:00Z',
      description: 'Initial advance payment',
    },
    {
      id: '2',
      amount: 25000,
      type: 'due',
      date: '2024-02-19T14:30:00Z',
      description: 'Project milestone 1',
    },
  ],
});

export const remainingBalanceSelector = selector({
  key: 'remainingBalanceSelector',
  get: ({ get }) => {
    const finance = get(financeState);
    return finance.totalDueAmount - finance.advancePaid;
  },
});