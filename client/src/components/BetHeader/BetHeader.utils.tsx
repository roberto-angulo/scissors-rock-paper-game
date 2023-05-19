// @constants
import { BET_STATUSES, POSITIONS_BET } from "../../shared/constants";

// @types
import { BetResultType } from "../../shared/types";

// @styles
import css from './BetHeader.module.scss';

export const getPositionBet = (id:number) => POSITIONS_BET.find(bet => bet.betPositionId === id);
export const getHeaderMessage = (betStatus:string, betResult:BetResultType) => {
    if(betStatus === BET_STATUSES.STARTING) {
        return <h1 className={css.BetHeaderStartingPosition}>PICK YOUR POSITIONS</h1>;
    }
    if(betStatus === BET_STATUSES.IN_PROGRESS) {
        return (
            <h1>
                <span>
                {getPositionBet(betResult.positions.computerPositionId as number)?.betPositionName}
                </span>
                <span> VS </span>
                <span>
                {getPositionBet(betResult.positions.playerPositionId as number)?.betPositionName}
                </span>
            </h1>
        );
    }
    if(betStatus === BET_STATUSES.FINISHED) {
      return (<div>
                {betResult.hasUserWon
                ? <p>
                    {betResult.positions.playerPositionId} WON
                    <p>YOU WIN {betResult.returnedAmount.toFixed(2)}</p>
                </p>
                : `${betResult.positions.playerPositionId} LOST`}
                </div>
      );
    }
}