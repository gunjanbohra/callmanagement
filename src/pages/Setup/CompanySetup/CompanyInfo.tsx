import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useRecoilState } from 'recoil';
import { companySettingsState } from '@/store/settings';
import { FormAlert } from '@/components/common/FormAlert';

interface CompanyInfoProps {
  onNext: () => void;
}

export function CompanyInfo({ onNext }: CompanyInfoProps) {
  const [settings, setSettings] = useRecoilState(companySettingsState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: settings.name || '',
    address: settings.address || '',
    gstn: settings.gstn || '',
    phone: settings.phone || '',
    mobile: settings.mobile || '',
    email: settings.email || '',
    website: settings.website || '',
    state: settings.state || '',
    stateCode: settings.stateCode || '',
  });

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await setSettings(formData);
      setSuccess('Company information saved successfully');
      setTimeout(onNext, 1000);
    } catch (err) {
      setError('Failed to save company information');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormAlert message={error} severity="error" />
      <FormAlert message={success} severity="success" />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Company Name"
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={handleChange('address')}
            multiline
            rows={3}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="GSTN"
            value={formData.gstn}
            onChange={handleChange('gstn')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={handleChange('phone')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Mobile"
            value={formData.mobile}
            onChange={handleChange('mobile')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Website"
            value={formData.website}
            onChange={handleChange('website')}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="State"
            value={formData.state}
            onChange={handleChange('state')}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="State Code"
            value={formData.stateCode}
            onChange={handleChange('stateCode')}
            required
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Save and Continue
        </Button>
      </Box>
    </form>
  );
}