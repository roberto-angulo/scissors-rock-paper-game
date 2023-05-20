// @packages
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// @constants
import { BET_STATUSES, POSITIONS_BET, DEFAULT_BET_RESULT_STATE } from '../../shared/constants';

// @types
import { Bet, BetResultType, BetStatus } from '../../shared/types';

// @utils
import { getFinalPositionsResult } from './useBetStatus.utils';

const useBetStatus = (bets:Bet[]):[BetStatus, Dispatch<SetStateAction<BetStatus>>, BetResultType] => {
    const [betStatus, setBetStatus] = useState<BetStatus>(BET_STATUSES.STARTING);
    const [betResult, setBetResult] = useState<BetResultType>(DEFAULT_BET_RESULT_STATE);
    useEffect(() => {
        let timeout:NodeJS.Timeout;
        if(betStatus === BET_STATUSES.IN_PROGRESS) {
            const maxPossibleChoices = Object.values(POSITIONS_BET).length;
            const computerChoice = Math.floor(Math.random() * maxPossibleChoices);
            setBetResult(getFinalPositionsResult(bets, computerChoice));
            timeout = setTimeout(() => {
                setBetStatus(BET_STATUSES.FINISHED);
            }, 3000);
        } else if(betStatus === BET_STATUSES.STARTING
            && betResult.hasUserWon !== undefined) {
            setBetResult(DEFAULT_BET_RESULT_STATE);
        }
        return () => clearTimeout(timeout);

    }, [bets, betStatus, betResult.hasUserWon]);

  return [betStatus, setBetStatus, betResult];
}

export default useBetStatus;
