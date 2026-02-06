export const TAX_RATES = [5, 12, 18, 28] as const;

export const calculateTax = (amount: number, rate: number): number => {
  return (amount * rate) / 100;
};

export const calculateTotal = (amount: number, taxAmount: number): number => {
  return amount + taxAmount;
};