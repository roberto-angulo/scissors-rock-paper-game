// @packages
import { useState, useEffect } from 'react';

// @constants
import { BET_STATUSES, MINIMUM_BET } from '../../shared/constants';
import { BetStatus } from '../../shared/types';

interface UseBalanceBetPropsTypes {
    betAmount:number,
    betStatus:BetStatus,
    betResult:{
        userHasWon:boolean,
        userReturnedAmount:number
    }
}

const useBalanceBet = ({ betAmount, betStatus, betResult }:UseBalanceBetPropsTypes) => {
  const [balance, setBalance] = useState<number>(MINIMUM_BET);

  useEffect(() => {
    if(betStatus === BET_STATUSES.STARTING && betAmount) {
        setBalance(balance-betAmount);
    } else if(betStatus === BET_STATUSES.STARTING && !betAmount && !balance) {
      setBalance(MINIMUM_BET);
    } else if(betStatus === BET_STATUSES.FINISHED && betResult.userHasWon) {
        setBalance(balance+betResult.userReturnedAmount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [betAmount, betStatus, betResult.userHasWon, betResult.userReturnedAmount]);

  return balance;
}

export default useBalanceBet;