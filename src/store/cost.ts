import { atom } from 'recoil';
import { CostState } from '@/types/cost';

export const costState = atom<CostState>({
  key: 'costState',
  default: {
    breakdown: {
      labour: { amount: 0, taxRate: 18, taxAmount: 0, total: 0 },
      parts: [],
      freight: { amount: 0, taxRate: 18, taxAmount: 0, total: 0 },
      other: { amount: 0, taxRate: 18, taxAmount: 0, total: 0 },
      carePack: { amount: 0, taxRate: 18, taxAmount: 0, total: 0 },
      advanceCollection: { amount: 0, taxRate: 18, taxAmount: 0, total: 0 },
      totalBeforeTax: 0,
      totalTaxAmount: 0,
      grandTotal: 0,
    },
  },
});