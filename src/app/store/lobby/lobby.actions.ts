import { createAction, props } from '@ngrx/store';

import { AuctionLot, Player } from '../../shared/models/catalog.models';

export const loadLobby = createAction('[Lobby] LOAD', props<{ playerId: number }>());

export const loadLobbySuccess = createAction(
  '[Lobby] LOAD_SUCCESS',
  props<{ players: Player[]; auctions: AuctionLot[]; currentPlayer: Player }>()
);

export const loadLobbyFailure = createAction('[Lobby] LOAD_FAILURE', props<{ message: string }>());
