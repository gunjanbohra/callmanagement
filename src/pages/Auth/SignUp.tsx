import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { authState } from '@/store/auth';

interface FormData {
  name: string;
  mobile: string;
  pin: string;
  confirmPin: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  pin?: string;
  confirmPin?: string;
}

export function SignUp() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    pin: '',
    confirmPin: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.mobile) {
      errors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      errors.mobile = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!formData.pin) {
      errors.pin = 'PIN is required';
      isValid = false;
    } else if (!/^[0-9]{4}$/.test(formData.pin)) {
      errors.pin = 'PIN must be 4 digits';
      isValid = false;
    }

    if (!formData.confirmPin) {
      errors.confirmPin = 'Please confirm your PIN';
      isValid = false;
    } else if (formData.pin !== formData.confirmPin) {
      errors.confirmPin = 'PINs do not match';
      isValid = false;
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

    try {
      // Simulating API call - Replace with actual API integration
      const user = {
        id: Date.now().toString(),
        name: formData.name,
        mobile: formData.mobile,
        isAuthenticated: true,
      };

      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
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
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Create Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!formErrors.name}
            helperText={formErrors.name}
            margin="normal"
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
          />

          <TextField
            fullWidth
            label="PIN"
            type={showPin ? 'text' : 'password'}
            value={formData.pin}
            onChange={handleChange('pin')}
            error={!!formErrors.pin}
            helperText={formErrors.pin}
            margin="normal"
            inputProps={{ maxLength: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPin(!showPin)}
                    edge="end"
                  >
                    {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm PIN"
            type={showConfirmPin ? 'text' : 'password'}
            value={formData.confirmPin}
            onChange={handleChange('confirmPin')}
            error={!!formErrors.confirmPin}
            helperText={formErrors.confirmPin}
            margin="normal"
            inputProps={{ maxLength: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    edge="end"
                  >
                    {showConfirmPin ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Create Account
          </Button>

          <Button
            fullWidth
            variant="text"
            size="large"
            sx={{ mt: 1 }}
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}