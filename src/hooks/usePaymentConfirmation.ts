import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { paymentState } from '@/store/payment';
import { costState } from '@/store/cost';
import { bankAccountsState } from '@/store/settings';
import { financeState } from '@/store/finance';
import { PaymentMode, CustomerInfo } from '@/types/payment';
import { validateMobile } from '@/utils/validation';

export function usePaymentConfirmation() {
  const router = useRouter();
  const { currentPayment } = useRecoilValue(paymentState);
  const { breakdown } = useRecoilValue(costState);
  const bankAccounts = useRecoilValue(bankAccountsState);
  const setFinanceState = useSetRecoilState(financeState);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('upi');
  const [selectedBankId, setSelectedBankId] = useState(bankAccounts[0]?.id || '');
  const [upiReference, setUpiReference] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [chequeBankName, setChequeBankName] = useState('');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    address: '',
    mobile: '',
    email: '',
  });

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!customerInfo.name.trim()) {
      setError('Please enter customer name');
      return false;
    }
    if (!customerInfo.address.trim()) {
      setError('Please enter customer address');
      return false;
    }
    if (!validateMobile(customerInfo.mobile)) {
      setError('Please enter a valid mobile number');
      return false;
    }
    if (customerInfo.email && !customerInfo.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    switch (paymentMode) {
      case 'upi':
        if (!upiReference) {
          setError('Please enter UPI reference number');
          return false;
        }
        break;
      case 'cheque':
        if (!chequeNumber || !chequeBankName) {
          setError('Please enter all cheque details');
          return false;
        }
        break;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      setFinanceState(prev => ({
        ...prev,
        advancePaid: prev.advancePaid + (breakdown?.grandTotal || 0),
        lastUpdated: new Date().toISOString(),
      }));

      router.push('/payment-success');
    } catch (err) {
      setError('Failed to process payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentPayment,
    breakdown,
    bankAccounts,
    isLoading,
    error,
    paymentMode,
    selectedBankId,
    upiReference,
    chequeNumber,
    chequeBankName,
    customerInfo,
    setPaymentMode,
    setSelectedBankId,
    setUpiReference,
    setChequeNumber,
    setChequeBankName,
    handleCustomerInfoChange,
    handleSubmit,
  };
}