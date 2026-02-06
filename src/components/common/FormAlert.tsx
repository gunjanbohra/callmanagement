import { Alert, AlertProps } from '@mui/material';

interface FormAlertProps extends AlertProps {
  message: string;
}

export function FormAlert({ message, ...props }: FormAlertProps) {
  return message ? <Alert {...props} sx={{ mb: 3 }}>{message}</Alert> : null;
}