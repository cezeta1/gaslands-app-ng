import { Routes } from '@angular/router';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';

export enum GaslandsRoutesEnum {
  Main = ''
}

export const sectionRoutes: Routes = [

  // --- Content --- //

  { path: GaslandsRoutesEnum.Main, component: DiceRollerComponent, pathMatch: 'full' },

  // No wildcard here: this section is mounted at the app root, so unknown
  // paths must fall through to the app-level routes (not-found, error).
]
