import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { Counter } from '@/pages/Home/Counter';

describe('Counter', () => {
  it('renders counter buttons', () => {
    render(
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    );

    expect(screen.getByText('Increase')).toBeInTheDocument();
    expect(screen.getByText('Decrease')).toBeInTheDocument();
  });

  it('increases count when increase button is clicked', () => {
    render(
      <RecoilRoot>
        <Counter />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByText('Increase'));
    // Add assertions for state change
  });
});