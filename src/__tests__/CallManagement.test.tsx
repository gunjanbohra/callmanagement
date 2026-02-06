import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { CallManagement } from '@/pages/CallManagement';

describe('CallManagement', () => {
  it('renders call management form', () => {
    render(
      <RecoilRoot>
        <CallManagement />
      </RecoilRoot>
    );

    expect(screen.getByText('Call Management')).toBeInTheDocument();
    expect(screen.getByLabelText('Call ID')).toBeInTheDocument();
    expect(screen.getByText('Warranty Status')).toBeInTheDocument();
    expect(screen.getByText('Customer Collection')).toBeInTheDocument();
  });

  it('validates form submission', () => {
    render(
      <RecoilRoot>
        <CallManagement />
      </RecoilRoot>
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  });

  it('allows form submission with valid data', () => {
    render(
      <RecoilRoot>
        <CallManagement />
      </RecoilRoot>
    );

    // Select call ID
    fireEvent.mouseDown(screen.getByLabelText('Call ID'));
    fireEvent.click(screen.getByText('CALL001ABC'));

    // Select warranty status
    fireEvent.click(screen.getByLabelText('In Warranty'));

    // Select customer collection
    fireEvent.click(screen.getByLabelText('Yes'));

    // Submit form
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Call details updated successfully!')).toBeInTheDocument();
  });
});