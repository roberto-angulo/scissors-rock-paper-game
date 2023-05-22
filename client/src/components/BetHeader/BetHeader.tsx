// @types
import { BetResultType } from "../../shared/types";

// @utils
import { getHeaderMessage } from "./BetHeader.utils";

export interface BetHeaderProps {
    betStatus:string,
    betResult:BetResultType[]
}

const BetHeader = ({ betStatus, betResult }:BetHeaderProps) => {
  return (
    <header data-testid="bet-header">
      {betResult.map(bet => getHeaderMessage(betStatus, bet))}
    </header>
  );
}

export default BetHeader;