import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { callState } from '@/store/call';
import { Call, CallStatus } from '@/types/call';
import { PageStepper } from '@/components/Layout/PageStepper';

const CALL_STATUS_OPTIONS: { value: CallStatus; label: string }[] = [
  { value: 'repair_complete', label: 'Repair Complete' },
  { value: 'call_pending', label: 'Call Pending' },
  { value: 'pending_gas_charge', label: 'Pending for Gas Charge' },
  { value: 'call_cancelled', label: 'Call Cancelled' },
];

export function CallManagement() {
  const navigate = useNavigate();
  const [{ calls }, setCallState] = useRecoilState(callState);
  
  const [selectedCallId, setSelectedCallId] = useState('');
  const [callStatus, setCallStatus] = useState<CallStatus | ''>('');
  const [warrantyStatus, setWarrantyStatus] = useState('');
  const [customerCollection, setCustomerCollection] = useState('');
  const [error, setError] = useState('');

  const handleCallChange = (event: SelectChangeEvent) => {
    setSelectedCallId(event.target.value);
    setError('');
  };

  const handleCallStatusChange = (event: SelectChangeEvent) => {
    setCallStatus(event.target.value as CallStatus);
    setError('');
  };

  const handleWarrantyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarrantyStatus(event.target.value);
    setError('');
  };

  const handleCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerCollection(event.target.value);
    setError('');
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCallId || !callStatus || !warrantyStatus || !customerCollection) {
      setError('Please fill in all fields');
      return;
    }

    const updatedCall: Call = {
      id: selectedCallId,
      status: warrantyStatus as 'in_warranty' | 'out_warranty',
      callStatus: callStatus,
      customerCollection: customerCollection === 'yes',
      submittedAt: new Date().toISOString(),
    };

    setCallState((prev) => ({
      ...prev,
      calls: prev.calls.map((call) =>
        call.id === selectedCallId ? updatedCall : call
      ),
      selectedCall: updatedCall,
    }));

    navigate('/payment-details');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <PageStepper activeStep={0} />

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Call Management
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 3 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleNext}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Call ID</InputLabel>
            <Select
              value={selectedCallId}
              label="Call ID"
              onChange={handleCallChange}
            >
              {calls.map((call) => (
                <MenuItem key={call.id} value={call.id}>
                  {call.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Call Status</InputLabel>
            <Select
              value={callStatus}
              label="Call Status"
              onChange={handleCallStatusChange}
            >
              {CALL_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1" gutterBottom>
              Warranty Status
            </Typography>
            <RadioGroup
              value={warrantyStatus}
              onChange={handleWarrantyChange}
              row
              sx={{ justifyContent: 'space-around' }}
            >
              <FormControlLabel
                value="in_warranty"
                control={<Radio />}
                label="In Warranty"
              />
              <FormControlLabel
                value="out_warranty"
                control={<Radio />}
                label="Out of Warranty"
              />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1" gutterBottom>
              Customer Collection
            </Typography>
            <RadioGroup
              value={customerCollection}
              onChange={handleCollectionChange}
              row
              sx={{ justifyContent: 'space-around' }}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Next
          </Button>
        </form>
      </Paper>
    </Box>
  );
}