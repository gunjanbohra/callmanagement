import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { SignUp } from '@/pages/Auth/SignUp';
import { Login } from '@/pages/Auth/Login';
import { ForgotPin } from '@/pages/Auth/ForgotPin';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <RecoilRoot>
      <BrowserRouter>{component}</BrowserRouter>
    </RecoilRoot>
  );
};

describe('Authentication Pages', () => {
  describe('SignUp', () => {
    it('renders signup form', () => {
      renderWithRouter(<SignUp />);
      expect(screen.getByText('Create Account')).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^PIN$/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Confirm PIN/i)).toBeInTheDocument();
    });

    it('validates form inputs', async () => {
      renderWithRouter(<SignUp />);
      
      const submitButton = screen.getByText('Create Account');
      fireEvent.click(submitButton);

      expect(await screen.findByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Mobile number is required')).toBeInTheDocument();
      expect(screen.getByText('PIN is required')).toBeInTheDocument();
    });
  });

  describe('Login', () => {
    it('renders login form', () => {
      renderWithRouter(<Login />);
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/PIN/i)).toBeInTheDocument();
      expect(screen.getByText('Forgot PIN?')).toBeInTheDocument();
    });

    it('validates form inputs', async () => {
      renderWithRouter(<Login />);
      
      const submitButton = screen.getByText('Login');
      fireEvent.click(submitButton);

      expect(await screen.findByText('Mobile number is required')).toBeInTheDocument();
      expect(screen.getByText('PIN is required')).toBeInTheDocument();
    });
  });

  describe('ForgotPin', () => {
    it('renders forgot pin form', () => {
      renderWithRouter(<ForgotPin />);
      expect(screen.getByText('Forgot PIN')).toBeInTheDocument();
      expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
      expect(screen.getByText('Send New PIN')).toBeInTheDocument();
    });

    it('shows success message after submission', async () => {
      renderWithRouter(<ForgotPin />);
      
      const mobileInput = screen.getByLabelText(/Mobile Number/i);
      fireEvent.change(mobileInput, { target: { value: '1234567890' } });
      
      const submitButton = screen.getByText('Send New PIN');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/A new PIN has been sent to your mobile number/i)).toBeInTheDocument();
      });
    });

    it('validates mobile number', async () => {
      renderWithRouter(<ForgotPin />);
      
      const submitButton = screen.getByText('Send New PIN');
      fireEvent.click(submitButton);

      expect(await screen.findByText('Mobile number is required')).toBeInTheDocument();
    });
  });
});