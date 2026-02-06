export interface CostItem {
  amount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export interface PartCostItem extends CostItem {
  id: string;
  name: string;
}

export interface CostBreakdown {
  labour: CostItem;
  parts: PartCostItem[];
  freight: CostItem;
  other: CostItem;
  carePack: CostItem;
  advanceCollection: CostItem;
  totalBeforeTax: number;
  totalTaxAmount: number;
  grandTotal: number;
}

export interface CostState {
  breakdown: CostBreakdown;
}