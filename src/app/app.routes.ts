import { Routes } from '@angular/router';
import { PATHS } from './utils/paths';

export const routes: Routes = [
  {
    path: PATHS.home,
    loadComponent: () => import('./shared/pages/home-page/home-page'),
  },
  {
    path: PATHS.search,
    loadChildren: () => import('./search/search.routes'),
  },
  {
    path: '**',
    redirectTo: PATHS.home,
  },
];
