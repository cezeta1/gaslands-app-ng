import { Routes } from '@angular/router';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';

export enum AppRoutesEnum {
  DiceRoller = 'dice-roller',
  Error = 'error',
  NotFound = '404',
}

export const routes: Routes = [
  // --- Home route --- //
  
  // { path: '', redirectTo: AppRoutesEnum.NotFound, pathMatch: 'full' },
  { path: '', redirectTo: AppRoutesEnum.DiceRoller, pathMatch: 'full' },
  
  // --- Sections --- //

  {
    path: AppRoutesEnum.DiceRoller,
    component: DiceRollerComponent,
    // loadChildren: () => import('./sections/payments/payments.routes').then(m => m.paymentsRoutes)
  },
  
  // --- Extra Routes --- //

  // {
  //   path: '',
  //   component: EmptyLayoutComponent,
  //   children: [
  //     { path: AppRoutesEnum.Error, component: ErrorPageComponent },
  //     { path: AppRoutesEnum.NotFound, component: PageNotFoundComponent }
  //   ]
  // },
  
  // --- Wildcard --- //
  
  { path: '**', redirectTo: AppRoutesEnum.NotFound },
];
