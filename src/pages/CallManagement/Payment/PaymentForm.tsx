import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import { PaymentDetails } from '@/types/payment';
import { CostBreakdown } from '@/types/cost';
import { PaymentModeFields } from './PaymentModeFields';
import { FormAlert } from '@/components/common/FormAlert';
import { LoadingButton } from '@/components/common/LoadingButton';
import { validateEmail, validateMobile } from '@/utils/validation';

interface PaymentFormProps {
  payment: PaymentDetails;
  breakdown: CostBreakdown;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSuccess: (formData: { mobile: string; email: string }) => void;
}

interface FormData {
  mobile: string;
  email: string;
  upiReference?: string;
  chequeNumber?: string;
  bankName?: string;
  transactionId?: string;
}

interface FormErrors {
  mobile?: string;
  email?: string;
  upiReference?: string;
  chequeNumber?: string;
  bankName?: string;
  transactionId?: string;
}

export function PaymentForm({ payment, isLoading, setIsLoading, onSuccess }: PaymentFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ mobile: '', email: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [error, setError] = useState('');

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!validateMobile(formData.mobile)) {
      errors.mobile = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Enter a valid email address';
      isValid = false;
    }

    switch (payment.paymentMode) {
      case 'upi':
        if (!formData.upiReference) {
          errors.upiReference = 'UPI reference number is required';
          isValid = false;
        }
        break;
      case 'cheque':
        if (!formData.chequeNumber) {
          errors.chequeNumber = 'Cheque number is required';
          isValid = false;
        }
        if (!formData.bankName) {
          errors.bankName = 'Bank name is required';
          isValid = false;
        }
        break;
      case 'imps_neft':
        if (!formData.transactionId) {
          errors.transactionId = 'Transaction ID is required';
          isValid = false;
        }
        if (!formData.bankName) {
          errors.bankName = 'Bank name is required';
          isValid = false;
        }
        break;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSuccess({ mobile: formData.mobile, email: formData.email });
    } catch (err) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormAlert message={error} severity="error" />

      <PaymentModeFields
        paymentMode={payment.paymentMode}
        formData={formData}
        formErrors={formErrors}
        onChange={handleChange}
        disabled={isLoading}
      />

      <TextField
        fullWidth
        label="Mobile Number"
        value={formData.mobile}
        onChange={handleChange('mobile')}
        error={!!formErrors.mobile}
        helperText={formErrors.mobile}
        margin="normal"
        inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
        disabled={isLoading}
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={!!formErrors.email}
        helperText={formErrors.email}
        margin="normal"
        disabled={isLoading}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <LoadingButton
          variant="outlined"
          fullWidth
          size="large"
          onClick={() => navigate('/payment-amount')}
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