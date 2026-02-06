import { Paper, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

interface MetricCardProps {
  title: string;
  value: number;
  trend?: 'up' | 'down';
  color?: string;
}

export function MetricCard({ title, value, trend, color = 'primary.main' }: MetricCardProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" color={color} sx={{ mb: 1, fontWeight: 600 }}>
        ₹{formatCurrency(value)}
      </Typography>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
          {trend === 'up' ? (
            <TrendingUp color="success" size={20} />
          ) : (
            <TrendingDown color="error" size={20} />
          )}
          <Typography
            variant="body2"
            color={trend === 'up' ? 'success.main' : 'error.main'}
            sx={{ ml: 0.5, fontWeight: 500 }}
          >
            {trend === 'up' ? '+' : '-'}2.5% vs last month
          </Typography>
        </Box>
      )}
    </Paper>
  );
}