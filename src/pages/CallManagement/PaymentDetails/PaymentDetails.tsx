import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { callState } from '@/store/call';
import { paymentState } from '@/store/payment';
import { PaymentType, PaymentMode } from '@/types/payment';
import { PageStepper } from '@/components/Layout/PageStepper';
import { FormAlert } from '@/components/common/FormAlert';

const PAYMENT_TYPES: { value: PaymentType; label: string }[] = [
  { value: 'care_pack', label: 'Care Pack' },
  { value: 'advance_collection', label: 'Advance Collection' },
  { value: 'repair_complete', label: 'Repair Complete' },
];

const PAYMENT_MODES: { value: PaymentMode; label: string }[] = [
  { value: 'upi', label: 'UPI' },
  { value: 'cash', label: 'Cash' },
  { value: 'imps_neft', label: 'IMPS/NEFT' },
  { value: 'cheque', label: 'Cheque' },
];

export function PaymentDetails() {
  const navigate = useNavigate();
  const { selectedCall } = useRecoilValue(callState);
  const [, setPaymentState] = useRecoilState(paymentState);
  
  const [paymentType, setPaymentType] = useState<PaymentType>('repair_complete');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('upi');
  const [error, setError] = useState('');

  if (!selectedCall) {
    navigate('/calls');
    return null;
  }

  const handlePaymentTypeChange = (event: SelectChangeEvent) => {
    setPaymentType(event.target.value as PaymentType);
    setError('');
  };

  const handlePaymentModeChange = (event: SelectChangeEvent) => {
    setPaymentMode(event.target.value as PaymentMode);
    setError('');
  };

  const handleNext = () => {
    if (!paymentType || !paymentMode) {
      setError('Please fill in all fields');
      return;
    }

    setPaymentState((prev) => ({
      ...prev,
      currentPayment: {
        callId: selectedCall.id,
        paymentType,
        paymentMode,
        timestamp: new Date().toISOString(),
      },
    }));

    navigate('/payment-amount');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <PageStepper activeStep={1} />

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Call ID: {selectedCall.id}
        </Typography>

        <FormAlert message={error} severity="error" />

        <form>
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Type</InputLabel>
            <Select
              value={paymentType}
              label="Payment Type"
              onChange={handlePaymentTypeChange}
            >
              {PAYMENT_TYPES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Mode of Payment</InputLabel>
            <Select
              value={paymentMode}
              label="Mode of Payment"
              onChange={handlePaymentModeChange}
            >
              {PAYMENT_MODES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate('/calls')}
            >
              Back
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}