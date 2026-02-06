import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { PageStepper } from '@/components/Layout/PageStepper';
import { FormAlert } from '@/components/common/FormAlert';
import { InvoiceDetails } from '@/components/Invoice/InvoiceDetails';
import { PaymentDetails } from '@/types/payment';
import { CostBreakdown } from '@/types/cost';

interface LocationState {
  paymentDetails: PaymentDetails & {
    breakdown: CostBreakdown;
  };
}

export function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.paymentDetails) {
      navigate('/calls');
    }
  }, [state, navigate]);

  if (!state?.paymentDetails) {
    return null;
  }

  const { paymentDetails } = state;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <PageStepper activeStep={5} />
      
      <Paper elevation={2} sx={{ p: 4 }}>
        <FormAlert
          severity="success"
          message="Payment processed successfully! Generating invoice..."
        />

        <InvoiceDetails
          payment={paymentDetails}
          breakdown={paymentDetails.breakdown}
          customerInfo={paymentDetails.customerInfo || { mobile: '', email: '' }}
          onClose={() => navigate('/dashboard')}
        />
      </Paper>
    </Box>
  );
}