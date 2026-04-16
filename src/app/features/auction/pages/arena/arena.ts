import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { BidConsoleComponent } from '../../components/bid-console/bid-console';
import { AuctionTableComponent } from '../../components/auction-table/auction-table';
import { AuctionClockComponent } from '../../components/auction-clock/auction-clock';

import { placeBid, timerTick } from '../../../../store/auction.actions';
import { AuctionState } from '../../../../store/auction.state';

interface AppState {
  auction: AuctionState;
}

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [AsyncPipe, BidConsoleComponent, AuctionTableComponent, AuctionClockComponent],
  templateUrl: './arena.html',
  styleUrl: './arena.css',
})
export class ArenaComponent implements OnInit, OnDestroy {

  price$!: Observable<number>;
  timeLeft$!: Observable<number>;
  status$!: Observable<'ACTIVE' | 'FINISHED'>;
  lastBidder$!: Observable<string>;

  private timerSubscription?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.price$ = this.store.select(state => state.auction.price);
    this.timeLeft$ = this.store.select(state => state.auction.timeLeft);
    this.status$ = this.store.select(state => state.auction.status);
    this.lastBidder$ = this.store.select(state => state.auction.lastBidder);

    this.timerSubscription = interval(1000).subscribe(() => {
      this.store.dispatch(timerTick());
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  bid(amount: number) {
    this.store.dispatch(placeBid({ amount, bidder: 'Tu' }));
  }
}