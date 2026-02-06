import { Stepper, Step, StepLabel, Box } from '@mui/material';

export const STEPPER_STEPS = [
  'Call Details',
  'Payment Details',
  'Cost Breakdown',
  'Payment Preview',
  'Payment Confirmation'
] as const;

export const SETUP_STEPS = [
  'Company Information',
  'Bank Accounts',
  'Cost Breakdown'
] as const;

export type StepperStep = typeof STEPPER_STEPS[number] | typeof SETUP_STEPS[number];

interface PageStepperProps {
  activeStep: number;
  steps?: typeof STEPPER_STEPS | typeof SETUP_STEPS;
}

export function PageStepper({ activeStep, steps = STEPPER_STEPS }: PageStepperProps) {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}