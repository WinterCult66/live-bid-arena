import { createAction, props } from '@ngrx/store';

export const placeBid = createAction(
  '[Auction] PLACE_BID',
  props<{ amount: number; bidder: string }>()
);

export const timerTick = createAction(
  '[Auction] TIMER_TICK'
);

export const finishAuction = createAction(
  '[Auction] FINISH_AUCTION'
);