import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Paper, Typography } from '@mui/material';
import { paymentState } from '@/store/payment';
import { costState } from '@/store/cost';
import { PageStepper } from '@/components/Layout/PageStepper';
import { CostBreakdownForm } from './CostBreakdownForm';
import { FormAlert } from '@/components/common/FormAlert';
import { CostBreakdown as ICostBreakdown } from '@/types/cost';

export function CostBreakdown() {
  const navigate = useNavigate();
  const { currentPayment } = useRecoilValue(paymentState);
  const [{ breakdown }, setCostState] = useRecoilState(costState);
  const [error, setError] = useState('');

  if (!currentPayment) {
    navigate('/calls');
    return null;
  }

  const handleUpdateBreakdown = (newBreakdown: ICostBreakdown) => {
    setCostState(prev => ({ ...prev, breakdown: newBreakdown }));
  };

  const handleNext = () => {
    let hasValidAmount = false;

    if (currentPayment.paymentType === 'advance_collection') {
      hasValidAmount = breakdown.advanceCollection.amount > 0;
    } else if (currentPayment.paymentType === 'care_pack') {
      hasValidAmount = breakdown.carePack.amount > 0;
    } else {
      // For repair_complete
      hasValidAmount = 
        breakdown.labour.amount > 0 ||
        breakdown.parts.some(part => part.amount > 0) ||
        breakdown.freight.amount > 0 ||
        breakdown.other.amount > 0;
    }

    if (!hasValidAmount) {
      setError('Please enter at least one cost item');
      return;
    }

    navigate('/payment-preview');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <PageStepper activeStep={2} />
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Cost Breakdown
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Call ID: {currentPayment.callId}
        </Typography>

        <FormAlert message={error} severity="error" />

        <CostBreakdownForm 
          payment={currentPayment}
          breakdown={breakdown}
          onUpdateBreakdown={handleUpdateBreakdown}
          onBack={() => navigate('/payment-details')}
          onNext={handleNext}
        />
      </Paper>
    </Box>
  );
}