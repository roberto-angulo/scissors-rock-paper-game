// @packages
import { useState } from 'react';

// @components
import BetPositionCard from '../BetPositionCard/BetPositionCard';

// @types
import { Bet, BetPositionIdType } from '../../shared/types';

// @styles
import css from './BetContainer.module.scss';

// @constants
import { BET_DEFAULT_STATE, BET_STATUSES, MAX_BET_POSITIONS } from '../../shared/constants';

// @hooks
import useBetStatus from '../../hooks/useBetStatus/useBetStatus';

// @components
import BetHeader from '../BetHeader/BetHeader';
import Button from '../Button/Button';

const BetContainer = () => {
  const [bets, setBets] = useState<Bet[]>(BET_DEFAULT_STATE);
  const [betStatus, setBetStatus, betResult] = useBetStatus(bets.filter(({ betAmount }) => betAmount));
  const setBetAmount = (id:BetPositionIdType) => {
    const userBetsPositions = bets.filter(bet => bet.betPositionId !== id && bet.betAmount);
    if(userBetsPositions.length === MAX_BET_POSITIONS) {
      return;
    }
    const newState = [...bets];
    const positionAffected = bets.findIndex(bet => bet.betPositionId === id);
    newState[positionAffected] = {
      ...newState[positionAffected],
      betAmount: newState[positionAffected].betAmount+500
    }
    setBets(newState);
  };
  console.log('BET RESULT =>', betResult);
  return (
    <div>
      <BetHeader betStatus={betStatus} betResult={betResult} />
      <div className={css.BetContainer}>
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
            if(betStatus === BET_STATUSES.STARTING) {
              setBetStatus(BET_STATUSES.IN_PROGRESS);
            } else if(betStatus === BET_STATUSES.FINISHED) {
              setBets(BET_DEFAULT_STATE);
              setBetStatus(BET_STATUSES.STARTING);
            }
        }}
          disabled={betStatus === BET_STATUSES.IN_PROGRESS}
          >
          {betStatus === BET_STATUSES.FINISHED ? "CLEAR" : "PLAY"}
        </Button>
      </div>
    </div>
  )
}

export default BetContainer;