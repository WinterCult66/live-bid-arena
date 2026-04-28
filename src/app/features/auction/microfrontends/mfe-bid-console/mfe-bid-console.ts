import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BidConsoleComponent } from '../../components/bid-console/bid-console';

@Component({
  selector: 'app-mfe-bid-console',
  standalone: true,
  imports: [BidConsoleComponent],
  templateUrl: './mfe-bid-console.html',
  styleUrl: './mfe-bid-console.css',
})
export class MfeBidConsoleComponent {
  @Input() isDisabled = false;
  @Input() status: 'ACTIVE' | 'FINISHED' = 'ACTIVE';
  @Input() remainingForBids = 0;

  @Output() bid = new EventEmitter<number>();
}
