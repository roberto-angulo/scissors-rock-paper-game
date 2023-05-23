// @packages
import { renderHook, act } from '@testing-library/react-hooks';

// @hooks
import { BET_STATUSES } from '../../shared/constants';
import useBalanceBet from './useBalanceBet';


describe('Test useBalanceBet', () => {
    test('Check that bet is subtract from balance, accordingly', () => {
        const betAmount = 1000;
        const { result } = renderHook(() => useBalanceBet({
            betAmount,
            betStatus: BET_STATUSES.STARTING,
            betResult: { userHasWon: false, userReturnedAmount: 0 }
        }));
        expect(result.current).toEqual(500);
    });
});