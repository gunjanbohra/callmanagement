import { atom } from 'recoil';
import { CallState } from '@/types/call';

export const callState = atom<CallState>({
  key: 'callState',
  default: {
    calls: [
      { 
        id: 'CALL001ABC', 
        status: 'in_warranty', 
        callStatus: 'call_pending',
        customerCollection: false 
      },
      { 
        id: 'CALL002XYZ', 
        status: 'out_warranty', 
        callStatus: 'repair_complete',
        customerCollection: true 
      },
      { 
        id: 'CALL003DEF', 
        status: 'in_warranty', 
        callStatus: 'pending_gas_charge',
        customerCollection: false 
      },
    ],
    selectedCall: null,
  },
});