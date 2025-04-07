import { CommonModule } from "@angular/common";
import { Component, inject, signal, viewChildren } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Button } from "primeng/button";
import { ButtonGroup } from "primeng/buttongroup";
import { ColorPicker } from 'primeng/colorpicker';
import { Divider } from "primeng/divider";
import { Panel } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Toolbar } from "primeng/toolbar";
import { TooltipModule } from 'primeng/tooltip';
import { AlertsService } from "../../../../core/services/alerts/alerts.service";
import { DieComponent } from "../die/die.component";

@Component({
  selector: 'dice-tray',
  imports: [
    CommonModule,
    FormsModule,
    Panel,
    Button,
    ButtonGroup,
    Toolbar,
    Divider,
    ColorPicker,
    SelectButtonModule,
    TooltipModule,
    DieComponent,
  ],
  templateUrl: './dice-tray.component.html'
})
export class DiceTrayComponent {
  
  private alertsService = inject(AlertsService);
  private dieList = viewChildren(DieComponent);
  
  protected diceColor = "#d4d4d4";
  
  protected diceTypeOptions = [
    { label: 'Skid', value: 'skid' },
    { label: 'd6', value: 'd6' }
  ];
  protected selectedDiceType = "skid";

  protected diceAmount = 4;
  protected areAllLocked = signal(false);
  
  private readonly MAX_DICE_AMOUNT = 15;
  
  // --- Methods --- //

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
