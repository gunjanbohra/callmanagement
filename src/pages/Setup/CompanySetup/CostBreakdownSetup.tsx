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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from '@mui/material';
import { Pencil, Trash2 } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { costBreakdownSettingsState } from '@/store/settings';
import { FormAlert } from '@/components/common/FormAlert';

interface CostItem {
  id: string;
  name: string;
  defaultTaxRate: number;
  isActive: boolean;
}

const TAX_RATES = [5, 12, 18, 28];

export function CostBreakdownSetup() {
  const [costItems, setCostItems] = useRecoilState(costBreakdownSettingsState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<CostItem, 'id'>>({
    name: '',
    defaultTaxRate: 18,
    isActive: true,
  });

  const handleChange = (field: keyof Omit<CostItem, 'id'>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleTaxRateChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      defaultTaxRate: event.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Cost item name is required');
      return;
    }

    try {
      if (editingId) {
        setCostItems(prev =>
          prev.map(item =>
            item.id === editingId
              ? { ...formData, id: editingId }
              : item
          )
        );
        setSuccess('Cost item updated successfully');
      } else {
        setCostItems(prev => [
          ...prev,
          { ...formData, id: Date.now().toString() }
        ]);
        setSuccess('Cost item added successfully');
      }

      setFormData({
        name: '',
        defaultTaxRate: 18,
        isActive: true,
      });
      setEditingId(null);
    } catch (err) {
      setError('Failed to save cost item');
    }
  };

  const handleEdit = (item: CostItem) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      defaultTaxRate: item.defaultTaxRate,
      isActive: item.isActive,
    });
  };

  const handleDelete = (id: string) => {
    try {
      setCostItems(prev => prev.filter(item => item.id !== id));
      setSuccess('Cost item deleted successfully');
    } catch (err) {
      setError('Failed to delete cost item');
    }
  };

  const handleToggleActive = (id: string) => {
    setCostItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, isActive: !item.isActive }
          : item
      )
    );
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Cost Breakdown Setup
      </Typography>

      <FormAlert message={error} severity="error" />
      <FormAlert message={success} severity="success" />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cost Item Name"
              value={formData.name}
              onChange={handleChange('name')}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Default Tax Rate</InputLabel>
              <Select
                value={formData.defaultTaxRate}
                label="Default Tax Rate"
                onChange={handleTaxRateChange}
              >
                {TAX_RATES.map(rate => (
                  <MenuItem key={rate} value={rate}>
                    {rate}%
                  </MenuItem>
                ))}
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
          >
            {editingId ? 'Update Cost Item' : 'Add Cost Item'}
          </Button>
        </Box>
      </form>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Cost Items List
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cost Item Name</TableCell>
                <TableCell>Default Tax Rate</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.defaultTaxRate}%</TableCell>
                  <TableCell>
                    <Switch
                      checked={item.isActive}
                      onChange={() => handleToggleActive(item.id)}
                      color="success"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil size={20} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item.id)}
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