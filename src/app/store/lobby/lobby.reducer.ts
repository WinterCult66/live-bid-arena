import { createReducer, on } from '@ngrx/store';

import { loadLobby, loadLobbyFailure, loadLobbySuccess } from './lobby.actions';
import { initialLobbyState } from './lobby.state';

export const lobbyReducer = createReducer(
  initialLobbyState,

  on(loadLobby, (state): typeof initialLobbyState => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadLobbySuccess, (state, { players, auctions, currentPlayer }): typeof initialLobbyState => ({
    ...state,
    loading: false,
    error: null,
    players,
    auctions,
    currentPlayer,
  })),

  on(loadLobbyFailure, (state, { message }): typeof initialLobbyState => ({
    ...state,
    loading: false,
    error: message,
  }))
);
