export const calculateTax = (amount: number, rate: number): number => {
  return (amount * rate) / 100;
};

export const calculateTotal = (amount: number, taxAmount: number): number => {
  return amount + taxAmount;
};