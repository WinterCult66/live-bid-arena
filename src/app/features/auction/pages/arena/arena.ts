import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, interval } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { BidConsoleComponent } from '../../components/bid-console/bid-console';
import { AuctionTableComponent } from '../../components/auction-table/auction-table';

import { placeBid, updateTimer } from '../../../../store/auction.actions';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [AsyncPipe, BidConsoleComponent, AuctionTableComponent],
  templateUrl: './arena.html',
  styleUrl: './arena.css',
})
export class ArenaComponent implements OnInit {

  currentPrice$!: Observable<number>;
  timeLeft$!: Observable<number>;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.currentPrice$ = this.store.select(state => state.auction.currentPrice);
    this.timeLeft$ = this.store.select(state => state.auction.timeLeft);

    // Simulación tiempo real
    interval(1000).subscribe(() => {
      this.store.dispatch(updateTimer());
    });
  }

  bid(amount: number) {
    this.store.dispatch(placeBid({ amount }));
  }
}