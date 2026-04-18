import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bid-console',
  standalone: true,
  templateUrl: './bid-console.html',
  styleUrl: './bid-console.css',
})
export class BidConsoleComponent {
  @Input() isDisabled = false;
  @Input() status: 'ACTIVE' | 'FINISHED' = 'ACTIVE';
  /** Saldo disponible para pujar en esta mesa (restante). */
  @Input() remainingForBids = 999999;
  @Output() bid = new EventEmitter<number>();

  cannotBid(amount: number): boolean {
    return this.isDisabled || this.remainingForBids < amount;
  }
}
