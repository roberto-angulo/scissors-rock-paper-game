export type BetPositionIdType = 1 | 2 | 3;
export type BetStatus = "STARTING" | "IN_PROGRESS" | "FINISHED";
export interface PositionBet {
    betPositionId:BetPositionIdType,
    betPositionName:string
}
export interface Bet {
    betPositionId:BetPositionIdType,
    betPositionName:string,
    betAmount:number
}