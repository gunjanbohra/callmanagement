import { Typography, TypographyProps } from '@mui/material';

interface PageTitleProps extends TypographyProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle, ...props }: PageTitleProps) {
  return (
    <>
      <Typography variant="h5" component="h1" gutterBottom {...props}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
    </>
  );
}