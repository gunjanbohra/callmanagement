import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { CostBreakdown } from '@/pages/CallManagement/CostBreakdown';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CostBreakdown', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <CostBreakdown />
        </BrowserRouter>
      </RecoilRoot>
    );
  });

  it('renders cost breakdown form', () => {
    expect(screen.getByText('Cost Breakdown')).toBeInTheDocument();
    expect(screen.getByLabelText('Labour Cost')).toBeInTheDocument();
    expect(screen.getByLabelText('Parts Cost')).toBeInTheDocument();
    expect(screen.getByLabelText('Freight Charges')).toBeInTheDocument();
    expect(screen.getByLabelText('Other Charges')).toBeInTheDocument();
  });

  it('calculates tax and total correctly', () => {
    const labourInput = screen.getByLabelText('Labour Cost');
    fireEvent.change(labourInput, { target: { value: '1000' } });

    // Check if tax amount is calculated correctly (18% of 1000 = 180)
    expect(screen.getByLabelText('Tax Amount')).toHaveValue('₹ 180.00');
    
    // Check if total is calculated correctly (1000 + 180 = 1180)
    expect(screen.getByLabelText('Total')).toHaveValue('₹ 1,180.00');
  });

  it('validates form before proceeding', () => {
    const acceptButton = screen.getByText('Accept & Proceed to Payment');
    fireEvent.click(acceptButton);

    expect(screen.getByText('Please enter at least one cost item')).toBeInTheDocument();
  });
});