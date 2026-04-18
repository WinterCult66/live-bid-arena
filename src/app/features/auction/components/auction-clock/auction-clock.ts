import { Component, Input } from '@angular/core';

import { AuctionUiStatus, RoomPhase } from '../../../../store/auction/auction.state';

@Component({
  selector: 'app-auction-clock',
  standalone: true,
  templateUrl: './auction-clock.html',
  styleUrl: './auction-clock.css',
})
export class AuctionClockComponent {
  @Input() phase: RoomPhase = 'LOBBY';
  @Input() lobbyTimeLeft = 0;
  @Input() bidTimeLeft = 0;
  @Input() status: AuctionUiStatus = 'WAITING';

  get showLobby(): boolean {
    return this.phase === 'LOBBY';
  }

  get showBid(): boolean {
    return this.phase === 'LIVE';
  }

  get isFinished(): boolean {
    return this.phase === 'FINISHED' || this.status === 'FINISHED';
  }

  get bidCritical(): boolean {
    return this.phase === 'LIVE' && this.bidTimeLeft <= 10 && this.bidTimeLeft > 0;
  }
}
