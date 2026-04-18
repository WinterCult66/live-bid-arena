import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { ArenaBridgeService } from '../../core/websocket/arena-bridge.service';
import { connectArena, disconnectArena, placeBid } from './auction.actions';

/**
 * Efectos mínimos: conectar / desconectar / enviar puja por WebSocket.
 * El estado de la mesa lo puebla solo `auctionStateReceived` desde el bridge.
 */
export class AuctionEffects {
  private readonly actions$ = inject(Actions);
  private readonly bridge = inject(ArenaBridgeService);

  connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectArena),
        tap(({ auctionId, playerId }) => this.bridge.connect(auctionId, playerId))
      ),
    { dispatch: false }
  );

  disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(disconnectArena),
        tap(() => this.bridge.closeSocket())
      ),
    { dispatch: false }
  );

  sendBid$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(placeBid),
        tap(({ amount }) => this.bridge.sendBid(amount))
      ),
    { dispatch: false }
  );
}
