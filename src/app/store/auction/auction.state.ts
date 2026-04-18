export type AuctionConnection = 'idle' | 'connecting' | 'open' | 'error';

export type RoomPhase = 'LOBBY' | 'LIVE' | 'FINISHED';

export type AuctionUiStatus = 'WAITING' | 'ACTIVE' | 'FINISHED';

export interface AuctionState {
  auctionId: number | null;
  name: string;
  initialBid: number;
  price: number;
  /** Suma de todas las pujas incrementales en la mesa (= price - initialBid). No es lo que pagó un solo jugador. */
  tableIncrementTotal: number;
  lastBidder: string;
  /** Tiempo de cierre de ronda (solo LIVE). */
  timeLeft: number;
  /** Cuenta regresiva de sala de espera (solo LOBBY). */
  lobbyTimeLeft: number;
  phase: RoomPhase;
  status: AuctionUiStatus;
  participants: string[];
  /** Suma de incrementos que pujaste vos (solo referencia, no define el “disponible”). */
  yourSpent: number | null;
  /** min(saldo catálogo, precio mesa): referencia UI frente al precio. */
  yourCommittedTotal: number | null;
  /** Saldo catálogo − precio actual de mesa: baja cuando cualquier jugador sube el precio. */
  yourRemaining: number | null;
  connection: AuctionConnection;
  wsError: string | null;
}

export const initialAuctionState: AuctionState = {
  auctionId: null,
  name: '',
  initialBid: 0,
  price: 0,
  tableIncrementTotal: 0,
  lastBidder: '—',
  timeLeft: 0,
  lobbyTimeLeft: 0,
  phase: 'LOBBY',
  status: 'WAITING',
  participants: [],
  yourSpent: null,
  yourCommittedTotal: null,
  yourRemaining: null,
  connection: 'idle',
  wsError: null,
};
