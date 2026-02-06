import {
  Paper,
  Typography,
  List,
  Box,
  Divider,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { transactionsState } from '@/store/finance';
import { TransactionItem } from './TransactionItem';

export function TransactionList() {
  const transactions = useRecoilValue(transactionsState);

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3,
        height: '100%',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ 
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          View All
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ maxHeight: 400, overflow: 'auto' }}>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </List>
    </Paper>
  );
}