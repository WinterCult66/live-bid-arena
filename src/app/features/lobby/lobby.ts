import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { CatalogApiService } from '../../core/api/catalog-api.service';
import { loadLobby } from '../../store/lobby/lobby.actions';
import { LobbyState } from '../../store/lobby/lobby.state';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './lobby.html',
  styleUrl: './lobby.css',
})
export class LobbyComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly route = inject(ActivatedRoute);
  private readonly catalogApi = inject(CatalogApiService);

  readonly lobby$: Observable<LobbyState> = this.store.select((s) => s.lobby);
  readonly resetting = signal(false);
  readonly resetMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.queryParamMap.pipe(take(1)).subscribe((q) => {
      const raw = q.get('playerId');
      const playerId = raw != null && raw !== '' ? Number(raw) : 1;
      this.store.dispatch(loadLobby({ playerId: Number.isFinite(playerId) ? playerId : 1 }));
    });
  }

  resetServerState(): void {
    this.resetting.set(true);
    this.resetMessage.set(null);
    this.catalogApi.resetArenaState().subscribe({
      next: (res) => {
        this.resetting.set(false);
        this.resetMessage.set(res.message);
        this.store
          .select((s) => s.lobby.currentPlayer)
          .pipe(take(1))
          .subscribe((p) => {
            if (p) {
              this.store.dispatch(loadLobby({ playerId: p.id }));
            }
          });
      },
      error: () => {
        this.resetting.set(false);
        this.resetMessage.set('No se pudo reiniciar el servidor.');
      },
    });
  }
}
