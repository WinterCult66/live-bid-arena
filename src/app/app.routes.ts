import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auction',
    loadComponent: () =>
      import('./features/auction/pages/arena/arena')
        .then(m => m.ArenaComponent)
  },
  {
    path: '',
    redirectTo: 'auction',
    pathMatch: 'full'
  }
];