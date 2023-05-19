import { BET_STATUSES } from "../../shared/constants";
import { BetStatus } from "../../shared/types";

interface BetHeaderProps {
    betStatus:boolean
}

const getHeaderMessage = (betStatus:BetStatus) => {
    if(betStatus === BET_STATUSES.STARTING) {
        return 'PICK YOUR POSITIONS';
    }

    if(betStatus === BET_STATUSES.IN_PROGRESS) {
        
    }
}

const BetHeader = ({ betStatus }:BetHeaderProps) => {
  return (
    <div>{betStatus}</div>
  );
}

export default BetHeader;