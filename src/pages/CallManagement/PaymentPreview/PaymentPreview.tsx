import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { paymentState } from '@/store/payment';
import { costState } from '@/store/cost';
import { PageStepper } from '@/components/Layout/PageStepper';
import { formatCurrency } from '@/utils/format';

export function PaymentPreview() {
  const navigate = useNavigate();
  const { currentPayment } = useRecoilValue(paymentState);
  const { breakdown } = useRecoilValue(costState);

  if (!currentPayment || !breakdown) {
    navigate('/calls');
    return null;
  }

  const CostRow = ({ label, amount }: { label: string; amount: number }) => (
    <Grid container spacing={2} sx={{ py: 1 }}>
      <Grid item xs={8}>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="right">₹ {formatCurrency(amount)}</Typography>
      </Grid>
    </Grid>
  );

  const renderCostBreakdown = () => {
    switch (currentPayment.paymentType) {
      case 'advance_collection':
        return (
          <>
            <CostRow 
              label="Advance Collection Amount" 
              amount={breakdown.advanceCollection.amount} 
            />
            <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <CostRow 
                label="Total Before Tax" 
                amount={breakdown.advanceCollection.amount} 
              />
              <CostRow 
                label="Total Tax" 
                amount={breakdown.advanceCollection.taxAmount} 
              />
              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <CostRow 
                  label="Grand Total" 
                  amount={breakdown.advanceCollection.total} 
                />
              </Box>
            </Box>
          </>
        );

      case 'care_pack':
        return (
          <>
            <CostRow 
              label="Care Pack Amount" 
              amount={breakdown.carePack.amount} 
            />
            <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <CostRow 
                label="Total Before Tax" 
                amount={breakdown.carePack.amount} 
              />
              <CostRow 
                label="Total Tax" 
                amount={breakdown.carePack.taxAmount} 
              />
              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <CostRow 
                  label="Grand Total" 
                  amount={breakdown.carePack.total} 
                />
              </Box>
            </Box>
          </>
        );

      case 'repair_complete':
        return (
          <>
            <CostRow 
              label="Labour Charges" 
              amount={breakdown.labour.amount} 
            />
            
            {breakdown.parts.map((part, index) => (
              <CostRow 
                key={part.id}
                label={`Part ${index + 1}`}
                amount={part.amount}
              />
            ))}
            
            <CostRow 
              label="Freight Charges" 
              amount={breakdown.freight.amount} 
            />
            <CostRow 
              label="Other Charges" 
              amount={breakdown.other.amount} 
            />

            <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <CostRow 
                label="Total Before Tax" 
                amount={breakdown.totalBeforeTax} 
              />
              <CostRow 
                label="Total Tax" 
                amount={breakdown.totalTaxAmount} 
              />
              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <CostRow 
                  label="Grand Total" 
                  amount={breakdown.grandTotal} 
                />
              </Box>
            </Box>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <PageStepper activeStep={3} />

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Payment Preview
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Call ID: {currentPayment.callId}
        </Typography>

        <Box sx={{ mt: 4 }}>
          {renderCostBreakdown()}

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate('/payment-amount')}
            >
              Back
            </Button>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/payment-confirmation')}
            >
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}