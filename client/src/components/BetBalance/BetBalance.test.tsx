// @packages
import React from 'react';
import { render, screen } from '@testing-library/react';

// @components
import BetBalance from './BetBalance';

describe('BetBalance component', () => {
  test('displays the correct balance, bet, and win values', () => {
    render(<BetBalance balance={100} bet={20} win={50} />);

    expect(screen.getByTestId('balanceValue')).toHaveTextContent('BALANCE: 100');
    expect(screen.getByTestId('betValue').textContent).toContain('BET: 20');
    expect(screen.getByTestId('winValue').textContent).toContain('WIN: 50');
  });
});
