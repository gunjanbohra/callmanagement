import { Grid, Typography, Divider } from '@mui/material';
import { formatCurrency } from '@/utils/format';

interface TotalSectionProps {
  totalBeforeTax: number;
  totalTaxAmount: number;
  grandTotal: number;
}

export function TotalSection({ totalBeforeTax, totalTaxAmount, grandTotal }: TotalSectionProps) {
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1">
            Total Before Tax: ₹ {formatCurrency(totalBeforeTax)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1">
            Total Tax: ₹ {formatCurrency(totalTaxAmount)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" color="primary">
            Grand Total: ₹ {formatCurrency(grandTotal)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}