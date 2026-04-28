import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Subscription, take } from 'rxjs';

import { AuctionClockComponent } from '../../components/auction-clock/auction-clock';
import { MfeAuctionTableComponent } from '../../microfrontends/mfe-auction-table/mfe-auction-table';
import { MfeBidConsoleComponent } from '../../microfrontends/mfe-bid-console/mfe-bid-console';

import { connectArena, disconnectArena, placeBid } from '../../../../store/auction/auction.actions';
import { AuctionState } from '../../../../store/auction/auction.state';
import { loadLobby } from '../../../../store/lobby/lobby.actions';
import { AppState } from '../../../../store/app.state';
import { Player } from '../../../../shared/models/catalog.models';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [
    AsyncPipe,
    AuctionClockComponent,
    MfeAuctionTableComponent,
    MfeBidConsoleComponent,
  ],
  templateUrl: './arena.html',
  styleUrl: './arena.css',
})
export class ArenaComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store<AppState>);
  private readonly route = inject(ActivatedRoute);

  /** Panel técnico Flux: en false no se renderiza (podés poner en true al depurar). */
  readonly showFluxDebug = false;

  readonly auction$ = this.store.select((s) => s.auction);
  readonly currentPlayer$ = this.store.select((s) => s.lobby.currentPlayer);

  readonly bidToast = signal<{ bidder: string; amount: number } | null>(null);

  private routeSub?: Subscription;
  private priceSub?: Subscription;
  private bidToastTimeout?: ReturnType<typeof setTimeout>;
  private lastPrice = 0;

  ngOnInit(): void {
    this.route.queryParamMap.pipe(take(1)).subscribe((q) => {
      const raw = q.get('playerId');
      const playerId = raw != null && raw !== '' ? Number(raw) : 1;
      this.store.dispatch(loadLobby({ playerId: Number.isFinite(playerId) ? playerId : 1 }));
    });

    this.routeSub = combineLatest([
      this.route.paramMap.pipe(map((p) => Number(p.get('auctionId')))),
      this.route.queryParamMap.pipe(map((q) => {
        const raw = q.get('playerId');
        return raw != null && raw !== '' ? Number(raw) : 1;
      })),
    ])
      .pipe(
        filter(([auctionId, playerId]) =>
          Number.isFinite(auctionId) && auctionId > 0 && Number.isFinite(playerId) && playerId > 0
        )
      )
      .subscribe(([auctionId, playerId]) => {
        this.lastPrice = 0;
        this.store.dispatch(connectArena({ auctionId, playerId }));
      });

    this.priceSub = this.store.select((s) => s.auction).subscribe((a) => {
      if (a.phase === 'LIVE') {
        if (this.lastPrice > 0 && a.price > this.lastPrice) {
          this.flashBidToast(a.lastBidder, a.price - this.lastPrice);
        }
        this.lastPrice = a.price;
      } else {
        this.lastPrice = a.price;
      }
    });
  }

  seatLayout(
    a: AuctionState,
    me: Player | null
  ): { top: string | null; left: string | null; right: string | null } {
    if (!me?.name) {
      return { top: null, left: null, right: null };
    }
    const others = a.participants.filter((n) => n !== me.name);
    return {
      top: others[0] ?? null,
      left: others[1] ?? null,
      right: others[2] ?? null,
    };
  }

  /** Disponible = saldo catálogo − precio actual de la mesa (sube cualquiera y baja a todos). */
  remainingForBids(a: AuctionState, me: Player | null): number {
    if (!me) {
      return 0;
    }
    if (a.yourRemaining != null) {
      return a.yourRemaining;
    }
    return Math.max(0, me.balance - a.price);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.priceSub?.unsubscribe();
    this.store.dispatch(disconnectArena());
    if (this.bidToastTimeout) {
      clearTimeout(this.bidToastTimeout);
    }
  }

  bid(amount: number): void {
    this.store.dispatch(placeBid({ amount }));
  }

  private flashBidToast(bidder: string, amount: number): void {
    if (this.bidToastTimeout) {
      clearTimeout(this.bidToastTimeout);
    }
    this.bidToast.set({ bidder, amount });
    this.bidToastTimeout = setTimeout(() => {
      this.bidToast.set(null);
      this.bidToastTimeout = undefined;
    }, 3200);
  }
}
