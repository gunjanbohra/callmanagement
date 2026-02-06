import { Box, Breadcrumbs, Link, Typography } from '@mui/material';

interface BreadcrumbItem {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Breadcrumbs>
        {items.map((item, index) => (
          <Typography
            key={index}
            color={item.isActive ? 'primary' : 'text.secondary'}
            sx={{
              cursor: item.isActive ? 'default' : 'pointer',
              fontWeight: item.isActive ? 600 : 400,
              '&:hover': {
                color: !item.isActive ? 'primary.main' : undefined,
              },
            }}
            onClick={!item.isActive ? item.onClick : undefined}
          >
            {item.label}
          </Typography>
        ))}
      </Breadcrumbs>
    </Box>
  );
}