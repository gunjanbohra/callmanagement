import { Box, Typography, Divider } from '@mui/material';
import { formatCurrency } from '@/utils/format';

interface TotalSectionProps {
  totalBeforeTax: number;
  totalTaxAmount: number;
  grandTotal: number;
}

export function TotalSection({ 
  totalBeforeTax, 
  totalTaxAmount, 
  grandTotal 
}: TotalSectionProps) {
  return (
    <>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle1">
          Total Before Tax: ₹ {formatCurrency(totalBeforeTax)}
        </Typography>
        <Typography variant="subtitle1">
          Total Tax: ₹ {formatCurrency(totalTaxAmount)}
        </Typography>
        <Typography variant="h6" color="primary">
          Grand Total: ₹ {formatCurrency(grandTotal)}
        </Typography>
      </Box>
    </>
  );
}