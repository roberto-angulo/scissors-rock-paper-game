// @packages
import { render, screen } from '@testing-library/react'

// @components
import BetHeader, { BetHeaderProps } from './BetHeader';

// @constants
import { BET_STATUSES } from '../../shared/constants';

const DEFAULT_STATE:BetHeaderProps = {
    betStatus: BET_STATUSES.STARTING,
    betResult: [{
        hasUserWon: undefined,
        returnedAmount: 0,
        positions: {
            computerPositionId: null,
            playerPositionId: null
        }
    }]
};
const setup = (props:BetHeaderProps) => render(<BetHeader {...props} />);

describe('Test <BetHeader />', () => {
    test('Check that right header is displayed on STARTING bet status', () => {
        setup(DEFAULT_STATE);
        expect(screen.getByTestId('bet-header')).toHaveTextContent('PICK YOUR POSITIONS');
    });

    test('Check that right header is displayed on IN_PROGRESS bet status', () => {
        setup({
            betStatus: BET_STATUSES.IN_PROGRESS,
            betResult: [{
                hasUserWon: false,
                returnedAmount: 0,
                positions: {
                    computerPositionId: 1,
                    playerPositionId: 2
                }
            }]
        });
        expect(screen.getByTestId('bet-header')).toHaveTextContent('ROCK VS PAPER');
    });

    test('Check that right header is displayed when user won', () => {
        setup({
            betStatus: BET_STATUSES.FINISHED,
            betResult: [{
                hasUserWon: true,
                returnedAmount: 5000,
                positions: {
                    computerPositionId: 1,
                    playerPositionId: 2
                }
            }]
        });
        expect(screen.getByTestId('bet-header')).toHaveTextContent('PAPER WON YOU WIN 5000.00');
    });

    test('Check that right header is displayed when user lose', () => {
        setup({
            betStatus: BET_STATUSES.FINISHED,
            betResult: [{
                hasUserWon: false,
                returnedAmount: 0,
                positions: {
                    computerPositionId: 2,
                    playerPositionId: 1
                }
            }]
        });
        expect(screen.getByTestId('bet-header')).toHaveTextContent('ROCK LOST');
    });
});