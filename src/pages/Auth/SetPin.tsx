import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { authState, userSelector } from '@/store/auth';

export function SetPin() {
  const navigate = useNavigate();
  const user = useRecoilValue(userSelector);
  const setAuth = useSetRecoilState(authState);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  if (!user?.isFirstLogin) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pin || !confirmPin) {
      setError('Please fill in all fields');
      return;
    }

    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }

    if (!/^[0-9]{4}$/.test(pin)) {
      setError('PIN must be 4 digits');
      return;
    }

    try {
      // Simulating API call - Replace with actual API integration
      setAuth((prev) => ({
        ...prev,
        user: prev.user ? { ...prev.user, isFirstLogin: false } : null,
      }));

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to set PIN. Please try again.');
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
          Set Your PIN
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Please set a 4-digit PIN for future logins
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            margin="normal"
            type="password"
            inputProps={{ maxLength: 4, pattern: '[0-9]*' }}
          />

          <TextField
            fullWidth
            label="Confirm PIN"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            margin="normal"
            type="password"
            inputProps={{ maxLength: 4, pattern: '[0-9]*' }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Set PIN
          </Button>
        </form>
      </Paper>
    </Box>
  );
}