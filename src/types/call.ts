export type CallStatus = 'repair_complete' | 'call_pending' | 'pending_gas_charge' | 'call_cancelled';

export interface Call {
  id: string;
  status: 'in_warranty' | 'out_warranty';
  callStatus: CallStatus;
  customerCollection: boolean;
  submittedAt?: string;
}

export interface CallState {
  calls: Call[];
  selectedCall: Call | null;
}