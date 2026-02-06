import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { Home } from '@/pages/Home';

describe('Dashboard', () => {
  it('renders financial metrics', () => {
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    );

    expect(screen.getByText('Financial Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Total Due Amount')).toBeInTheDocument();
    expect(screen.getByText('Advance Paid')).toBeInTheDocument();
    expect(screen.getByText('Remaining Balance')).toBeInTheDocument();
  });

  it('displays transaction list', () => {
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    );

    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    expect(screen.getByText('Initial advance payment')).toBeInTheDocument();
    expect(screen.getByText('Project milestone 1')).toBeInTheDocument();
  });
});