import { atom } from 'recoil';
import { ReportState } from '@/types/report';

export const reportState = atom<ReportState>({
  key: 'reportState',
  default: {
    reports: [
      {
        id: '1',
        serialNo: 1,
        engineerMobile: '9876543210',
        engineerName: 'John Doe',
        callNo: 'CALL001',
        callDate: '2024-02-20',
        status: 'completed',
        callType: 'regular',
        paymentMode: 'upi',
        upiReference: 'UPI123456',
        totalAmount: 5000,
        cashReceivedBy: 'Jane Smith',
        cashReceivedDate: '2024-02-21',
        salaryAdvance: 2000,
        salaryProcessed: true,
      },
      // Add more sample data as needed
    ],
    isLoading: false,
    error: null,
  },
});