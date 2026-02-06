import { Paper, Typography, Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { callAnalyticsState } from '@/store/owner';
import { formatCurrency } from '@/utils/format';

export function CallsAnalytics() {
  const analytics = useRecoilValue(callAnalyticsState);

  const AnalyticRow = ({ label, value }: { label: string; value: number }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography>{label}</Typography>
      <Typography fontWeight="bold">{value}</Typography>
    </Box>
  );

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Calls Analytics
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Daily Statistics
        </Typography>
        <AnalyticRow label="New Calls" value={analytics.daily.newCalls} />
        <AnalyticRow label="Closed Calls" value={analytics.daily.closedCalls} />
        <AnalyticRow label="Pending Calls" value={analytics.daily.pendingCalls} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Weekly Statistics
        </Typography>
        <AnalyticRow label="New Calls" value={analytics.weekly.newCalls} />
        <AnalyticRow label="Closed Calls" value={analytics.weekly.closedCalls} />
        <AnalyticRow label="Pending Calls" value={analytics.weekly.pendingCalls} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Monthly Statistics
        </Typography>
        <AnalyticRow label="New Calls" value={analytics.monthly.newCalls} />
        <AnalyticRow label="Closed Calls" value={analytics.monthly.closedCalls} />
        <AnalyticRow label="Pending Calls" value={analytics.monthly.pendingCalls} />
      </Box>
    </Paper>
  );
}