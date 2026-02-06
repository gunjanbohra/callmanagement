import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Box,
  Typography,
} from '@mui/material';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Transaction } from '@/types/finance';
import { formatDateTime, formatCurrency } from '@/utils/format';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isAdvance = transaction.type === 'advance';
  
  return (
    <ListItem
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        '&:last-child': { borderBottom: 'none' },
        py: 2,
        px: 0,
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isAdvance ? 'success.light' : 'error.light',
          }}
        >
          {isAdvance ? (
            <ArrowUp color="success" size={20} />
          ) : (
            <ArrowDown color="error" size={20} />
          )}
        </Box>
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {transaction.description}
          </Typography>
        }
        secondary={formatDateTime(transaction.date)}
      />
      <Chip
        label={`₹${formatCurrency(transaction.amount)}`}
        color={isAdvance ? 'success' : 'error'}
        variant="outlined"
        sx={{ 
          fontWeight: 600,
          minWidth: 100,
          '& .MuiChip-label': {
            px: 2,
          },
        }}
      />
    </ListItem>
  );
}