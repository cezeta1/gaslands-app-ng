import { Routes } from '@angular/router';
import { AppRoutesEnum } from '../../app.routes';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';

export enum GaslandsRoutesEnum {
  Main = ''
}

export const sectionRoutes: Routes = [
  
  { path: '', redirectTo: GaslandsRoutesEnum.Main, pathMatch: 'full' },

  // --- Content --- //
  
  { path: GaslandsRoutesEnum.Main, component: DiceRollerComponent },

  // --- Wildcard --- //
  
  { path: '**', redirectTo: AppRoutesEnum.NotFound }
]