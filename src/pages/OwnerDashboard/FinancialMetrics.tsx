import { Paper, Typography, Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { financialMetricsState } from '@/store/owner';
import { formatCurrency } from '@/utils/format';

export function FinancialMetrics() {
  const metrics = useRecoilValue(financialMetricsState);

  const MetricRow = ({ label, value }: { label: string; value: number }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography>{label}</Typography>
      <Typography fontWeight="bold">₹ {formatCurrency(value)}</Typography>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Financial Metrics
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Daily Collection
        </Typography>
        <MetricRow label="Total Collection" value={metrics.daily.totalCollection} />
        <MetricRow label="Advance Adjusted" value={metrics.daily.advanceAdjusted} />
        <MetricRow label="Bank Balance" value={metrics.daily.bankBalance} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Weekly Collection
        </Typography>
        <MetricRow label="Total Collection" value={metrics.weekly.totalCollection} />
        <MetricRow label="Advance Adjusted" value={metrics.weekly.advanceAdjusted} />
        <MetricRow label="Bank Balance" value={metrics.weekly.bankBalance} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Monthly Collection
        </Typography>
        <MetricRow label="Total Collection" value={metrics.monthly.totalCollection} />
        <MetricRow label="Advance Adjusted" value={metrics.monthly.advanceAdjusted} />
        <MetricRow label="Bank Balance" value={metrics.monthly.bankBalance} />
      </Box>
    </Paper>
  );
}