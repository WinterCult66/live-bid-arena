import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AuctionState } from './auction.state';
import { finishAuction, timerTick } from './auction.actions';

interface AppState {
  auction: AuctionState;
}

export class AuctionEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store<AppState>);

  finishWhenTimerReachesZero$ = createEffect(() =>
    this.actions$.pipe(
      ofType(timerTick),
      withLatestFrom(
        this.store.select((state) => state.auction.timeLeft),
        this.store.select((state) => state.auction.status)
      ),
      filter(([, timeLeft, status]) => status === 'ACTIVE' && timeLeft === 0),
      map(() => finishAuction())
    )
  );
}
