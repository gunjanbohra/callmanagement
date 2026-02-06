import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { PaymentMode } from '@/types/payment';

interface PaymentModeSelectorProps {
  value: PaymentMode;
  onChange: (mode: PaymentMode) => void;
  disabled?: boolean;
}

export function PaymentModeSelector({ value, onChange, disabled }: PaymentModeSelectorProps) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Payment Mode</InputLabel>
      <Select
        value={value}
        label="Payment Mode"
        onChange={(e) => onChange(e.target.value as PaymentMode)}
        disabled={disabled}
      >
        <MenuItem value="upi">UPI</MenuItem>
        <MenuItem value="cash">Cash</MenuItem>
        <MenuItem value="imps_neft">IMPS/NEFT</MenuItem>
        <MenuItem value="cheque">Cheque</MenuItem>
      </Select>
    </FormControl>
  );
}