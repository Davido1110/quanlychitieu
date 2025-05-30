import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { getExpenseReport } from '../services/api';

interface Expense {
  id: number;
  date: string;
  amount: number;
  category: string;
  description: string;
}

const ExpenseReport: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toISOString().slice(0, 7);
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getExpenseReport(selectedMonth);
        setExpenses(data);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại!');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [selectedMonth]);

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h1" sx={{ mb: 4, textAlign: 'center' }}>
        Báo cáo chi tiêu
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Tháng</InputLabel>
        <Select
          value={selectedMonth}
          label="Tháng"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {new Date(month).toLocaleDateString('vi-VN', {
                month: 'long',
                year: 'numeric',
              })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper elevation={3} sx={{ flex: 1, overflow: 'auto' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Danh mục</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell align="right">Số tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      {new Date(expense.date).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell align="right">
                      {expense.amount.toLocaleString('vi-VN')}đ
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      Tổng cộng:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {totalAmount.toLocaleString('vi-VN')}đ
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default ExpenseReport; 