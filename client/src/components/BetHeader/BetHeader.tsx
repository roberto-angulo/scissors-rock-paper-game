// @packages
import { Fragment } from "react";

// @types
import { BetResultType, BetStatus } from "../../shared/types";

// @utils
import { getHeaderMessage, getInitMessage } from "./BetHeader.utils";

// @styles
import css from './BetHeader.module.scss';

export interface BetHeaderProps {
    betStatus:BetStatus,
    betResult:BetResultType[],
    errorMessage:string
}

const BetHeader = ({ betStatus, betResult, errorMessage }:BetHeaderProps) => {
  const headerMessage = betResult.length
                          ? betResult.map(bet => <Fragment
                                                    key={`${bet.positions.playerPositionId}_${bet.positions.computerPositionId}`}
                                                  >
                                                    {getHeaderMessage(betStatus, bet)}
                                                  </Fragment>)
                          : getInitMessage(betStatus);
  return (
    <header data-testid="bet-header">
      {errorMessage
        ? <p className={css.BetHeaderErrorMessage}>{errorMessage}</p>
        : headerMessage
      }
    </header>
  );
}

export default BetHeader;