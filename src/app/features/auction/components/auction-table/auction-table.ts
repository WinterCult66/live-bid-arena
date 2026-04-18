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
}
