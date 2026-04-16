import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auction-clock',
  standalone: true,
  templateUrl: './auction-clock.html',
  styleUrl: './auction-clock.css'
})
export class AuctionClockComponent {
  @Input() timeLeft = 0;
  @Input() status: 'ACTIVE' | 'FINISHED' = 'ACTIVE';
}
