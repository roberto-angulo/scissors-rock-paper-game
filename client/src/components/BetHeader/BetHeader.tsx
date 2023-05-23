// @types
import { BetResultType } from "../../shared/types";

// @utils
import { getHeaderMessage } from "./BetHeader.utils";

// @styles
import css from './BetHeader.module.scss';

export interface BetHeaderProps {
    betStatus:string,
    betResult:BetResultType[],
    errorMessage:string
}

const BetHeader = ({ betStatus, betResult, errorMessage }:BetHeaderProps) => {
  return (
    <header data-testid="bet-header">
      {errorMessage
        ? <p className={css.BetHeaderErrorMessage}>{errorMessage}</p>
        : betResult.map(bet => getHeaderMessage(betStatus, bet))
      }
    </header>
  );
}

export default BetHeader;