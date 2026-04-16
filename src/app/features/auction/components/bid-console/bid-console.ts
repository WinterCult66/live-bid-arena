import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bid-console',
  standalone: true,
  templateUrl: './bid-console.html',
  styleUrl: './bid-console.css'
})
export class BidConsoleComponent {
  @Input() isDisabled = false;
  @Input() status: 'ACTIVE' | 'FINISHED' = 'ACTIVE';
  @Output() bid = new EventEmitter<number>();
}