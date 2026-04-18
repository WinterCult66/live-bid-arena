import { createReducer, on } from '@ngrx/store';

import {
  auctionStateReceived,
  auctionWsConnected,
  auctionWsError,
  connectArena,
  disconnectArena,
} from './auction.actions';
import { AuctionState, initialAuctionState } from './auction.state';

export const auctionReducer = createReducer(
  initialAuctionState,

  on(connectArena, (state, { auctionId }): AuctionState => ({
    ...initialAuctionState,
    auctionId,
    connection: 'connecting',
  })),

  on(auctionWsConnected, (state): AuctionState => ({
    ...state,
    connection: 'open',
    wsError: null,
  })),

  on(auctionStateReceived, (state, payload): AuctionState => ({
    ...state,
    auctionId: payload.auctionId,
    name: payload.name,
    initialBid: payload.initialBid,
    price: payload.price,
    timeLeft: payload.timeLeft,
    lobbyTimeLeft: payload.lobbyTimeLeft,
    phase: payload.phase,
    status: payload.status,
    lastBidder: payload.lastBidder,
    participants: payload.participants,
    yourSpent: payload.yourSpent,
    yourRemaining: payload.yourRemaining,
    wsError: null,
  })),

  on(auctionWsError, (state, { message, fatal = true }): AuctionState => ({
    ...state,
    connection: fatal ? 'error' : state.connection,
    wsError: message,
  })),

  on(disconnectArena, (): AuctionState => ({ ...initialAuctionState }))
);
