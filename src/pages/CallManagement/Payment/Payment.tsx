import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box, Paper } from '@mui/material';
import { paymentState } from '@/store/payment';
import { costState } from '@/store/cost';
import { financeState } from '@/store/finance';
import { PageStepper } from '@/components/Layout/PageStepper';
import { PageTitle } from '@/components/common/PageTitle';
import { PaymentForm } from './PaymentForm';
import { PaymentSuccess } from './PaymentSuccess';

export function Payment() {
  const navigate = useNavigate();
  const { currentPayment } = useRecoilValue(paymentState);
  const { breakdown } = useRecoilValue(costState);
  const setFinanceState = useSetRecoilState(financeState);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ mobile: '', email: '' });

  if (!currentPayment || !breakdown) {
    navigate('/calls');
    return null;
  }

  const handlePaymentSuccess = async (formData: { mobile: string; email: string }) => {
    setFinanceState((prev) => ({
      ...prev,
      advancePaid: prev.advancePaid + breakdown.grandTotal,
      lastUpdated: new Date().toISOString(),
    }));
    setCustomerInfo(formData);
    setIsSuccess(true);
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    navigate('/dashboard');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <PageStepper activeStep={3} />

      <Paper elevation={2} sx={{ p: 4 }}>
        <PageTitle 
          title="Payment Confirmation" 
          subtitle={`Call ID: ${currentPayment.callId}`}
        />

        {isSuccess ? (
          <PaymentSuccess 
            showInvoice={showInvoice}
            onCloseInvoice={handleCloseInvoice}
            payment={currentPayment}
            breakdown={breakdown}
            customerInfo={customerInfo}
          />
        ) : (
          <PaymentForm
            payment={currentPayment}
            breakdown={breakdown}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </Paper>
    </Box>
  );
}