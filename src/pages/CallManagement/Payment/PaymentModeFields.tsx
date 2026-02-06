import { Box, TextField } from '@mui/material';
import { PaymentMode } from '@/types/payment';
import { UPI_DETAILS } from '@/constants/payment';
import { UpiDetails } from './UpiDetails';

interface PaymentModeFieldsProps {
  paymentMode: PaymentMode;
  formData: Record<string, string>;
  formErrors: Record<string, string | undefined>;
  onChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export function PaymentModeFields({
  paymentMode,
  formData,
  formErrors,
  onChange,
  disabled,
}: PaymentModeFieldsProps) {
  switch (paymentMode) {
    case 'upi':
      return (
        <>
          <UpiDetails details={UPI_DETAILS} />
          <TextField
            fullWidth
            label="UPI Reference Number"
            value={formData.upiReference || ''}
            onChange={onChange('upiReference')}
            error={!!formErrors.upiReference}
            helperText={formErrors.upiReference}
            margin="normal"
            disabled={disabled}
          />
        </>
      );
    case 'cheque':
      return (
        <>
          <TextField
            fullWidth
            label="Cheque Number"
            value={formData.chequeNumber || ''}
            onChange={onChange('chequeNumber')}
            error={!!formErrors.chequeNumber}
            helperText={formErrors.chequeNumber}
            margin="normal"
            disabled={disabled}
          />
          <TextField
            fullWidth
            label="Bank Name"
            value={formData.bankName || ''}
            onChange={onChange('bankName')}
            error={!!formErrors.bankName}
            helperText={formErrors.bankName}
            margin="normal"
            disabled={disabled}
          />
        </>
      );
    case 'imps_neft':
      return (
        <>
          <TextField
            fullWidth
            label="Transaction ID"
            value={formData.transactionId || ''}
            onChange={onChange('transactionId')}
            error={!!formErrors.transactionId}
            helperText={formErrors.transactionId}
            margin="normal"
            disabled={disabled}
          />
          <TextField
            fullWidth
            label="Bank Name"
            value={formData.bankName || ''}
            onChange={onChange('bankName')}
            error={!!formErrors.bankName}
            helperText={formErrors.bankName}
            margin="normal"
            disabled={disabled}
          />
        </>
      );
    default:
      return null;
  }
}