import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/lobby/lobby').then((m) => m.LobbyComponent),
  },
  {
    path: 'mfe-puja',
    loadComponent: () =>
      loadRemoteModule('bidRemote', './Component').then((m) => m.App),
  },
  {
    path: 'auction/:auctionId',
    loadComponent: () =>
      import('./features/auction/pages/arena/arena').then((m) => m.ArenaComponent),
  },
];
