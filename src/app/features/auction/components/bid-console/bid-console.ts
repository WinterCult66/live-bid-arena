import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bid-console',
  standalone: true,
  template: `
    <div>
      <button (click)="bid.emit(10)">+10</button>
      <button (click)="bid.emit(50)">+50</button>
      <button (click)="bid.emit(100)">+100</button>
    </div>
  `
})
export class BidConsoleComponent {
  @Output() bid = new EventEmitter<number>();
}