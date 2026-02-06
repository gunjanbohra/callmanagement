import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Smartphone } from 'lucide-react';

interface FormData {
  mobile: string;
}

interface FormErrors {
  mobile?: string;
}

export function ForgotPin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    mobile: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.mobile) {
      errors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      errors.mobile = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulating API call - Replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      setFormData({ mobile: '' }); // Reset form after success
    } catch (err) {
      setError('Failed to process your request. Please try again.');
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
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          mx: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Smartphone size={48} style={{ color: 'primary.main', marginBottom: 16 }} />
          <Typography variant="h5" component="h1" gutterBottom>
            Forgot PIN
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your registered mobile number and we'll send you a new PIN
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            A new PIN has been sent to your mobile number. Please check your messages.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Send New PIN'}
          </Button>

          <Button
            fullWidth
            variant="text"
            size="large"
            sx={{ mt: 1 }}
            onClick={() => navigate('/login')}
            disabled={isLoading}
          >
            Back to Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}