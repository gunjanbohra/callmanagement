import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import { PaymentDetails } from '@/types/payment';
import { CostBreakdown } from '@/types/cost';
import { FormAlert } from '@/components/common/FormAlert';
import { LoadingButton } from '@/components/common/LoadingButton';
import { validateEmail, validateMobile } from '@/utils/validation';

interface PaymentFormProps {
  payment: PaymentDetails;
  breakdown: CostBreakdown;
  onSuccess: () => void;
}

export function PaymentForm({ payment, breakdown, onSuccess }: PaymentFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateMobile(formData.mobile)) {
      setError('Please enter a valid mobile number');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess();
    } catch (err) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormAlert message={error} severity="error" />

      <TextField
        fullWidth
        label="Mobile Number"
        value={formData.mobile}
        onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        margin="normal"
        required
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <LoadingButton
          variant="outlined"
          fullWidth
          size="large"
          onClick={() => navigate('/payment-preview')}
          disabled={isLoading}
        >
          Back
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          loading={isLoading}
        >
          Confirm Payment
        </LoadingButton>
      </Box>
    </form>
  );
}