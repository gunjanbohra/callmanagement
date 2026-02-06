import { Box, Typography, Grid } from '@mui/material';
import { BankAccount } from '@/store/settings';

interface BankTransferDetailsProps {
  bankAccounts: BankAccount[];
  disabled?: boolean;
}

export function BankTransferDetails({ bankAccounts, disabled }: BankTransferDetailsProps) {
  return (
    <Box sx={{ mt: 2 }}>
      {bankAccounts.map(bank => (
        <Box key={bank.id} sx={{ mb: 3, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Bank Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{bank.bankName}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Account Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{bank.accountName}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Account Number</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{bank.accountNumber}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">IFSC Code</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{bank.ifscCode}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" color="text.secondary">Branch</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{bank.branchName}</Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}