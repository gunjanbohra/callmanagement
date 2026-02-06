import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';
import { authState } from '@/store/auth';
import { FormAlert } from '@/components/common/FormAlert';
import { validateMobile, validatePin } from '@/utils/validation';

interface FormData {
  mobile: string;
  pin: string;
}

interface FormErrors {
  mobile?: string;
  pin?: string;
}

export function Login() {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    mobile: '',
    pin: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!validateMobile(formData.mobile)) {
      errors.mobile = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!validatePin(formData.pin)) {
      errors.pin = 'PIN must be 4 digits';
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
        id: '1',
        mobile: formData.mobile,
        name: 'John Doe',
        isAuthenticated: true,
        isOwner: formData.mobile === '9999999999', // For demo: owner has this number
      };

      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      navigate('/dashboard');
    } catch (err) {
      setError('Invalid mobile number or PIN');
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
          Login
        </Typography>

        <FormAlert message={error} severity="error" />

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

          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/forgot-pin')}
            sx={{ display: 'block', textAlign: 'right', mb: 2 }}
          >
            Forgot PIN?
          </Link>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Login
          </Button>

          <Button
            fullWidth
            variant="text"
            size="large"
            sx={{ mt: 1 }}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}