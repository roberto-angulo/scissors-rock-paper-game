// @packages
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// @constants
import { BET_STATUSES, DEFAULT_BET_RESULT_STATE, ROCK_ID, SCISSORS_ID } from '../../shared/constants';

// @types
import { Bet, BetResultType, BetStatus } from '../../shared/types';

// @utils
import { getFinalPositionsResult, getRandomPositionId } from './useBetStatus.utils';

const useBetStatus = (bets:Bet[]):[BetStatus, Dispatch<SetStateAction<BetStatus>>, BetResultType[]] => {
    const [betStatus, setBetStatus] = useState<BetStatus>(BET_STATUSES.STARTING);
    const [betResult, setBetResult] = useState<BetResultType[]>([]);
    useEffect(() => {
        let timeout:NodeJS.Timeout;
        if(betStatus === BET_STATUSES.IN_PROGRESS) {
            const computerChoice = getRandomPositionId(ROCK_ID, SCISSORS_ID);
            setBetResult(getFinalPositionsResult(bets, computerChoice));
            timeout = setTimeout(() => {
                setBetStatus(BET_STATUSES.FINISHED);
            }, 3000);
        } else if(betStatus === BET_STATUSES.STARTING
            && betResult.length
            && betResult.some(({ hasUserWon }) => hasUserWon !== undefined)
        ) {
            setBetResult(DEFAULT_BET_RESULT_STATE);
        }
        return () => clearTimeout(timeout);

    }, [betStatus, betResult.length]);

  return [betStatus, setBetStatus, betResult];
}

export default useBetStatus;
