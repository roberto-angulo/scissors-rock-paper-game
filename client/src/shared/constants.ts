// @types
import { BetPositionIdType, PositionBet } from "./types";

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
