import { Component, Input } from '@angular/core';

import { RoomPhase } from '../../../../store/auction/auction.state';

@Component({
  selector: 'app-auction-table',
  standalone: true,
  templateUrl: './auction-table.html',
  styleUrl: './auction-table.css',
})
export class AuctionTableComponent {
  @Input() price!: number;
  @Input() initialBid = 0;
  /** Suma de incrementos de todos en la mesa (= price - initialBid). */
  @Input() tableIncrementTotal = 0;
  /** Solo lo que pujó el jugador actual (incrementos propios). */
  @Input() yourSpent: number | null = null;
  @Input() phase: RoomPhase = 'LOBBY';
  @Input() lastBidder = '';
  @Input() seatTop: string | null = null;
  @Input() seatLeft: string | null = null;
  @Input() seatRight: string | null = null;
  @Input() youName = '';

  statusLabel(): string {
    if (this.phase === 'LOBBY') {
      return 'En sala de espera';
    }
    if (this.phase === 'LIVE') {
      return 'En vivo';
    }
    return 'Finalizada';
  }

  /** El mejor postor ve la subida acumulada del precio; cada uno paga solo sus incrementos. */
  get youAreWinningBidder(): boolean {
    const y = this.youName?.trim();
    const l = this.lastBidder?.trim();
    return !!y && !!l && l !== 'Sin pujas' && y === l;
  }
}
