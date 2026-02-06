import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Grid } from '@mui/material';
import { BankAccount } from '@/store/settings';

interface UpiPaymentDetailsProps {
  bankAccounts: BankAccount[];
  selectedBankId: string;
  upiReference: string;
  onBankChange: (bankId: string) => void;
  onUpiReferenceChange: (reference: string) => void;
  disabled?: boolean;
}

export function UpiPaymentDetails({
  bankAccounts,
  selectedBankId,
  upiReference,
  onBankChange,
  onUpiReferenceChange,
  disabled
}: UpiPaymentDetailsProps) {
  const selectedBank = bankAccounts.find(bank => bank.id === selectedBankId);

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select Bank</InputLabel>
        <Select
          value={selectedBankId}
          label="Select Bank"
          onChange={(e) => onBankChange(e.target.value)}
          disabled={disabled}
        >
          {bankAccounts.map((bank) => (
            <MenuItem key={bank.id} value={bank.id}>
              {bank.bankName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedBank && (
        <>
          <Box sx={{ my: 3, textAlign: 'center' }}>
            <img
              src={selectedBank.qrCodeUrl}
              alt={`${selectedBank.bankName} QR Code`}
              style={{
                width: 200,
                height: 200,
                objectFit: 'cover',
                borderRadius: 8,
                marginBottom: 16
              }}
            />
            <Typography variant="caption" display="block" color="text.secondary">
              Scan QR code to pay
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">UPI ID</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{selectedBank.upiId}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Company Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{selectedBank.accountName}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Bank Details</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">
                {selectedBank.bankName}, {selectedBank.branchName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Account Number</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{selectedBank.accountNumber}</Typography>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="UPI Reference Number"
            value={upiReference}
            onChange={(e) => onUpiReferenceChange(e.target.value)}
            required
            disabled={disabled}
          />
        </>
      )}
    </Box>
  );
}