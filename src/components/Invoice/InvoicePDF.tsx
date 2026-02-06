import { useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { PaymentDetails } from '@/types/payment';
import { CostBreakdown } from '@/types/cost';
import { Box, Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import dayjs from 'dayjs';
import numeral from 'numeral';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 10,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  col4: {
    width: '25%',
  },
  col6: {
    width: '50%',
  },
  label: {
    fontSize: 10,
    color: '#666',
  },
  value: {
    fontSize: 10,
  },
  total: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#666',
    borderTopStyle: 'solid',
    paddingTop: 5,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  },
});

interface InvoicePDFProps {
  payment: PaymentDetails;
  breakdown: CostBreakdown;
  customerInfo: {
    mobile: string;
    email: string;
  };
}

const InvoiceDocument = ({ payment, breakdown, customerInfo }: InvoicePDFProps) => {
  const invoiceNumber = `INV-${payment.callId}-${dayjs().format('YYYYMMDD')}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.companyInfo}>
            Service Company Ltd.
            {'\n'}
            123 Service Street, Tech City
            {'\n'}
            Phone: +91 1234567890 | Email: service@company.com
          </Text>
        </View>

        {/* Invoice Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Details</Text>
          <View style={styles.row}>
            <View style={styles.col4}>
              <Text style={styles.label}>Invoice Number</Text>
              <Text style={styles.value}>{invoiceNumber}</Text>
            </View>
            <View style={styles.col4}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{dayjs().format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.col4}>
              <Text style={styles.label}>Call ID</Text>
              <Text style={styles.value}>{payment.callId}</Text>
            </View>
          </View>
        </View>

        {/* Rest of the invoice content remains the same */}
        {/* ... */}

        {/* Footer */}
        <Text style={styles.footer}>
          This is a computer-generated invoice. No signature required.
          {'\n'}
          For any queries, please contact our support team.
        </Text>
      </Page>
    </Document>
  );
};

export function InvoicePDF(props: InvoicePDFProps) {
  const [isClient, setIsClient] = useState(false);

  // Use useEffect to set isClient to true after component mounts
  useState(() => {
    setIsClient(true);
  });

  const fileName = `Invoice-${props.payment.callId}-${dayjs().format('YYYYMMDD')}.pdf`;

  return (
    <Box sx={{ textAlign: 'center' }}>
      {isClient && (
        <PDFDownloadLink
          document={<InvoiceDocument {...props} />}
          fileName={fileName}
        >
          {({ loading }) => (
            <Button
              variant="contained"
              startIcon={<Download />}
              disabled={loading}
            >
              {loading ? 'Generating PDF...' : 'Download Invoice'}
            </Button>
          )}
        </PDFDownloadLink>
      )}
    </Box>
  );
}