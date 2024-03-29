// @constants
import { BET_STATUSES, POSITIONS_BET } from "../../shared/constants";
import { BetStatus } from "../../shared/types";

// @types
import { BetResultType } from "../../shared/types";

// @styles
import css from './BetHeader.module.scss';

export const getPositionBet = (id:number) => POSITIONS_BET.find(bet => bet.betPositionId === id);
export const getInitMessage = (betStatus:BetStatus) => betStatus === BET_STATUSES.STARTING
    ? <h1 data-testid="startingHeaderPositionsBet" className={css.BetHeaderStartingPosition}>
        PICK YOUR POSITIONS
      </h1>
    : <></>;
export const getHeaderMessage = (betStatus:BetStatus, betResult:BetResultType) => {
    
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
                    ? <div className={css.BetHeaderFinishedPosition}>
                        {getPositionBet(betResult.positions.playerPositionId as number)?.betPositionName} WON {" "}
                        <p className={css.BetHeaderFinishedPosition__winMessage}>
                            YOU WIN {" "}
                            <span  className={css.BetHeaderFinishedPosition__moneyReturned}>
                                {betResult.returnedAmount.toFixed(2)}
                            </span>
                        </p>
                    </div>
                    : <p className={css.BetHeaderFinishedPositionLose}>
                        {getPositionBet(betResult.positions.playerPositionId as number)?.betPositionName}
                        {" "} LOST
                      </p>}
                </h1>
      );
    }
}