// @packages
import { useState } from 'react';

// @components
import BetPositionCard from '../BetPositionCard/BetPositionCard';

// @constants
import { Bet, BetPositionIdType, BetStatus } from '../../shared/types';

// @styles
import css from './BetContainer.module.scss';
import { BET_STATUSES } from '../../shared/constants';
import useBetStatus from '../../hooks/useBetStatus';

const BET_DEFAULT_STATE:Bet[] = [
  {
    betPositionId: 1,
    betPositionName: 'ROCK',
    betAmount: 0
  },
  {
    betPositionId: 2,
    betPositionName: 'PAPER',
    betAmount: 0
  },
  {
    betPositionId: 1,
    betPositionName: 'SCISSORS',
    betAmount: 0
  },
];

const BetContainer = () => {
  const [bets, setBets] = useState<Bet[]>(BET_DEFAULT_STATE);
  /* const [hasPlayed, setHasPlayed] = useState<boolean>(false); */
  /* const [betStatus, setBetStatus] = useState<BetStatus>(BET_STATUSES.STARTING); */
  const [betStatus, setBetStatus, betResult] = useBetStatus(bets);

  const setBetAmount = (id:BetPositionIdType) => {
    const newState = [...bets];
    const positionAffected = bets.findIndex(bet => bet.betPositionId === id);
    newState[positionAffected] = {
      ...newState[positionAffected],
      betAmount: newState[positionAffected].betAmount+500
    }
    setBets(newState);
  };
  console.log('BET RESULT:', betResult);
  return (
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
      <button onClick={() => {
        setBetStatus(BET_STATUSES.IN_PROGRESS);
      }}>PLAY</button>
    </div>
  )
}

export default BetContainer;