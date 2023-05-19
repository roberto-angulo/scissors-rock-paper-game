import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BET_STATUSES, ROCK_ID, PAPER_ID, SCISSORS_ID } from '../shared/constants';
import { Bet, BetStatus } from '../shared/types';

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

interface BetResultType {
    hasUserWon:boolean,
    returnedAmount:number,
    positions: {
        playerPositionId:number,
        computerPositionId:number
    }
}
const calculateBetResult = (bets:number, totalBet:number) => bets === 2
                                                        ? totalBet * 3
                                                        : totalBet * 14;

const useBetStatus = (bets:Bet[]):[BetStatus, Dispatch<SetStateAction<BetStatus>>, BetResultType] => {
    const [betStatus, setBetStatus] = useState<BetStatus>(BET_STATUSES.STARTING);
    const [betResult, setBetResult] = useState<BetResultType>({ hasUserWon: false, returnedAmount: 0 });
    useEffect(() => {
        if(betStatus === BET_STATUSES.IN_PROGRESS && bets.length) {
            const computerChoice = Math.floor(Math.random() * Object.values(BET_STATUSES).length);
            const hasUserWon = bets.some(bet => hasPlayerWon(bet.betPositionId, computerChoice));
            const totalBetAmount = bets.reduce((accumulatedBet, bet) => accumulatedBet+bet.betAmount, bets[0].betAmount);
            if(hasUserWon) {
                setBetResult({
                    hasUserWon,
                    returnedAmount: calculateBetResult(bets.length, totalBetAmount)
                });
            }

        }
    }, [bets, betStatus]);

  return [betStatus, setBetStatus, betResult];
}

export default useBetStatus;