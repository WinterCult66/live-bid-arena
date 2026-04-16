import { createAction, props } from '@ngrx/store';

export const placeBid = createAction(
  '[Auction] Place Bid',
  props<{ amount: number }>()
);

export const updateTimer = createAction(
  '[Auction] Update Timer'
);