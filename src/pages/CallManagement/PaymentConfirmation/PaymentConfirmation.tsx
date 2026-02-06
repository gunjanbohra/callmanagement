import { useNavigate } from 'react-router-dom';
import { Box, Paper, Button } from '@mui/material';
import { PageStepper } from '@/components/Layout/PageStepper';
import { PageTitle } from '@/components/common/PageTitle';
import { FormAlert } from '@/components/common/FormAlert';
import {
  PaymentModeSelector,
  CustomerInfoFields,
  UpiPaymentDetails,
  ChequeDetails,
  BankTransferDetails,
} from './components';
import { usePaymentConfirmation } from './hooks/usePaymentConfirmation';

export function PaymentConfirmation() {
  const navigate = useNavigate();
  const {
    currentPayment,
    isLoading,
    error,
    paymentMode,
    selectedBankId,
    upiReference,
    chequeNumber,
    chequeBankName,
    customerInfo,
    bankAccounts,
    setPaymentMode,
    setSelectedBankId,
    setUpiReference,
    setChequeNumber,
    setChequeBankName,
    handleCustomerInfoChange,
    handleSubmit,
  } = usePaymentConfirmation();

  if (!currentPayment) {
    navigate('/calls');
    return null;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <PageStepper activeStep={4} />

      <Paper elevation={2} sx={{ p: 4 }}>
        <PageTitle 
          title="Payment Confirmation" 
          subtitle={`Call ID: ${currentPayment.callId}`}
        />

        <FormAlert message={error} severity="error" />

        <PaymentModeSelector
          value={paymentMode}
          onChange={setPaymentMode}
          disabled={isLoading}
        />

        <CustomerInfoFields
          data={customerInfo}
          onChange={handleCustomerInfoChange}
          disabled={isLoading}
        />

        {paymentMode === 'upi' && (
          <UpiPaymentDetails
            bankAccounts={bankAccounts}
            selectedBankId={selectedBankId}
            upiReference={upiReference}
            onBankChange={setSelectedBankId}
            onUpiReferenceChange={setUpiReference}
            disabled={isLoading}
          />
        )}

        {paymentMode === 'cheque' && (
          <ChequeDetails
            chequeNumber={chequeNumber}
            bankName={chequeBankName}
            onChequeNumberChange={setChequeNumber}
            onBankNameChange={setChequeBankName}
            disabled={isLoading}
          />
        )}

        {paymentMode === 'imps_neft' && (
          <BankTransferDetails
            bankAccounts={bankAccounts}
            disabled={isLoading}
          />
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => navigate('/payment-preview')}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Confirm Payment
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}