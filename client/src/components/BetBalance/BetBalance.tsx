import css from './BetBalance.module.scss';

interface BetBalancePropsType {
    balance: number,
    bet: number,
    win: number
}

const BetBalance = ({ balance, bet, win }:BetBalancePropsType) => {
  return (
    <div className={css.BetBalanceWrapper} data-testid="betBalance">
        <div className={css.BetBalance}>
            <div data-testid="balanceValue">
                <span>BALANCE: </span>
                <span className={css.BetBalanceValue}>{balance}</span>
            </div>
            <div data-testid="betValue">
                <span>BET: </span>
                <span className={css.BetBalanceValue}>{bet}</span>
            </div>
            <div data-testid="winValue">
                <span>WIN: </span>
                <span className={css.BetBalanceValue}>{win}</span>
            </div>
        </div>
    </div>
  )
}

export default BetBalance;