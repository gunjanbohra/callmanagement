import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
import { formatCurrency } from '@/utils/format';

interface CostRowProps {
  label: string;
  field: string;
  amount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTaxRateChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  hideGST?: boolean;
}

const TAX_RATES = [5, 12, 18, 28];

export function CostRow({
  label,
  amount,
  taxRate,
  taxAmount,
  total,
  onAmountChange,
  onTaxRateChange,
  hideGST = false,
}: CostRowProps) {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={hideGST ? 6 : 4}>
        <TextField
          fullWidth
          label={label}
          value={amount || ''}
          onChange={onAmountChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            inputProps: { 
              inputMode: 'decimal',
              style: { textAlign: 'right' }
            }
          }}
        />
      </Grid>
      {!hideGST && (
        <>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Tax Rate</InputLabel>
              <Select value={taxRate} label="Tax Rate" onChange={onTaxRateChange}>
                {TAX_RATES.map((rate) => (
                  <MenuItem key={rate} value={rate}>
                    {rate}%
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Tax Amount"
              value={`₹ ${formatCurrency(taxAmount)}`}
              InputProps={{ 
                readOnly: true,
                inputProps: { style: { textAlign: 'right' } }
              }}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12} sm={hideGST ? 6 : 3}>
        <TextField
          fullWidth
          label="Total"
          value={`₹ ${formatCurrency(total)}`}
          InputProps={{ 
            readOnly: true,
            inputProps: { style: { textAlign: 'right' } }
          }}
        />
      </Grid>
    </Grid>
  );
}