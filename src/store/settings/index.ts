import { atom } from 'recoil';
import { BANK_ACCOUNTS } from '@/constants/banks';
import { CompanySettings, UserSettings, BankAccount, CostItem } from './types';

export const companySettingsState = atom<CompanySettings>({
  key: 'companySettingsState',
  default: {
    name: '',
    address: '',
    gstn: '',
    phone: '',
    mobile: '',
    email: '',
    website: '',
    state: '',
    stateCode: '',
  },
});

export const userSettingsState = atom<UserSettings[]>({
  key: 'userSettingsState',
  default: [],
});

export const bankAccountsState = atom<BankAccount[]>({
  key: 'bankAccountsState',
  default: BANK_ACCOUNTS,
});

export const costBreakdownSettingsState = atom<CostItem[]>({
  key: 'costBreakdownSettingsState',
  default: [
    {
      id: '1',
      name: 'Labour Cost',
      defaultTaxRate: 18,
      isActive: true,
    },
    {
      id: '2',
      name: 'Parts Cost',
      defaultTaxRate: 18,
      isActive: true,
    },
    {
      id: '3',
      name: 'Freight Charges',
      defaultTaxRate: 18,
      isActive: true,
    },
  ],
});

export type { CompanySettings, UserSettings, BankAccount, CostItem };