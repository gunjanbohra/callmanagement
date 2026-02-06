import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { PaymentDetails } from '@/pages/CallManagement/PaymentDetails';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PaymentDetails', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <PaymentDetails />
        </BrowserRouter>
      </RecoilRoot>
    );
  });

  it('renders payment details form', () => {
    expect(screen.getByText('Payment Details')).toBeInTheDocument();
    expect(screen.getByLabelText('Call Type')).toBeInTheDocument();
    expect(screen.getByText('Mode of Payment')).toBeInTheDocument();
  });

  it('validates form before proceeding', () => {
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  it('allows form submission with valid data', () => {
    // Select call type
    fireEvent.mouseDown(screen.getByLabelText('Call Type'));
    fireEvent.click(screen.getByText('Advance Payment'));

    // Select payment mode
    fireEvent.click(screen.getByLabelText('UPI'));

    // Click next
    fireEvent.click(screen.getByText('Next'));

    expect(mockNavigate).toHaveBeenCalledWith('/payment-amount');
  });
});