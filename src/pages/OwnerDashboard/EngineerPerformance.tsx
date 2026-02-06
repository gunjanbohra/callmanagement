import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { engineerPerformanceState } from '@/store/owner';
import { formatCurrency } from '@/utils/format';

export function EngineerPerformance() {
  const engineers = useRecoilValue(engineerPerformanceState);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Engineer Performance
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Engineer Name</TableCell>
              <TableCell align="right">Daily Calls</TableCell>
              <TableCell align="right">Weekly Calls</TableCell>
              <TableCell align="right">Monthly Calls</TableCell>
              <TableCell align="right">Daily Collection</TableCell>
              <TableCell align="right">Weekly Collection</TableCell>
              <TableCell align="right">Monthly Collection</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {engineers.map((engineer) => (
              <TableRow key={engineer.id}>
                <TableCell>{engineer.name}</TableCell>
                <TableCell align="right">{engineer.daily.calls}</TableCell>
                <TableCell align="right">{engineer.weekly.calls}</TableCell>
                <TableCell align="right">{engineer.monthly.calls}</TableCell>
                <TableCell align="right">₹ {formatCurrency(engineer.daily.collection)}</TableCell>
                <TableCell align="right">₹ {formatCurrency(engineer.weekly.collection)}</TableCell>
                <TableCell align="right">₹ {formatCurrency(engineer.monthly.collection)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}