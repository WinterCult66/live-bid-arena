import { Component, Input } from '@angular/core';

import { RoomPhase } from '../../../../store/auction/auction.state';
import { AuctionTableComponent } from '../../components/auction-table/auction-table';

@Component({
  selector: 'app-mfe-auction-table',
  standalone: true,
  imports: [AuctionTableComponent],
  templateUrl: './mfe-auction-table.html',
  styleUrl: './mfe-auction-table.css',
})
export class MfeAuctionTableComponent {
  @Input() price!: number;
  @Input() initialBid!: number;
  @Input() tableIncrementTotal!: number;
  @Input() phase: RoomPhase = 'LOBBY';
  @Input() lastBidder = '—';
  @Input() seatTop: string | null = null;
  @Input() seatLeft: string | null = null;
  @Input() seatRight: string | null = null;
  @Input() youName = 'Tu asiento';
}
