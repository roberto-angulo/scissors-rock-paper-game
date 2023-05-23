// @constants
import { BET_STATUSES, POSITIONS_BET } from "../../shared/constants";

// @types
import { BetResultType } from "../../shared/types";

// @styles
import css from './BetHeader.module.scss';

export const getPositionBet = (id:number) => POSITIONS_BET.find(bet => bet.betPositionId === id);
export const getHeaderMessage = (betStatus:string, betResult:BetResultType) => {
    if(betStatus === BET_STATUSES.STARTING) {
        return <h1 data-testid="startingHeaderPositionsBet" className={css.BetHeaderStartingPosition}>
                PICK YOUR POSITIONS
            </h1>;
    }
    if(betStatus === BET_STATUSES.IN_PROGRESS) {
        return (
            <h1 className={css.BetHeaderProgressPosition} data-testid="inProgressHeaderPositionsBet">
                <span>
                    {getPositionBet(betResult.positions.computerPositionId as number)?.betPositionName}
                </span>
                <span className={css.BetHeaderProgressPosition__vs}> VS </span>
                <span>
                    {getPositionBet(betResult.positions.playerPositionId as number)?.betPositionName}
                </span>
            </h1>
        );
    }
    if(betStatus === BET_STATUSES.FINISHED) {
      return (<h1 className={css.BetHeaderFinishedPosition} data-testid="finishedHeaderPositionsBet">
                {betResult.hasUserWon
                    ? <p className={css.BetHeaderFinishedPosition}>
                        {getPositionBet(betResult.positions.playerPositionId as number)?.betPositionName} WON {" "}
                        <p className={css.BetHeaderFinishedPosition__winMessage}>
                            YOU WIN {" "}
                            <span  className={css.BetHeaderFinishedPosition__moneyReturned}>
                                {betResult.returnedAmount.toFixed(2)}
                            </span>
                        </p>
                    </p>
                    : <p className={css.BetHeaderFinishedPositionLose}>
                        <span className={css.BetHeaderFinishedPosition__loseMessage}>
                            {getPositionBet(betResult.positions.playerPositionId as number)?.betPositionName}</span> LOST
                        </p>}
                </h1>
      );
    }
}