import { Routes } from '@angular/router';
import { PATHS } from '../utils/paths';

const countryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./search'),
    children: [
      {
        path: PATHS.region,
        loadComponent: () => import('./pages/by-region-page/by-region-page'),
      },
      {
        path: PATHS.country,
        loadComponent: () => import('./pages/by-country-page/by-country-page'),
      },
      {
        path: PATHS.capital,
        loadComponent: () => import('./pages/by-capital-page/by-capital-page'),
      },
      {
        path: `${PATHS.code}/:code`,
        loadComponent: () => import('./pages/by-code/by-code'),
      },
      {
        path: '**',
        redirectTo: PATHS.region,
      },
    ],
  },
];

export default countryRoutes;
