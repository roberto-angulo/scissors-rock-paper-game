// @packages
import { useState } from 'react';

// @components
import BetPositionCard from '../BetPositionCard/BetPositionCard';

// @types
import { Bet, BetPositionIdType } from '../../shared/types';

// @styles
import css from './BetContainer.module.scss';

// @constants
import { BET_DEFAULT_STATE, BET_STATUSES, MAX_BET_POSITIONS, MINIMUM_BET } from '../../shared/constants';

// @hooks
import useBetStatus from '../../hooks/useBetStatus/useBetStatus';

// @components
import BetHeader from '../BetHeader/BetHeader';
import Button from '../Button/Button';
import BetBalance from '../BetBalance/BetBalance';
import { getTotalBetAmount } from '../../hooks/useBetStatus/useBetStatus.utils';
import useBalanceBet from '../../hooks/useBalanceBet/useBalanceBet';

const BetContainer = () => {
  const [bets, setBets] = useState<Bet[]>(BET_DEFAULT_STATE);
  const [betStatus, setBetStatus, betResult] = useBetStatus(bets.filter(({ betAmount }) => betAmount));
  const [errorBet, setErrorBet] = useState<string>('');
  const userHasWon = betResult.some((bet) => bet.hasUserWon);
  const betAmount = getTotalBetAmount(bets);
  const userReturnedAmount = betResult.reduce((accumulated, bet) => accumulated+bet.returnedAmount, 0);
  const balance = useBalanceBet({
    betAmount,
    betStatus,
    betResult: {
      userHasWon,
      userReturnedAmount
  }});

  const setBetAmount = (id:BetPositionIdType) => {
    if((betAmount+MINIMUM_BET) > balance) {
      setErrorBet(`You must have a minimum of ${MINIMUM_BET} to place a bet.`);
      return;
    }
    const userBetsPositions = bets.filter(bet => bet.betPositionId !== id && bet.betAmount);
    if(userBetsPositions.length === MAX_BET_POSITIONS) {
      return;
    }
    const newState = [...bets];
    const positionAffected = bets.findIndex(bet => bet.betPositionId === id);
    newState[positionAffected] = {
      ...newState[positionAffected],
      betAmount: newState[positionAffected].betAmount+MINIMUM_BET
    }
    setBets(newState);
  };
  return (
    <div className={css.BetContainer}>
      <BetBalance
        balance={balance}
        bet={betAmount}
        win={userHasWon
          ? userReturnedAmount-betAmount
          : 0}
      />
      <BetHeader betStatus={betStatus} betResult={betResult} errorMessage={errorBet} />
      <div className={css.BetContainerCards}>
        {bets.map(bet => (
          <BetPositionCard
            cardClass={css.BetContainer_Card}
            key={bet.betPositionId}
            betAmount={bet.betAmount}
            positionId={bet.betPositionId}
            positionName={bet.betPositionName}
            setBetAmount={setBetAmount}
          />
        ))}
      </div>
      <div className={css.BetContainerButtonWrapper}>
        <Button
          classes={css.BetContainerButton}
          onClickHandler={() => {
            if(betStatus === BET_STATUSES.STARTING && !errorBet) {
              setBetStatus(BET_STATUSES.IN_PROGRESS);
            } else if(errorBet) {
              setBets(BET_DEFAULT_STATE);
              setErrorBet('');
            } else if(betStatus === BET_STATUSES.FINISHED) {
              setBetStatus(BET_STATUSES.STARTING);
              setBets(BET_DEFAULT_STATE);
            }
        }}
          disabled={betStatus === BET_STATUSES.IN_PROGRESS}
          >
          {betStatus === BET_STATUSES.FINISHED || errorBet ? "CLEAR" : "PLAY"}
        </Button>
      </div>
    </div>
  )
}

export default BetContainer;