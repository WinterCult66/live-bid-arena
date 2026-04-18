import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { auctionStateReceived, auctionWsConnected, auctionWsError } from '../../store/auction/auction.actions';
import { AuctionUiStatus, RoomPhase } from '../../store/auction/auction.state';
import { AppState } from '../../store/app.state';

/**
 * Puente WebSocket → NgRx: el servidor controla fases LOBBY/LIVE, timers y pujas.
 * Cada cliente recibe solo sus campos yourSpent / yourRemaining (no el saldo de los demás).
 */
@Injectable({ providedIn: 'root' })
export class ArenaBridgeService {
  private readonly store = inject(Store<AppState>);
  private socket: WebSocket | null = null;

  connect(auctionId: number, playerId: number): void {
    this.closeSocket();

    const ws = new WebSocket(environment.wsUrl);
    this.socket = ws;

    ws.onopen = () => {
      this.store.dispatch(auctionWsConnected());
      ws.send(JSON.stringify({ type: 'JOIN', auctionId, playerId }));
    };

    ws.onmessage = (ev: MessageEvent) => {
      const data = JSON.parse(ev.data as string) as Record<string, unknown>;
      if (data['type'] === 'ERROR') {
        this.store.dispatch(
          auctionWsError({
            message: String(data['message'] ?? 'Error'),
            fatal: false,
          })
        );
        return;
      }
      if (data['type'] === 'STATE') {
        const phase = parsePhase(data['phase']);
        const status = parseStatus(data['status']);
        this.store.dispatch(
          auctionStateReceived({
            auctionId: Number(data['auctionId']),
            name: String(data['name'] ?? ''),
            initialBid: Number(data['initialBid'] ?? 0),
            price: Number(data['price'] ?? 0),
            timeLeft: Number(data['timeLeft'] ?? 0),
            lobbyTimeLeft: Number(data['lobbyTimeLeft'] ?? 0),
            phase,
            status,
            lastBidder: String(data['lastBidder'] ?? '—'),
            participants: Array.isArray(data['participants'])
              ? (data['participants'] as string[])
              : [],
            yourSpent: parseOptionalNumber(data['yourSpent']),
            yourRemaining: parseOptionalNumber(data['yourRemaining']),
          })
        );
      }
    };

    ws.onerror = () => {
      this.store.dispatch(
        auctionWsError({ message: 'Error de conexión WebSocket', fatal: true })
      );
    };

    ws.onclose = () => {
      if (this.socket === ws) {
        this.socket = null;
      }
    };
  }

  sendBid(amount: number): void {
    const ws = this.socket;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return;
    }
    ws.send(JSON.stringify({ type: 'BID', amount }));
  }

  closeSocket(): void {
    const ws = this.socket;
    if (ws) {
      ws.close();
    }
    this.socket = null;
  }
}

function parseOptionalNumber(raw: unknown): number | null {
  if (raw === undefined || raw === null) {
    return null;
  }
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function parsePhase(raw: unknown): RoomPhase {
  const s = String(raw ?? '').toUpperCase();
  if (s === 'LIVE' || s === 'LOBBY' || s === 'FINISHED') {
    return s as RoomPhase;
  }
  return 'LOBBY';
}

function parseStatus(raw: unknown): AuctionUiStatus {
  const s = String(raw ?? '').toUpperCase();
  if (s === 'WAITING' || s === 'ACTIVE' || s === 'FINISHED') {
    return s as AuctionUiStatus;
  }
  return 'WAITING';
}
