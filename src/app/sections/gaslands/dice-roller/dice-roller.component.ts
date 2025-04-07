import { Component } from "@angular/core";
import { DiceTrayComponent } from "./dice-tray/dice-tray.component";

@Component({
  selector: 'dice-roller',
  imports: [ DiceTrayComponent ],
  templateUrl: './dice-roller.component.html',
})
export class DiceRollerComponent { }