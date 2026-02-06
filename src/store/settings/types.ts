export interface CompanySettings {
  name: string;
  address: string;
  gstn: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  state: string;
  stateCode: string;
}

export interface UserSettings {
  id: string;
  name: string;
  mobile: string;
  pin: string;
  userType: 'owner' | 'account_head' | 'accountant' | 'field_engineer';
}

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  upiId: string;
  qrCodeUrl: string;
}

export interface CostItem {
  id: string;
  name: string;
  defaultTaxRate: number;
  isActive: boolean;
}