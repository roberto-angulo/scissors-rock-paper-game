import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BET_STATUSES, ROCK_ID, PAPER_ID, SCISSORS_ID, POSITIONS_BET } from '../shared/constants';
import { Bet, BetResultType, BetStatus } from '../shared/types';

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
const DEFAULT_STATE = {
    hasUserWon: false,
    returnedAmount: 0,
    positions: {
        playerPositionId:null,
        computerPositionId:null
    }
}
const getFinalPositionsResult = (bets:Bet[], computerPositionId:number) => {
    const totalBet = bets.reduce((accumulatedBet, bet) => accumulatedBet+bet.betAmount, bets[0].betAmount);
    let output:BetResultType = {
        ...DEFAULT_STATE,
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
const useBetStatus = (bets:Bet[]):[BetStatus, Dispatch<SetStateAction<BetStatus>>, BetResultType] => {
    const [betStatus, setBetStatus] = useState<BetStatus>(BET_STATUSES.STARTING);
    const [betResult, setBetResult] = useState<BetResultType>(DEFAULT_STATE);
    useEffect(() => {
        if(betStatus === BET_STATUSES.IN_PROGRESS) {
            const computerChoice = Math.floor(Math.random() * Object.values(POSITIONS_BET).length);
            setBetResult(getFinalPositionsResult(bets, computerChoice));
            setBetStatus(BET_STATUSES.FINISHED);
        }
        /* else if(betStatus === BET_STATUSES.FINISHED) {
            setBetResult(DEFAULT_STATE);
            setBetStatus(BET_STATUSES.STARTING);
        } */
    }, [bets, betStatus]);

  return [betStatus, setBetStatus, betResult];
}

export default useBetStatus;