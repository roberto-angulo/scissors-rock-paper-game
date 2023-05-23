// @package
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

// @components
import BetContainer from './BetContainer';

const setup = () => render(<BetContainer />);

describe('Test <BetContainer />', () => {
    test('Bet on one position, and get lost result accordingly', () => {
        setup();
        const paperCard = screen.getByTestId('cardBet_PAPER');
        /* const rockCard = screen.getByText('cardBet_ROCK'); */
        const playButton = screen.getByTestId('betButton');
        userEvent.click(paperCard);
        /* userEvent.click(rockCard); */
        userEvent.click(playButton); 
        act(() => {
            expect(screen.getByText('LOST')).toBeTruthy();
        });
    });
});