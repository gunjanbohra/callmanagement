import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingButton({ loading, children, disabled, ...props }: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading || disabled}>
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
}