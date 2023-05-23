// @packages
import cx from 'classnames';

// @styles
import css from './BetPositionCard.module.scss';

// @types
import { BetPositionCardProps } from './BetPositionCard.types';

const POSITION_CARD_STYLES:{ [key:string]:string } = {
  ROCK: css.BetPositionCardRock,
  PAPER: css.BetPositionCardPaper,
  SCISSORS: css.BetPositionCardScissors
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
        <div>
          {!!betAmount && <div className={css.BetPositionCardAmount}>
              <span>{betAmount}</span>
            </div>}
          <div>{positionName}</div>
        </div>
    </div>
  )
}

export default BetPositionCard;