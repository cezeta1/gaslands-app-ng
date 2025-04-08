import { CommonModule } from "@angular/common";
import { Component, inject, Injector, model, OnInit, signal, viewChildren } from "@angular/core";
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
import { DiceTrayConfig } from "./dice-tray.config";
import { toObservable } from "@angular/core/rxjs-interop";
import { cz_takeUntilDestroyed } from "../../../../core/utils";
import { DieTypesEnum } from "../die/die-config";
import { reduce } from "lodash-es";

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
export class DiceTrayComponent implements OnInit {

  // --- DI --- //

  private _inj = inject(Injector);
  private _alertsService = inject(AlertsService);
  private _dieList = viewChildren(DieComponent);
  
  private readonly MAX_DICE_AMOUNT = 15;
  
  // --- Inputs --- //

  public inputConfig = model<DiceTrayConfig>(this._defaultConfig(), { alias: 'config' });
  
  // --- Internal Variables --- //

  protected config = this._defaultConfig();

  protected diceTypeOptions = reduce(
    Object.keys(DieTypesEnum),
    (r, v) => isNaN(Number(v)) 
      ? [...r, { label: v, value: DieTypesEnum[v as keyof typeof DieTypesEnum] }]
      : r,
    [] as { label: string, value: DieTypesEnum }[]
  );

  protected selectedDiceType = DieTypesEnum.D6;
  protected areAllLocked = signal(false);
  
  // --- Ng Methods --- //

  ngOnInit(): void {
    toObservable(this.inputConfig, { injector: this._inj })
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe(_ => {
        this.config = {
          ...this._defaultConfig(),
          ...this.inputConfig() 
        };
      });
  }

  // --- Protected Methods --- //

  protected onCollapse(isCollapsed: any) {
    this.config = {
      ...this.config,
      collapsed: isCollapsed
    };
    this.inputConfig.set(this.config);
  }

  protected addDie = () =>  {
    if (this.config.diceAmount + 1 > this.MAX_DICE_AMOUNT) {
      this._alertsService.showInfo("Max dice amount reached");
      return;
    }
    this.config.diceAmount += 1;
  }

  protected removeDie = () => { 
    this.config.diceAmount -= 1; 

    if (this.config.diceAmount <= 0)
      this.config.diceAmount = 1;
  };
  
  protected rollDice = () => 
    this._dieList().forEach(d => d.roll()); 

  protected forceLock = () => {
    this._dieList().forEach(d => d.toggleLock(!this.areAllLocked()));
    this.areAllLocked.set(!this.areAllLocked());
  }

  // --- Private and Defaults --- //

  private _defaultConfig(): DiceTrayConfig {
    return ({
      name: "Dice Tray",
      type: DieTypesEnum.Skid,
      color: "#d4d4d4",
      collapsed: false,
      
      diceAmount: 4,
    });
  }
}
