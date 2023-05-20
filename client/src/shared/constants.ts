// @types
import { PositionBet } from "./types";

export const DEFAULT_BET_RESULT_STATE = {
    hasUserWon: undefined,
    returnedAmount: 0,
    positions: {
        playerPositionId:null,
        computerPositionId:null
    }
}
export const BET_STATUSES = Object.freeze({
    STARTING: "STARTING",
    IN_PROGRESS: "IN_PROGRESS",
    FINISHED: "FINISHED",
});
export const ROCK_ID = 1;
export const PAPER_ID = 2;
export const SCISSORS_ID = 3;
export const POSITIONS_BET:PositionBet[] = [
    {
        betPositionId: 1,
        betPositionName: 'ROCK'
    },
    {
        betPositionId: 2,
        betPositionName: 'PAPER'
    },
    {
        betPositionId: 3,
        betPositionName: 'SCISSORS'
    }
];
