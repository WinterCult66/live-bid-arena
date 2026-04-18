import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { CatalogApiService } from '../../core/api/catalog-api.service';
import { loadLobby, loadLobbyFailure, loadLobbySuccess } from './lobby.actions';

export class LobbyEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(CatalogApiService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLobby),
      switchMap(({ playerId }) =>
        forkJoin({
          players: this.api.getPlayers(),
          auctions: this.api.getAuctionLots(),
        }).pipe(
          map(({ players, auctions }) => {
            const pid = Number.isFinite(playerId) && playerId > 0 ? playerId : 1;
            const currentPlayer = players.find((p) => p.id === pid) ?? players[0];
            return loadLobbySuccess({ players, auctions, currentPlayer });
          }),
          catchError(() => of(loadLobbyFailure({ message: 'No se pudo conectar al servidor.' })))
        )
      )
    )
  );
}
