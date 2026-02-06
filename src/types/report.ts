export interface EngineerReport {
  id: string;
  serialNo: number;
  engineerMobile: string;
  engineerName: string;
  callNo: string;
  callDate: string;
  status: 'pending' | 'completed' | 'cancelled';
  callType: 'regular' | 'emergency' | 'maintenance';
  paymentMode: 'upi' | 'cash';
  upiReference?: string;
  totalAmount: number;
  cashReceivedBy?: string;
  cashReceivedDate?: string;
  salaryAdvance: number;
  salaryProcessed: boolean;
}

export interface ReportState {
  reports: EngineerReport[];
  isLoading: boolean;
  error: string | null;
}