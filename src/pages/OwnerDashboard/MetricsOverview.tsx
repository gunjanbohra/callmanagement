import { Grid } from '@mui/material';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { useRecoilValue } from 'recoil';
import { ownerMetricsState } from '@/store/owner';

export function MetricsOverview() {
  const metrics = useRecoilValue(ownerMetricsState);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Total Calls"
          value={metrics.totalCalls}
          trend="up"
          color="primary.main"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Closed Calls"
          value={metrics.closedCalls}
          trend="up"
          color="success.main"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Total Collection"
          value={metrics.totalCollection}
          trend="up"
          color="info.main"
        />
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <MetricCard
          title="Bank Balance"
          value={metrics.bankBalance}
          trend="up"
          color="warning.main"
        />
      </Grid>
    </Grid>
  );
}