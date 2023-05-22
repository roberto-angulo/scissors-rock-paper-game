// @packages
import cx from 'classnames';

// @styles
import css from './BetPositionCard.module.scss';

// @types
import { BetPositionCardProps } from './BetPositionCard.types';
import { BetPositionIdType } from '../../shared/types';

const getPositionCardClass = (positionId:BetPositionIdType) => {}

const POSITION_CARD_STYLES:{ [key:string]:string } = {
  ROCK: css.BetPositionCard_Rock,
  PAPER: css.BetPositionCard_Paper,
  SCISSORS: css.BetPositionCard_Scissors
}

const BetPositionCard = ({
  betAmount,
  cardClass,
  positionId,
  positionName,
  setBetAmount,
}:BetPositionCardProps) => {
  return (
    <div data-testid={`cardBet_${positionName}`}
        className={cx(css.BetPositionCard, POSITION_CARD_STYLES[positionName], cardClass)}
        onClick={() => setBetAmount(positionId)}
    >
        {!!betAmount && <div>{betAmount}</div>}
        <div>{positionName}</div>
    </div>
  )
}

export default BetPositionCard;