import { PAPER_ID, ROCK_ID, SCISSORS_ID } from "../../shared/constants";
import { Bet, BetResultType } from "../../shared/types";

export const hasPlayerWon = (playerPositionId:number , computerPositionId:number):boolean => {
    if(playerPositionId === computerPositionId) {
        return false;
    }

    if(playerPositionId === SCISSORS_ID) {
        return computerPositionId === PAPER_ID;
    }

    if(playerPositionId === ROCK_ID) {
        return computerPositionId === SCISSORS_ID;
    }

    if(playerPositionId === PAPER_ID) {
        return computerPositionId === ROCK_ID;
    }

    return false;
}

export const getRandomPositionId = (min:number, max:number):number => Math.floor(Math.random() * (max - min + 1) + min);

export const calculateBetResult = (bets:number, totalBet:number):number => bets === 2
                                                        ? totalBet * 3
                                                        : totalBet * 14;

export const getTotalBetAmount = (bets:Bet[]) => bets.reduce((accumulatedBet, bet) => accumulatedBet+bet.betAmount, 0);

export const getFinalPositionsResult = (bets:Bet[], computerPositionId:number):BetResultType[] =>
    bets.map(({ betPositionId }) => hasPlayerWon(betPositionId, computerPositionId) ? {
        hasUserWon: true,
        positions: {
            computerPositionId,
            playerPositionId: betPositionId, 
        },
        returnedAmount: calculateBetResult(bets.length, getTotalBetAmount(bets)),
    } : {
        hasUserWon: false,
        returnedAmount: 0,
        positions: {
            computerPositionId,
            playerPositionId: betPositionId
        }
    });