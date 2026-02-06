import { Dialog, DialogContent } from '@mui/material';
import { FormAlert } from '@/components/common/FormAlert';
import { InvoiceDetails } from '@/components/Invoice/InvoiceDetails';
import { PaymentDetails } from '@/types/payment';
import { CostBreakdown } from '@/types/cost';

interface PaymentSuccessProps {
  showInvoice: boolean;
  onCloseInvoice: () => void;
  payment: PaymentDetails;
  breakdown: CostBreakdown;
}

export function PaymentSuccess({
  showInvoice,
  onCloseInvoice,
  payment,
  breakdown,
}: PaymentSuccessProps) {
  return (
    <>
      <FormAlert
        severity="success"
        message="Payment processed successfully! Generating invoice..."
      />

      <Dialog open={showInvoice} onClose={onCloseInvoice} maxWidth="lg" fullWidth>
        <DialogContent>
          <InvoiceDetails
            payment={payment}
            breakdown={breakdown}
            customerInfo={{ mobile: '', email: '' }}
            onClose={onCloseInvoice}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}