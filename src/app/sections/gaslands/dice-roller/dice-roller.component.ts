import { Component } from "@angular/core";
import { DiceTrayComponent } from "./dice-tray/dice-tray.component";
import { Toolbar } from "primeng/toolbar";
import { Button } from "primeng/button";
import { CommonModule } from "@angular/common";
import { Tooltip } from "primeng/tooltip";
import { DiceTrayConfig } from "./dice-tray/dice-tray.config";

@Component({
  selector: 'dice-roller',
  imports: [ CommonModule, Toolbar, Button, Tooltip, DiceTrayComponent ],
  templateUrl: './dice-roller.component.html',
})
export class DiceRollerComponent {

  private defaultConfig: DiceTrayConfig =
  {
    name: "Dice Tray",
    diceAmount: 2
  };

  protected diceTrayConfigs: DiceTrayConfig[] = [ 
    {
      name: "Dice Tray 1",
      collapsed: false,
      diceAmount: 4
    },
    {
      name: "Dice Tray 2",
      diceAmount: 3
    },
    {
      name: "Dice Tray 3",
      diceAmount: 2
    }
  ];

  protected allCollapsed = false;

  // --- Methods --- //

  protected minimizeAll() {
    this.diceTrayConfigs = this.diceTrayConfigs
      .map(c => ({...c, collapsed: true }));
    this.allCollapsed = true;
  }
  
  protected maximizeAll() {
    this.diceTrayConfigs = this.diceTrayConfigs
    .map(c => ({...c, collapsed: false }));
    this.allCollapsed = false;
  }

  protected updateAllCollapsedStatus() {
    this.allCollapsed = this.diceTrayConfigs
      .every(c => c.collapsed);
  }

  protected onNewTray() {
    this.diceTrayConfigs = [
      {... this.defaultConfig },
      ...this.diceTrayConfigs
    ];
  }

  protected onDeleteTray = (i: number) => 
    this.diceTrayConfigs.splice(i,1);

  protected onCopyTray = (i: number) =>
    this.diceTrayConfigs.splice(i, 0, this.diceTrayConfigs[i]);

}