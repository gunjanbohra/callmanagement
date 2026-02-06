import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
} from '@mui/material';
import { Pencil } from 'lucide-react';
import { reportState } from '@/store/report';
import { EngineerReport as IEngineerReport } from '@/types/report';
import { formatDate, formatCurrency } from '@/utils/format';

export function EngineerReport() {
  const [{ reports }, setReportState] = useRecoilState(reportState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedReport, setEditedReport] = useState<IEngineerReport | null>(null);

  const handleEdit = (report: IEngineerReport) => {
    setEditingId(report.id);
    setEditedReport({ ...report });
  };

  const handleSave = () => {
    if (!editedReport) return;

    setReportState((prev) => ({
      ...prev,
      reports: prev.reports.map((report) =>
        report.id === editedReport.id ? editedReport : report
      ),
    }));

    setEditingId(null);
    setEditedReport(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedReport(null);
  };

  const handleChange = (field: keyof IEngineerReport) => (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    if (!editedReport) return;

    const value = e.target.value;
    setEditedReport({
      ...editedReport,
      [field]: value,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Engineer Reports
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell>Engineer Details</TableCell>
              <TableCell>Call Information</TableCell>
              <TableCell>Payment Details</TableCell>
              <TableCell>Cash Receipt</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.serialNo}</TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{report.engineerName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {report.engineerMobile}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{report.callNo}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {formatDate(report.callDate)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        report.status === 'completed'
                          ? 'success.main'
                          : report.status === 'cancelled'
                          ? 'error.main'
                          : 'warning.main',
                    }}
                  >
                    {report.status.toUpperCase()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    ₹{formatCurrency(report.totalAmount)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {report.paymentMode.toUpperCase()}
                    {report.upiReference && ` - ${report.upiReference}`}
                  </Typography>
                </TableCell>
                <TableCell>
                  {report.cashReceivedBy && (
                    <>
                      <Typography variant="subtitle2">
                        {report.cashReceivedBy}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {formatDate(report.cashReceivedDate || '')}
                      </Typography>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    Advance: ₹{formatCurrency(report.salaryAdvance)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={report.salaryProcessed ? 'success.main' : 'warning.main'}
                  >
                    {report.salaryProcessed ? 'Processed' : 'Pending'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(report)}
                  >
                    <Pencil size={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editingId} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>Edit Report</DialogTitle>
        {editedReport && (
          <DialogContent>
            <Box sx={{ display: 'grid', gap: 2, pt: 2 }}>
              <TextField
                label="Engineer Name"
                value={editedReport.engineerName}
                onChange={handleChange('engineerName')}
                fullWidth
              />
              
              <TextField
                label="Engineer Mobile"
                value={editedReport.engineerMobile}
                onChange={handleChange('engineerMobile')}
                fullWidth
              />

              <TextField
                label="Call Number"
                value={editedReport.callNo}
                onChange={handleChange('callNo')}
                fullWidth
              />

              <TextField
                type="date"
                label="Call Date"
                value={editedReport.callDate}
                onChange={handleChange('callDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <Select
                value={editedReport.status}
                onChange={handleChange('status')}
                fullWidth
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>

              <Select
                value={editedReport.callType}
                onChange={handleChange('callType')}
                fullWidth
                label="Call Type"
              >
                <MenuItem value="regular">Regular</MenuItem>
                <MenuItem value="emergency">Emergency</MenuItem>
                <MenuItem value="maintenance">Maintenance</MenuItem>
              </Select>

              <Select
                value={editedReport.paymentMode}
                onChange={handleChange('paymentMode')}
                fullWidth
                label="Payment Mode"
              >
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
              </Select>

              {editedReport.paymentMode === 'upi' && (
                <TextField
                  label="UPI Reference"
                  value={editedReport.upiReference}
                  onChange={handleChange('upiReference')}
                  fullWidth
                />
              )}

              <TextField
                label="Total Amount"
                value={editedReport.totalAmount}
                onChange={handleChange('totalAmount')}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Cash Received By"
                value={editedReport.cashReceivedBy}
                onChange={handleChange('cashReceivedBy')}
                fullWidth
              />

              <TextField
                type="date"
                label="Cash Received Date"
                value={editedReport.cashReceivedDate}
                onChange={handleChange('cashReceivedDate')}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Salary Advance"
                value={editedReport.salaryAdvance}
                onChange={handleChange('salaryAdvance')}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />

              <Select
                value={editedReport.salaryProcessed}
                onChange={handleChange('salaryProcessed')}
                fullWidth
                label="Salary Status"
              >
                <MenuItem value={true}>Processed</MenuItem>
                <MenuItem value={false}>Pending</MenuItem>
              </Select>
            </Box>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}