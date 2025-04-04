import { Component, inject, signal, viewChildren } from "@angular/core";
import { Button } from "primeng/button";
import { ButtonGroup } from "primeng/buttongroup";
import { DieComponent } from "./die/die.component";
import { AlertsService } from "../../../core/services/alerts/alerts.service";

@Component({
  selector: 'dice-roller',
  imports: [
    Button,
    ButtonGroup,
    DieComponent,
  ],
  templateUrl: './dice-roller.component.html',
})
export class DiceRollerComponent { 

  private alertsService = inject(AlertsService);

  private readonly MAX_DICE_AMOUNT = 15;
  private areAllLocked = signal(false);

  protected dieList = viewChildren(DieComponent);
  
  protected diceAmount = 15;

  protected addDie = () =>  {
    if (this.diceAmount + 1 > this.MAX_DICE_AMOUNT) {
      this.alertsService.showInfo("Max dice amount reached");
      return;
    }

    this.diceAmount += 1;
  }

  protected removeDie = () => { 
    this.diceAmount -= 1; 

    if (this.diceAmount <= 0)
      this.diceAmount = 1;
  };
  
  protected rollDice = () => this.dieList().forEach(d => d.roll());
  
  protected forceLock = () => {
    this.dieList().forEach(d => d.toggleLock(!this.areAllLocked()));
    this.areAllLocked.set(!this.areAllLocked());
  }
}
