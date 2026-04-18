import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/lobby/lobby').then((m) => m.LobbyComponent),
  },
  {
    path: 'auction/:auctionId',
    loadComponent: () =>
      import('./features/auction/pages/arena/arena').then((m) => m.ArenaComponent),
  },
];
