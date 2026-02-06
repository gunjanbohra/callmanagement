import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { FormAlert } from '@/components/common/FormAlert';
import { UserFormData } from '../types';

interface UserFormProps {
  data: UserFormData;
  error: string;
  success: string;
  isLoading: boolean;
  isEditing: boolean;
  onChange: (field: keyof UserFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function UserForm({
  data,
  error,
  success,
  isLoading,
  isEditing,
  onChange,
  onSubmit,
}: UserFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <FormAlert message={error} severity="error" />
      <FormAlert message={success} severity="success" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            required
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Mobile Number"
            value={data.mobile}
            onChange={(e) => onChange('mobile', e.target.value)}
            required
            inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="PIN"
            type="password"
            value={data.pin}
            onChange={(e) => onChange('pin', e.target.value)}
            required
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>User Type</InputLabel>
            <Select
              value={data.userType}
              label="User Type"
              onChange={(e) => onChange('userType', e.target.value)}
              disabled={isLoading}
            >
              <MenuItem value="owner">Owner</MenuItem>
              <MenuItem value="account_head">Account Head</MenuItem>
              <MenuItem value="accountant">Accountant</MenuItem>
              <MenuItem value="field_engineer">Field Engineer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isLoading}
        >
          {isEditing ? 'Update User' : 'Add User'}
        </Button>
      </Box>
    </form>
  );
}