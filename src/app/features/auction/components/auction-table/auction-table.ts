import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auction-table',
  standalone: true,
  templateUrl: './auction-table.html',
  styleUrl: './auction-table.css'
})
export class AuctionTableComponent {
  @Input() price!: number;
  @Input() time!: number;
}