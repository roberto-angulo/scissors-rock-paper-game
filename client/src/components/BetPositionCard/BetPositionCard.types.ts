import { BetPositionIdType } from "../../shared/types"

export interface BetPositionCardProps {
    betAmount:number,
    setBetAmount: (positionId:BetPositionIdType) => void,
    cardClass?:string|string[]
    positionId:BetPositionIdType,
    positionName:string
}