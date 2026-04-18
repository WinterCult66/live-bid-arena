export type AuctionConnection = 'idle' | 'connecting' | 'open' | 'error';

export type RoomPhase = 'LOBBY' | 'LIVE' | 'FINISHED';

export type AuctionUiStatus = 'WAITING' | 'ACTIVE' | 'FINISHED';

export interface AuctionState {
  auctionId: number | null;
  name: string;
  initialBid: number;
  price: number;
  lastBidder: string;
  /** Tiempo de cierre de ronda (solo LIVE). */
  timeLeft: number;
  /** Cuenta regresiva de sala de espera (solo LOBBY). */
  lobbyTimeLeft: number;
  phase: RoomPhase;
  status: AuctionUiStatus;
  participants: string[];
  /** Solo tu jugador (viene en cada mensaje STATE personalizado por WebSocket). */
  yourSpent: number | null;
  yourRemaining: number | null;
  connection: AuctionConnection;
  wsError: string | null;
}

export const initialAuctionState: AuctionState = {
  auctionId: null,
  name: '',
  initialBid: 0,
  price: 0,
  lastBidder: '—',
  timeLeft: 0,
  lobbyTimeLeft: 0,
  phase: 'LOBBY',
  status: 'WAITING',
  participants: [],
  yourSpent: null,
  yourRemaining: null,
  connection: 'idle',
  wsError: null,
};
