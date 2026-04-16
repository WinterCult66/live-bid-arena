import { createReducer, on } from '@ngrx/store';
import { finishAuction, placeBid, timerTick } from './auction.actions';
import { AuctionState } from './auction.state';

const initialState: AuctionState = {
  price: 100,
  lastBidder: 'Sin pujas',
  timeLeft: 30,
  status: 'ACTIVE'
};

export const auctionReducer = createReducer(
  initialState,

  on(placeBid, (state, { amount, bidder }) => {
    if (state.status !== 'ACTIVE') {
      return state;
    }

    return {
      ...state,
      price: state.price + amount,
      lastBidder: bidder,
      timeLeft: 10
    };
  }),

  on(timerTick, (state) => {
    if (state.status !== 'ACTIVE') {
      return state;
    }

    const nextTime = Math.max(0, state.timeLeft - 1);
    if (nextTime === 0) {
      return {
        ...state,
        timeLeft: 0,
        status: 'FINISHED'
      };
    }

    return {
      ...state,
      timeLeft: nextTime
    };
  }),

  on(finishAuction, (state) => ({
    ...state,
    status: 'FINISHED',
    timeLeft: 0
  }))
);