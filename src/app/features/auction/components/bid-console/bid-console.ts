import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bid-console',
  standalone: true,
  templateUrl: './bid-console.html',
  styleUrl: './bid-console.css'
})
export class BidConsoleComponent {
  @Output() bid = new EventEmitter<number>();
}