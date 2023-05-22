// import { render, screen, act } from '@testing-library/react'
import { calculateBetResult, getFinalPositionsResult, getRandomPositionId, getTotalBetAmount, hasPlayerWon } from './useBetStatus.utils';
import { Bet, BetResultType } from '../../shared/types';
import { PAPER_ID, ROCK_ID, SCISSORS_ID } from '../../shared/constants';

describe('Test getFinalPositionsResult util', () => {
    test('Check that we get the right output for player losts, on one bet position', () => {
        const bets:Bet[] = [{ betAmount: 1000, betPositionId: PAPER_ID, betPositionName: 'PAPER' }];
        const outputExpected:BetResultType[] = [{
            hasUserWon: false,
            returnedAmount: 0,
            positions: {
                computerPositionId: SCISSORS_ID,
                playerPositionId: PAPER_ID
            }
        }];
        expect(getFinalPositionsResult(bets, SCISSORS_ID)).toMatchObject(outputExpected);
    });

    test('Check that we get the right output for player wins, on one bet position', () => {
        const bets:Bet[] = [{ betAmount: 1000, betPositionId: SCISSORS_ID, betPositionName: 'SCISSORS' }];
        const outputExpected:BetResultType[] = [{
            hasUserWon: true,
            returnedAmount: 14000,
            positions: {
                computerPositionId: PAPER_ID,
                playerPositionId: SCISSORS_ID
            }
        }];
        expect(getFinalPositionsResult(bets, PAPER_ID)).toMatchObject(outputExpected);
    });

    test('Check that we get the right output for player wins, on several bets position', () => {
        const bets:Bet[] = [
            {
                betAmount: 1000,
                betPositionId: ROCK_ID,
                betPositionName: 'ROCK'
            },
            {
                betAmount: 2500,
                betPositionId: SCISSORS_ID,
                betPositionName: 'SCISSORS'
            }
        ];
        const outputExpected:BetResultType[] = [
            {
                hasUserWon: false,
                returnedAmount: 0,
                positions: {
                    computerPositionId: PAPER_ID,
                    playerPositionId: ROCK_ID
                }
            }, {
            hasUserWon: true,
            returnedAmount: 10500,
            positions: {
                computerPositionId: PAPER_ID,
                playerPositionId: SCISSORS_ID
            }
        }];
        expect(getFinalPositionsResult(bets, PAPER_ID)).toMatchObject(outputExpected);
    });

    test('Check that we get the right output for player losts, on several bets position', () => {
        const bets:Bet[] = [
            {
                betAmount: 1000,
                betPositionId: ROCK_ID,
                betPositionName: 'ROCK'
            },
            {
                betAmount: 2500,
                betPositionId: PAPER_ID,
                betPositionName: 'PAPER'
            }
        ];
        const outputExpected:BetResultType[] = [
            {
                hasUserWon: false,
                returnedAmount: 0,
                positions: {
                    computerPositionId: PAPER_ID,
                    playerPositionId: ROCK_ID
                }
            }, {
            hasUserWon: false,
            returnedAmount: 0,
            positions: {
                computerPositionId: PAPER_ID,
                playerPositionId: PAPER_ID
            }
        }];
        expect(getFinalPositionsResult(bets, PAPER_ID)).toMatchObject(outputExpected);
    });
});

describe('Test getTotalBetAmount util', () => {
    test('Check that return the right output for more than one bet', () => {
        const bets:Bet[] = [
            {
                betAmount: 1000,
                betPositionId: ROCK_ID,
                betPositionName: 'ROCK'
            },
            {
                betAmount: 2500,
                betPositionId: PAPER_ID,
                betPositionName: 'PAPER'
            }
        ];
        expect(getTotalBetAmount(bets)).toBe(3500);
    });

    test('Check that return the right output for one bet', () => {
        const bets:Bet[] = [
            {
                betAmount: 1000,
                betPositionId: ROCK_ID,
                betPositionName: 'ROCK'
            }];
        expect(getTotalBetAmount(bets)).toBe(1000);
    });
});

describe('Test calculateBetResult util', () => {
    test('Check that, if one bet was made, it returns: total bet * 14', () => {
        expect(calculateBetResult(1, 1000)).toBe(14000);
    });

    test('Check that, if two bets were made, it returns: total bet * 3', () => {
        expect(calculateBetResult(2, 1000)).toBe(3000);
    });
});

describe('Test getRandomPositionId util', () => {
    test('Check that getRandomPositionId output a number between 1 - 3', () => {
        const output = getRandomPositionId(1, 3);
        expect(output).toBeGreaterThanOrEqual(1);
        expect(output).toBeLessThanOrEqual(3);
    });
});

describe('Test hasPlayerWon', () => {
    test('Check that if the result is a tie, the user lose', () => {
        expect(hasPlayerWon(SCISSORS_ID, SCISSORS_ID)).toBe(false);
    });

    test('Check that if user selects SCISSORS, and computer selects PAPER, user wins', () => {
        expect(hasPlayerWon(SCISSORS_ID, PAPER_ID)).toBe(true);
    });

    test('Check that if user selects SCISSORS, and computer selects ROCK, user lose', () => {
        expect(hasPlayerWon(SCISSORS_ID, ROCK_ID)).toBe(false);
    });

    test('Check that if user selects ROCK, and computer selects SCISSORS, user wins', () => {
        expect(hasPlayerWon(ROCK_ID, SCISSORS_ID)).toBe(true);
    });

    test('Check that if user selects ROCK, and computer selects PAPER, user lose', () => {
        expect(hasPlayerWon(ROCK_ID, PAPER_ID)).toBe(false);
    });

    test('Check that if user selects PAPER, and computer selects ROCK, user wins', () => {
        expect(hasPlayerWon(PAPER_ID, ROCK_ID)).toBe(true);
    });

    test('Check that if user selects PAPER, and computer selects SCISSORS, user lose', () => {
        expect(hasPlayerWon(PAPER_ID, SCISSORS_ID)).toBe(false);
    });
});