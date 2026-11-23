import { Routes } from '@angular/router';
import { EmptyLayoutComponent } from './core/layouts/empty-layout/empty-layout.component';
import { ErrorPageComponent } from './core/pages/error/error-page.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

export enum AppRoutesEnum {
  // * Sections * //
  Gaslands = 'gaslands',

  // * Extra * //
  Error = 'error',
  NotFound = 'not-found',
}

// =========================================================== //
//   Use only to redirect top-level *App Sections*, when the   //
//     routing requires full page layout change.               //
// =========================================================== //

export const routes: Routes = [
  // --- Sections --- //
  // Gaslands is served at the app root (gaslands.cezeta.net).
  // Its routes have no wildcard, so unmatched paths fall through to the routes below.

  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./sections/gaslands/gaslands.routes').then(m => m.sectionRoutes)
  },

  // --- Legacy URLs --- //

  { path: AppRoutesEnum.Gaslands, redirectTo: '', pathMatch: 'full' },

  // --- Extra Routes --- //

  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: AppRoutesEnum.Error, component: ErrorPageComponent },
      { path: AppRoutesEnum.NotFound, component: PageNotFoundComponent }
    ]
  },

  // --- Wildcard --- //

  { path: '**', redirectTo: AppRoutesEnum.NotFound },
];
