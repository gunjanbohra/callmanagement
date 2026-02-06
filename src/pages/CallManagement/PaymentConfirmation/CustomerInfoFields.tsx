import { Grid, TextField } from '@mui/material';
import { CustomerInfo } from '@/types/payment';

interface CustomerInfoFieldsProps {
  data: CustomerInfo;
  onChange: (field: keyof CustomerInfo, value: string) => void;
  disabled?: boolean;
}

export function CustomerInfoFields({ data, onChange, disabled }: CustomerInfoFieldsProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Customer Name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          required
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
          required
          multiline
          rows={3}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Mobile Number"
          value={data.mobile}
          onChange={(e) => onChange('mobile', e.target.value)}
          required
          inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Email (Optional)"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
}