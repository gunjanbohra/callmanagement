export type PaymentMode = 'upi' | 'cash' | 'imps_neft' | 'cheque';
export type PaymentType = 'care_pack' | 'advance_collection' | 'repair_complete';

export interface CustomerInfo {
  name: string;
  address: string;
  mobile: string;
  email: string;
}

export interface PaymentDetails {
  callId: string;
  paymentType: PaymentType;
  paymentMode: PaymentMode;
  amount?: number;
  timestamp: string;
  customerInfo?: CustomerInfo;
}

export interface PaymentState {
  payments: PaymentDetails[];
  currentPayment: PaymentDetails | null;
}