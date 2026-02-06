// Update the import to use the new InvoiceDetails component
import { InvoiceDetails } from '@/components/Invoice/InvoiceDetails';

// ... rest of the imports remain the same

// Replace the InvoicePDF usage with InvoiceDetails in the Dialog
<Dialog
  open={showInvoice}
  onClose={handleCloseInvoice}
  maxWidth="lg"
  fullWidth
>
  <DialogContent>
    <InvoiceDetails
      payment={currentPayment}
      breakdown={breakdown}
      customerInfo={formData}
      onClose={handleCloseInvoice}
    />
  </DialogContent>
</Dialog>