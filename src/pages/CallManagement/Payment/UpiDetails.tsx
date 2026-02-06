import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { UPI_PROVIDERS } from '@/constants/payment';

interface UpiDetailsProps {
  selectedUpiId: string;
  onUpiChange: (upiId: string) => void;
}

export function UpiDetails({ selectedUpiId, onUpiChange }: UpiDetailsProps) {
  const selectedProvider = UPI_PROVIDERS.find(provider => provider.id === selectedUpiId) || UPI_PROVIDERS[0];

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select UPI ID</InputLabel>
        <Select
          value={selectedUpiId}
          label="Select UPI ID"
          onChange={(e) => onUpiChange(e.target.value)}
        >
          {UPI_PROVIDERS.map((provider) => (
            <MenuItem key={provider.id} value={provider.id}>
              {provider.id} ({provider.bank})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ my: 3, p: 2, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
        <img 
          src={selectedProvider.qrCode} 
          alt="QR Code"
          style={{ 
            width: 180, 
            height: 180, 
            objectFit: 'cover',
            borderRadius: '8px'
          }} 
        />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Scan QR code to pay
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ textAlign: 'left', mb: 3 }}>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">UPI ID</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{selectedProvider.id}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Name</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{selectedProvider.name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2" color="text.secondary">Bank</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2">{selectedProvider.bank}</Typography>
        </Grid>
      </Grid>
    </>
  );
}