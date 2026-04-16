import { createReducer, on } from '@ngrx/store';
import { placeBid, updateTimer } from './auction.actions';

export interface AuctionState {
  currentPrice: number;
  highestBidder: string;
  timeLeft: number;
}

const initialState: AuctionState = {
  currentPrice: 100,
  highestBidder: 'User1',
  timeLeft: 60
};

export const auctionReducer = createReducer(
  initialState,

  on(placeBid, (state, { amount }) => ({
    ...state,
    currentPrice: state.currentPrice + amount,
    highestBidder: 'You'
  })),

  on(updateTimer, (state) => ({
    ...state,
    timeLeft: state.timeLeft - 1
  }))
);