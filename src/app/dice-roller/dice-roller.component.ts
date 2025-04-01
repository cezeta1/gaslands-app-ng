import { Component, computed, signal, viewChildren } from "@angular/core";
import { Button } from "primeng/button";
import { ButtonGroup } from "primeng/buttongroup";
import { DieComponent } from "./die/die.component";
import { Toolbar } from "primeng/toolbar";

@Component({
  selector: 'dice-roller',
  imports: [
    Button,
    ButtonGroup,
    Toolbar,
    DieComponent,
  ],
  templateUrl: './dice-roller.component.html',
})
export class DiceRollerComponent {

  protected diceAmount = 8;
  protected dieList = viewChildren(DieComponent);

  private areAllLocked = signal(false);

  protected addDie = () => this.diceAmount += 1;
  protected removeDie = () => this.diceAmount -= 1;
  protected rollDice = () => this.dieList().forEach(d => d.roll());
  protected forceLock = () => {
    this.dieList().forEach(d => d.toggleLock(!this.areAllLocked()));
    this.areAllLocked.set(!this.areAllLocked());
  }
}
