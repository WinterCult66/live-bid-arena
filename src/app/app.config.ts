import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AuctionEffects } from './store/auction/auction.effects';
import { auctionReducer } from './store/auction/auction.reducer';
import { LobbyEffects } from './store/lobby/lobby.effects';
import { lobbyReducer } from './store/lobby/lobby.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ lobby: lobbyReducer, auction: auctionReducer }),
    provideEffects([LobbyEffects, AuctionEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};