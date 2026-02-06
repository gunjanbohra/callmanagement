import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { PageTitle } from '@/components/common/PageTitle';
import { PageBreadcrumbs } from '@/components/Layout/PageBreadcrumbs';
import { CompanyInfo } from './CompanyInfo';
import { BankAccounts } from './BankAccounts';
import { CostBreakdownSetup } from './CostBreakdownSetup';

const SETUP_STEPS = [
  'Company Information',
  'Bank Accounts',
  'Cost Breakdown'
] as const;

export function CompanySetup() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const breadcrumbItems = SETUP_STEPS.map((step, index) => ({
    label: step,
    isActive: index === activeStep,
    onClick: () => handleStepClick(index),
  }));

  const renderContent = () => {
    switch (activeStep) {
      case 0:
        return <CompanyInfo onNext={() => setActiveStep(1)} />;
      case 1:
        return <BankAccounts onNext={() => setActiveStep(2)} onBack={() => setActiveStep(0)} />;
      case 2:
        return <CostBreakdownSetup onBack={() => setActiveStep(1)} />;
      default:
        return <CompanyInfo onNext={() => setActiveStep(1)} />;
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <PageTitle 
          title="Company and Finance Setup" 
          subtitle="Configure your company information, bank accounts, and cost breakdown settings"
        />

        <PageBreadcrumbs items={breadcrumbItems} />

        {renderContent()}
      </Paper>
    </Box>
  );
}