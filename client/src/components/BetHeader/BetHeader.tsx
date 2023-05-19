// @types
import { BetResultType } from "../../shared/types";

// @utils
import { getHeaderMessage } from "./BetHeader.utils";

interface BetHeaderProps {
    betStatus:string,
    betResult:BetResultType
}

const BetHeader = ({ betStatus, betResult }:BetHeaderProps) => {
  return (
    <header>
      {getHeaderMessage(betStatus, betResult)}
    </header>
  );
}

export default BetHeader;