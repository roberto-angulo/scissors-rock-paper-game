// @packages
import { render, screen } from '@testing-library/react'
import React from 'react';

// @utils
import { getHeaderMessage, getPositionBet } from './BetHeader.utils';

// @constants
import { BET_STATUSES, PAPER_ID, ROCK_ID, SCISSORS_ID } from '../../shared/constants';

describe('Test getPositionBet', () => {
    test('Check that returns the right object', () => {
        const expectedOutput = {
            betPositionId: 3,
            betPositionName: 'SCISSORS'
        };
        expect(getPositionBet(SCISSORS_ID)).toMatchObject(expectedOutput);
    });
});

describe('Test getHeaderMessage', () => {
    test('Check that right output is returned for bets on STARTING status', () => {
        render(getHeaderMessage(BET_STATUSES.STARTING, {
            hasUserWon: undefined,
            returnedAmount: 0,
            positions: {
                computerPositionId: null,
                playerPositionId: null
            }
        }) as React.ReactElement);
        expect(screen.getByTestId('startingHeaderPositionsBet')).toHaveTextContent('PICK YOUR POSITIONS');
    });

    test('Check that right output is returned for bets on IN_PROGRESS status', () => {
        render(getHeaderMessage(BET_STATUSES.IN_PROGRESS, {
            hasUserWon: false,
            returnedAmount: 0,
            positions: {
                computerPositionId: ROCK_ID,
                playerPositionId: PAPER_ID
            }
        }) as React.ReactElement);
        expect(screen.getByTestId('inProgressHeaderPositionsBet')).toHaveTextContent('ROCK VS PAPER');
    });

    test('Check that right output is returned for bets on FINISHED status, when user wins', () => {
        render(getHeaderMessage(BET_STATUSES.FINISHED, {
            hasUserWon: true,
            returnedAmount: 3000,
            positions: {
                computerPositionId: ROCK_ID,
                playerPositionId: PAPER_ID
            }
        }) as React.ReactElement);
        expect(screen.getByTestId('finishedHeaderPositionsBet')).toHaveTextContent('PAPER WON YOU WIN 3000');
    });

    test('Check that right output is returned for bets on FINISHED status, when user lose', () => {
        render(getHeaderMessage(BET_STATUSES.FINISHED, {
            hasUserWon: false,
            returnedAmount: 0,
            positions: {
                computerPositionId: SCISSORS_ID,
                playerPositionId: PAPER_ID
            }
        }) as React.ReactElement);
        expect(screen.getByTestId('finishedHeaderPositionsBet')).toHaveTextContent('PAPER LOST');
    });
});