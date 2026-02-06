import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Upload, Pencil, Trash2 } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { bankAccountsState } from '@/store/settings';
import { FormAlert } from '@/components/common/FormAlert';

interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  upiId: string;
  qrCodeImage?: File | null;
}

export function BankAccounts() {
  const [accounts, setAccounts] = useRecoilState(bankAccountsState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<BankAccount, 'id'>>({
    accountName: '',
    accountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    upiId: '',
    qrCodeImage: null,
  });

  const handleChange = (field: keyof Omit<BankAccount, 'id'>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('QR code image size should not exceed 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setFormData(prev => ({
        ...prev,
        qrCodeImage: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.accountNumber || !formData.bankName || !formData.ifscCode) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        setAccounts(prev =>
          prev.map(account =>
            account.id === editingId
              ? { ...formData, id: editingId }
              : account
          )
        );
        setSuccess('Bank account updated successfully');
      } else {
        setAccounts(prev => [
          ...prev,
          { ...formData, id: Date.now().toString() }
        ]);
        setSuccess('Bank account added successfully');
      }

      setFormData({
        accountName: '',
        accountNumber: '',
        bankName: '',
        branchName: '',
        ifscCode: '',
        upiId: '',
        qrCodeImage: null,
      });
      setEditingId(null);
    } catch (err) {
      setError('Failed to save bank account');
    }
  };

  const handleEdit = (account: BankAccount) => {
    setEditingId(account.id);
    setFormData({
      accountName: account.accountName,
      accountNumber: account.accountNumber,
      bankName: account.bankName,
      branchName: account.branchName,
      ifscCode: account.ifscCode,
      upiId: account.upiId,
      qrCodeImage: account.qrCodeImage,
    });
  };

  const handleDelete = (id: string) => {
    try {
      setAccounts(prev => prev.filter(account => account.id !== id));
      setSuccess('Bank account deleted successfully');
    } catch (err) {
      setError('Failed to delete bank account');
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Bank Accounts
      </Typography>

      <FormAlert message={error} severity="error" />
      <FormAlert message={success} severity="success" />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Account Name"
              value={formData.accountName}
              onChange={handleChange('accountName')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Account Number"
              value={formData.accountNumber}
              onChange={handleChange('accountNumber')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Bank Name"
              value={formData.bankName}
              onChange={handleChange('bankName')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Branch Name"
              value={formData.branchName}
              onChange={handleChange('branchName')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="IFSC Code"
              value={formData.ifscCode}
              onChange={handleChange('ifscCode')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="UPI ID"
              value={formData.upiId}
              onChange={handleChange('upiId')}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<Upload size={20} />}
            >
              Upload QR Code
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </Button>
            {formData.qrCodeImage && (
              <Typography variant="caption" sx={{ ml: 2 }}>
                {formData.qrCodeImage.name}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
          >
            {editingId ? 'Update Bank Account' : 'Add Bank Account'}
          </Button>
        </Box>
      </form>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Bank Account List
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account Name</TableCell>
                <TableCell>Bank Name</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>IFSC Code</TableCell>
                <TableCell>UPI ID</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.accountName}</TableCell>
                  <TableCell>{account.bankName}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>{account.ifscCode}</TableCell>
                  <TableCell>{account.upiId}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(account)}
                    >
                      <Pencil size={20} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(account.id)}
                    >
                      <Trash2 size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}