import numeral from 'numeral';
import dayjs from 'dayjs';

export const formatCurrency = (amount: number): string => {
  return numeral(amount).format('0,0.00');
};

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format('DD MMM YYYY');
};

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('DD MMM YYYY h:mm A');
};