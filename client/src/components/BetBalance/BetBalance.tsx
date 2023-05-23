import css from './BetBalance.module.scss';

interface BetBalancePropsType {
    balance: number,
    bet: number,
    win: number
}

const BetBalance = ({ balance, bet, win }:BetBalancePropsType) => {
  return (
    <div className={css.BetBalanceWrapper}>
        <div className={css.BetBalance}>
            <div>
                <span>BALANCE: </span>
                <span className={css.BetBalanceValue}>{balance}</span>
            </div>
            <div>
                <span>BET: </span>
                <span className={css.BetBalanceValue}>{bet}</span>
            </div>
            <div>
                <span>WIN: </span>
                <span className={css.BetBalanceValue}>{win}</span>
            </div>
        </div>
    </div>
  )
}

export default BetBalance;