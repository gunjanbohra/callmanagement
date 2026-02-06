import React from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Download, Printer, Share2 } from 'lucide-react';
import { PaymentDetails } from '@/types/payment';
import { CostBreakdown } from '@/types/cost';
import { formatCurrency, formatDate } from '@/utils/format';

const COMPANY_DETAILS = {
  name: 'Service Company Ltd.',
  address: '123 Service Street, Tech City',
  phone: '+91 1234567890',
  email: 'service@company.com',
  gstn: '27AABCS1234N1Z5',
  state: 'Maharashtra',
  stateCode: '27',
};

interface InvoiceDetailsProps {
  payment: PaymentDetails;
  breakdown: CostBreakdown;
  customerInfo: {
    customerName?: string;
    address?: string;
    mobile: string;
    email: string;
  };
  onClose: () => void;
}

export function InvoiceDetails({ payment, breakdown, customerInfo, onClose }: InvoiceDetailsProps) {
  const invoiceNumber = `INV-${payment.callId}-${formatDate(new Date())}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Download logic remains the same
  };

  const handleShareWhatsApp = () => {
    // WhatsApp share logic remains the same
  };

  const calculateTaxes = (amount: number, taxRate: number) => {
    const cgst = (amount * (taxRate / 2)) / 100;
    const sgst = cgst;
    const igst = (amount * taxRate) / 100;
    return { cgst, sgst, igst };
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={2} sx={{ p: 4, maxWidth: 1000, mx: 'auto' }}>
        {/* Company Details */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>INVOICE</Typography>
          <Typography variant="body2">
            {COMPANY_DETAILS.name}
            <br />
            {COMPANY_DETAILS.address}
            <br />
            Phone: {COMPANY_DETAILS.phone} | Email: {COMPANY_DETAILS.email}
            <br />
            <strong>GSTN: {COMPANY_DETAILS.gstn}</strong>
            <br />
            State: {COMPANY_DETAILS.state} (Code: {COMPANY_DETAILS.stateCode})
          </Typography>
        </Box>

        {/* Invoice Details */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Invoice Number</Typography>
            <Typography variant="body1">{invoiceNumber}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Date</Typography>
            <Typography variant="body1">{formatDate(new Date())}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Call ID</Typography>
            <Typography variant="body1">{payment.callId}</Typography>
          </Box>
        </Box>

        {/* Customer Details */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Customer Details</Typography>
          <Typography variant="body1">
            {customerInfo.customerName && `Name: ${customerInfo.customerName}`}
            {customerInfo.address && <><br />Address: ${customerInfo.address}</>}
            <br />Mobile: {customerInfo.mobile}
            <br />Email: {customerInfo.email}
          </Typography>
        </Box>

        {/* Cost Breakdown Table */}
        <TableContainer sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">CGST</TableCell>
                <TableCell align="right">SGST</TableCell>
                <TableCell align="right">IGST</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Labour Charges */}
              <TableRow>
                <TableCell>Labour Charges</TableCell>
                <TableCell align="right">₹ {formatCurrency(breakdown.labour.amount)}</TableCell>
                {(() => {
                  const taxes = calculateTaxes(breakdown.labour.amount, breakdown.labour.taxRate);
                  return (
                    <>
                      <TableCell align="right">₹ {formatCurrency(taxes.cgst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(taxes.sgst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(taxes.igst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(breakdown.labour.total)}</TableCell>
                    </>
                  );
                })()}
              </TableRow>

              {/* Parts */}
              {breakdown.parts.map((part, index) => {
                const taxes = calculateTaxes(part.amount, part.taxRate);
                return (
                  <TableRow key={part.id}>
                    <TableCell>Part {index + 1}</TableCell>
                    <TableCell align="right">₹ {formatCurrency(part.amount)}</TableCell>
                    <TableCell align="right">₹ {formatCurrency(taxes.cgst)}</TableCell>
                    <TableCell align="right">₹ {formatCurrency(taxes.sgst)}</TableCell>
                    <TableCell align="right">₹ {formatCurrency(taxes.igst)}</TableCell>
                    <TableCell align="right">₹ {formatCurrency(part.total)}</TableCell>
                  </TableRow>
                );
              })}

              {/* Freight Charges */}
              <TableRow>
                <TableCell>Freight Charges</TableCell>
                <TableCell align="right">₹ {formatCurrency(breakdown.freight.amount)}</TableCell>
                {(() => {
                  const taxes = calculateTaxes(breakdown.freight.amount, breakdown.freight.taxRate);
                  return (
                    <>
                      <TableCell align="right">₹ {formatCurrency(taxes.cgst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(taxes.sgst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(taxes.igst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(breakdown.freight.total)}</TableCell>
                    </>
                  );
                })()}
              </TableRow>

              {/* Other Charges */}
              <TableRow>
                <TableCell>Other Charges</TableCell>
                <TableCell align="right">₹ {formatCurrency(breakdown.other.amount)}</TableCell>
                {(() => {
                  const taxes = calculateTaxes(breakdown.other.amount, breakdown.other.taxRate);
                  return (
                    <>
                      <TableCell align="right">₹ {formatCurrency(taxes.cgst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(taxes.sgst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(taxes.igst)}</TableCell>
                      <TableCell align="right">₹ {formatCurrency(breakdown.other.total)}</TableCell>
                    </>
                  );
                })()}
              </TableRow>

              {/* Totals */}
              <TableRow>
                <TableCell colSpan={5} align="right"><strong>Total Before Tax</strong></TableCell>
                <TableCell align="right">₹ {formatCurrency(breakdown.totalBeforeTax)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} align="right"><strong>Total Tax</strong></TableCell>
                <TableCell align="right">₹ {formatCurrency(breakdown.totalTaxAmount)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} align="right"><strong>Grand Total</strong></TableCell>
                <TableCell align="right"><strong>₹ {formatCurrency(breakdown.grandTotal)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<Share2 size={20} />}
            onClick={handleShareWhatsApp}
          >
            Share on WhatsApp
          </Button>
          <Button
            variant="outlined"
            startIcon={<Printer size={20} />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            variant="outlined"
            startIcon={<Download size={20} />}
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>

        <Typography 
          variant="caption" 
          display="block" 
          align="center" 
          sx={{ mt: 4, color: 'text.secondary' }}
        >
          This is a computer-generated invoice. No signature required.
          <br />
          For any queries, please contact our support team.
        </Typography>
      </Paper>
    </Box>
  );
}