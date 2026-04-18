import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuctionLot, Player } from '../../shared/models/catalog.models';

@Injectable({ providedIn: 'root' })
export class CatalogApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBaseUrl;

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.base}/api/players`);
  }

  getAuctionLots(): Observable<AuctionLot[]> {
    return this.http.get<AuctionLot[]>(`${this.base}/api/auctions`);
  }

  /** Reinicia mesas en memoria en el servidor (sin BD). */
  resetArenaState(): Observable<{ ok: string; message: string }> {
    return this.http.post<{ ok: string; message: string }>(`${this.base}/api/reset`, {});
  }
}
