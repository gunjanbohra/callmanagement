import { Grid } from '@mui/material';
import { MetricsOverview } from './MetricsOverview';
import { CallsAnalytics } from './CallsAnalytics';
import { FinancialMetrics } from './FinancialMetrics';
import { EngineerPerformance } from './EngineerPerformance';

export function OwnerDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MetricsOverview />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <CallsAnalytics />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FinancialMetrics />
      </Grid>
      
      <Grid item xs={12}>
        <EngineerPerformance />
      </Grid>
    </Grid>
  );
}