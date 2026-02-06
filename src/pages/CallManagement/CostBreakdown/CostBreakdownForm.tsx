import { Box, Button } from '@mui/material';
import { PaymentDetails } from '@/types/payment';
import { CostBreakdown } from '@/types/cost';
import { CostBreakdownItems } from './CostBreakdownItems';
import { TotalSection } from './TotalSection';

interface CostBreakdownFormProps {
  payment: PaymentDetails;
  breakdown: CostBreakdown;
  onUpdateBreakdown: (breakdown: CostBreakdown) => void;
  onBack: () => void;
  onNext: () => void;
}

export function CostBreakdownForm({ 
  payment,
  breakdown,
  onUpdateBreakdown,
  onBack,
  onNext
}: CostBreakdownFormProps) {
  return (
    <form>
      <CostBreakdownItems 
        payment={payment}
        breakdown={breakdown}
        onUpdate={onUpdateBreakdown}
      />
      
      <TotalSection 
        totalBeforeTax={breakdown.totalBeforeTax}
        totalTaxAmount={breakdown.totalTaxAmount}
        grandTotal={breakdown.grandTotal}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onNext}
        >
          Next
        </Button>
      </Box>
    </form>
  );
}