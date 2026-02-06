import { Box, Typography, IconButton } from '@mui/material';
import { Plus, Minus } from 'lucide-react';
import { CostRow } from './CostRow';
import { PartCostItem } from '@/types/cost';

interface PartsCostSectionProps {
  parts: PartCostItem[];
  onAddPart: () => void;
  onRemovePart: (partId: string) => void;
  onPartAmountChange: (partId: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPartTaxRateChange: (partId: string) => (e: React.ChangeEvent<{ value: unknown }>) => void;
}

export function PartsCostSection({
  parts,
  onAddPart,
  onRemovePart,
  onPartAmountChange,
  onPartTaxRateChange,
}: PartsCostSectionProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1">Parts Cost</Typography>
        <IconButton color="primary" onClick={onAddPart} sx={{ ml: 2 }}>
          <Plus />
        </IconButton>
      </Box>

      {parts.map((part, index) => (
        <Box key={part.id} sx={{ mb: 2, position: 'relative' }}>
          <Typography variant="subtitle2" gutterBottom>
            Part {index + 1}
          </Typography>
          <IconButton
            size="small"
            onClick={() => onRemovePart(part.id)}
            sx={{ position: 'absolute', right: -8, top: -8 }}
          >
            <Minus />
          </IconButton>
          <CostRow
            label={`Part ${index + 1} Cost`}
            field={`part-${part.id}`}
            amount={part.amount}
            taxRate={part.taxRate}
            taxAmount={part.taxAmount}
            total={part.total}
            onAmountChange={onPartAmountChange(part.id)}
            onTaxRateChange={onPartTaxRateChange(part.id)}
          />
        </Box>
      ))}
    </Box>
  );
}