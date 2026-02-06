import { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Upload, Download, X } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { callState } from '@/store/call';
import { FormAlert } from '@/components/common/FormAlert';

interface ImportedCall {
  id: string;
  customerName: string;
  mobile: string;
  address: string;
  product: string;
  serialNumber: string;
}

export function CallImport() {
  const [, setCallState] = useRecoilState(callState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewData, setPreviewData] = useState<ImportedCall[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.xlsx')) {
        setError('Please upload an Excel file (.xlsx)');
        return;
      }
      // Mock file processing
      setPreviewData([
        {
          id: 'CALL001',
          customerName: 'John Doe',
          mobile: '9876543210',
          address: '123 Main St',
          product: 'AC',
          serialNumber: 'SN001',
        },
        // Add more mock data as needed
      ]);
      setError('');
    }
  };

  const handleImport = () => {
    try {
      // Mock import process
      setCallState(prev => ({
        ...prev,
        calls: [
          ...prev.calls,
          ...previewData.map(call => ({
            id: call.id,
            status: 'in_warranty',
            callStatus: 'call_pending',
            customerCollection: false,
          })),
        ],
      }));
      setSuccess('Calls imported successfully');
      setPreviewData([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to import calls');
    }
  };

  const handleDownloadTemplate = () => {
    // Mock template download
    console.log('Downloading template...');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Import Calls
        </Typography>

        <FormAlert message={error} severity="error" />
        <FormAlert message={success} severity="success" />

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<Download size={20} />}
            onClick={handleDownloadTemplate}
          >
            Download Template
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            startIcon={<Upload size={20} />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Excel File
          </Button>
        </Box>

        {previewData.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>

            <TableContainer sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Call ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Serial Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewData.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell>{call.id}</TableCell>
                      <TableCell>{call.customerName}</TableCell>
                      <TableCell>{call.mobile}</TableCell>
                      <TableCell>{call.address}</TableCell>
                      <TableCell>{call.product}</TableCell>
                      <TableCell>{call.serialNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleImport}
            >
              Import Calls
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}