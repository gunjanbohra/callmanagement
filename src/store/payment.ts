import { atom } from 'recoil';
import { PaymentState } from '@/types/payment';

export const paymentState = atom<PaymentState>({
  key: 'paymentState',
  default: {
    payments: [],
    currentPayment: null,
  },
});