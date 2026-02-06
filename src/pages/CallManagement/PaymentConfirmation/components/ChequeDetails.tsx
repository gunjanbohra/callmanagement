import { Box, TextField } from '@mui/material';

interface ChequeDetailsProps {
  chequeNumber: string;
  bankName: string;
  onChequeNumberChange: (number: string) => void;
  onBankNameChange: (name: string) => void;
  disabled?: boolean;
}

export function ChequeDetails({
  chequeNumber,
  bankName,
  onChequeNumberChange,
  onBankNameChange,
  disabled
}: ChequeDetailsProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Cheque Number"
        value={chequeNumber}
        onChange={(e) => onChequeNumberChange(e.target.value)}
        required
        margin="normal"
        disabled={disabled}
      />
      <TextField
        fullWidth
        label="Bank Name"
        value={bankName}
        onChange={(e) => onBankNameChange(e.target.value)}
        required
        margin="normal"
        disabled={disabled}
      />
    </Box>
  );
}