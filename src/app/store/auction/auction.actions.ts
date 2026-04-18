import { createAction, props } from '@ngrx/store';

import { AuctionUiStatus, RoomPhase } from './auction.state';

export const connectArena = createAction(
  '[Auction] CONNECT',
  props<{ auctionId: number; playerId: number }>()
);

export const disconnectArena = createAction('[Auction] DISCONNECT');

export const auctionWsConnected = createAction('[Auction] WS_CONNECTED');

export const auctionWsDisconnected = createAction('[Auction] WS_DISCONNECTED');

export const auctionStateReceived = createAction(
  '[Auction] STATE_RECEIVED',
  props<{
    auctionId: number;
    name: string;
    initialBid: number;
    price: number;
    timeLeft: number;
    lobbyTimeLeft: number;
    phase: RoomPhase;
    status: AuctionUiStatus;
    lastBidder: string;
    participants: string[];
    yourSpent: number | null;
    yourRemaining: number | null;
  }>()
);

/** fatal: si false, solo mensaje (ej. puja rechazada) sin marcar la conexión en error. */
export const auctionWsError = createAction(
  '[Auction] WS_ERROR',
  props<{ message: string; fatal?: boolean }>()
);

/** Solo intención: el efecto envía el mensaje por WebSocket; el estado lo actualiza el servidor vía STATE. */
export const placeBid = createAction('[Auction] PLACE_BID', props<{ amount: number }>());
