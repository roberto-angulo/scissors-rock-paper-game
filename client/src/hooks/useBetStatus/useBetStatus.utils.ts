import { PAPER_ID, ROCK_ID, SCISSORS_ID } from "../../shared/constants";
import { Bet, BetResultType } from "../../shared/types";

const hasPlayerWon = (playerPositionId:number , computerPositionId:number) => {
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
}

const calculateBetResult = (bets:number, totalBet:number) => bets === 2
                                                        ? totalBet * 3
                                                        : totalBet * 14;

export const getFinalPositionsResult = (bets:Bet[], computerPositionId:number) => {
    const totalBet = bets.reduce((accumulatedBet, bet) => accumulatedBet+bet.betAmount, bets[0].betAmount);
    let output:BetResultType = {
        hasUserWon: false,
        returnedAmount: 0,
        positions: {
            computerPositionId,
            playerPositionId: bets[0].betPositionId
        }
    };
    bets.forEach(bet => {
        if(hasPlayerWon(bet.betPositionId, computerPositionId)) {
            return output = {
                hasUserWon: true,
                positions: {
                    computerPositionId,
                    playerPositionId: bet.betPositionId, 
                },
                returnedAmount: calculateBetResult(bets.length, totalBet),
            }
        }
    });
    return output;
}
