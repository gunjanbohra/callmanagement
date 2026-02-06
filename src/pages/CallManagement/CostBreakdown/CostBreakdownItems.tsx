import { useEffect } from 'react';
import { Box } from '@mui/material';
import { CostBreakdown } from '@/types/cost';
import { PaymentDetails } from '@/types/payment';
import { CostRow } from '@/components/CostBreakdown/CostRow';
import { PartsCostSection } from '@/components/CostBreakdown/PartsCostSection';
import { calculateTax, calculateTotal } from '@/utils/calculations';

interface CostBreakdownItemsProps {
  payment: PaymentDetails;
  breakdown: CostBreakdown;
  onUpdate: (breakdown: CostBreakdown) => void;
}

export function CostBreakdownItems({ payment, breakdown, onUpdate }: CostBreakdownItemsProps) {
  useEffect(() => {
    let totalBeforeTax = 0;
    let totalTaxAmount = 0;

    if (payment.paymentType === 'advance_collection') {
      totalBeforeTax = breakdown.advanceCollection.amount;
      totalTaxAmount = breakdown.advanceCollection.taxAmount;
    } else if (payment.paymentType === 'care_pack') {
      totalBeforeTax = breakdown.carePack.amount;
      totalTaxAmount = breakdown.carePack.taxAmount;
    } else {
      // For repair_complete, calculate all costs
      const partsTotal = breakdown.parts.reduce(
        (sum, part) => ({
          amount: sum.amount + part.amount,
          taxAmount: sum.taxAmount + part.taxAmount,
        }),
        { amount: 0, taxAmount: 0 }
      );

      totalBeforeTax =
        breakdown.labour.amount +
        partsTotal.amount +
        breakdown.freight.amount +
        breakdown.other.amount;

      totalTaxAmount =
        breakdown.labour.taxAmount +
        partsTotal.taxAmount +
        breakdown.freight.taxAmount +
        breakdown.other.taxAmount;
    }

    const grandTotal = totalBeforeTax + totalTaxAmount;

    if (
      totalBeforeTax !== breakdown.totalBeforeTax ||
      totalTaxAmount !== breakdown.totalTaxAmount ||
      grandTotal !== breakdown.grandTotal
    ) {
      onUpdate({
        ...breakdown,
        totalBeforeTax,
        totalTaxAmount,
        grandTotal,
      });
    }
  }, [payment.paymentType, breakdown]);

  const handleAmountChange = (field: keyof CostBreakdown) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (field === 'parts') return;
    
    const amount = parseFloat(e.target.value) || 0;
    const item = breakdown[field];
    const taxAmount = calculateTax(amount, item.taxRate);
    const total = calculateTotal(amount, taxAmount);

    onUpdate({
      ...breakdown,
      [field]: {
        ...item,
        amount,
        taxAmount,
        total,
      },
    });
  };

  const handleTaxRateChange = (field: keyof CostBreakdown) => (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    if (field === 'parts') return;
    
    const taxRate = e.target.value as number;
    const item = breakdown[field];
    const taxAmount = calculateTax(item.amount, taxRate);
    const total = calculateTotal(item.amount, taxAmount);

    onUpdate({
      ...breakdown,
      [field]: {
        ...item,
        taxRate,
        taxAmount,
        total,
      },
    });
  };

  if (payment.paymentType === 'advance_collection') {
    return (
      <Box>
        <CostRow
          label="Advance Collection Amount"
          field="advanceCollection"
          amount={breakdown.advanceCollection.amount}
          taxRate={breakdown.advanceCollection.taxRate}
          taxAmount={breakdown.advanceCollection.taxAmount}
          total={breakdown.advanceCollection.total}
          onAmountChange={handleAmountChange('advanceCollection')}
          onTaxRateChange={handleTaxRateChange('advanceCollection')}
        />
      </Box>
    );
  }

  if (payment.paymentType === 'care_pack') {
    return (
      <Box>
        <CostRow
          label="Care Pack Amount"
          field="carePack"
          amount={breakdown.carePack.amount}
          taxRate={breakdown.carePack.taxRate}
          taxAmount={breakdown.carePack.taxAmount}
          total={breakdown.carePack.total}
          onAmountChange={handleAmountChange('carePack')}
          onTaxRateChange={handleTaxRateChange('carePack')}
        />
      </Box>
    );
  }

  // For repair_complete, show all cost items
  return (
    <Box>
      <CostRow
        label="Labour Cost"
        field="labour"
        amount={breakdown.labour.amount}
        taxRate={breakdown.labour.taxRate}
        taxAmount={breakdown.labour.taxAmount}
        total={breakdown.labour.total}
        onAmountChange={handleAmountChange('labour')}
        onTaxRateChange={handleTaxRateChange('labour')}
      />

      <PartsCostSection
        parts={breakdown.parts}
        onAddPart={() => {
          const newPart = {
            id: `part-${Date.now()}`,
            name: `Part ${breakdown.parts.length + 1}`,
            amount: 0,
            taxRate: 18,
            taxAmount: 0,
            total: 0,
          };
          onUpdate({
            ...breakdown,
            parts: [...breakdown.parts, newPart],
          });
        }}
        onRemovePart={(partId) => {
          onUpdate({
            ...breakdown,
            parts: breakdown.parts.filter(part => part.id !== partId),
          });
        }}
        onPartAmountChange={(partId) => (e) => {
          const amount = parseFloat(e.target.value) || 0;
          onUpdate({
            ...breakdown,
            parts: breakdown.parts.map(part => {
              if (part.id === partId) {
                const taxAmount = calculateTax(amount, part.taxRate);
                const total = calculateTotal(amount, taxAmount);
                return { ...part, amount, taxAmount, total };
              }
              return part;
            }),
          });
        }}
        onPartTaxRateChange={(partId) => (e) => {
          const taxRate = e.target.value as number;
          onUpdate({
            ...breakdown,
            parts: breakdown.parts.map(part => {
              if (part.id === partId) {
                const taxAmount = calculateTax(part.amount, taxRate);
                const total = calculateTotal(part.amount, taxAmount);
                return { ...part, taxRate, taxAmount, total };
              }
              return part;
            }),
          });
        }}
      />

      <CostRow
        label="Freight Charges"
        field="freight"
        amount={breakdown.freight.amount}
        taxRate={breakdown.freight.taxRate}
        taxAmount={breakdown.freight.taxAmount}
        total={breakdown.freight.total}
        onAmountChange={handleAmountChange('freight')}
        onTaxRateChange={handleTaxRateChange('freight')}
      />

      <CostRow
        label="Other Charges"
        field="other"
        amount={breakdown.other.amount}
        taxRate={breakdown.other.taxRate}
        taxAmount={breakdown.other.taxAmount}
        total={breakdown.other.total}
        onAmountChange={handleAmountChange('other')}
        onTaxRateChange={handleTaxRateChange('other')}
      />
    </Box>
  );
}