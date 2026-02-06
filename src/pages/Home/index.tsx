import { Grid, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { financeState, remainingBalanceSelector } from '@/store/finance';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { TransactionList } from '@/components/Dashboard/TransactionList';

export function Home() {
  const finance = useRecoilValue(financeState);
  const remainingBalance = useRecoilValue(remainingBalanceSelector);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financial Dashboard
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <MetricCard
          title="Total Due Amount"
          value={finance.totalDueAmount}
          color="error.main"
          trend="up"
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <MetricCard
          title="Advance Paid"
          value={finance.advancePaid}
          color="success.main"
          trend="up"
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <MetricCard
          title="Remaining Balance"
          value={remainingBalance}
          color="warning.main"
          trend="down"
        />
      </Grid>

      <Grid item xs={12}>
        <TransactionList />
      </Grid>
    </Grid>
  );
}