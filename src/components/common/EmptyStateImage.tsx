import { Box, Typography } from '@mui/material';

interface EmptyStateImageProps {
  src: string;
  alt: string;
  text?: string;
}

export function EmptyStateImage({ src, alt, text }: EmptyStateImageProps) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        my: 4 
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          maxWidth: 400,
          height: 'auto',
          borderRadius: 8,
          marginBottom: text ? 16 : 0
        }}
      />
      {text && (
        <Typography variant="body2" color="text.secondary" align="center">
          {text}
        </Typography>
      )}
    </Box>
  );
}