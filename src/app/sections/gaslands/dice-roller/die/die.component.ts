import { CommonModule } from "@angular/common";
import { Component, computed, ElementRef, inject, Injector, input, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Card } from "primeng/card";
import { Chip } from 'primeng/chip';
import { Image } from "primeng/image";
import { cz_takeUntilDestroyed } from "../../../../core/utils";
import { DieConfigCollection, DieTypesEnum } from "./die-config";

export enum SkidDieFacesEnum {
  Shift = "Shift",
  Hazard = "Hazard",
  Slide = "Slide",
  Spin = "Spin"
}

@Component({
  selector: 'die',
  imports: [
    CommonModule,
    Image,
    Card,
    Chip
  ],
  templateUrl: './die.component.html',
  styleUrl: 'die.component.css',
})
export class DieComponent {
  private _inj = inject(Injector);
  private _elementRef = inject(ElementRef);

  private _currentConfig = computed(() => DieConfigCollection[this.dieType()]);

  // private readonly _skidDiceImgUrls = signal("assets/images/skid-die/");
  // private readonly _dieConfig = {
  //   values: [
  //     SkidDieFacesEnum.Shift,
  //     SkidDieFacesEnum.Shift,
  //     SkidDieFacesEnum.Shift,
  //     SkidDieFacesEnum.Hazard,
  //     SkidDieFacesEnum.Spin,
  //     SkidDieFacesEnum.Slide
  //   ],

  //   faces: {
  //     [SkidDieFacesEnum.Shift]: `${this._skidDiceImgUrls()}shift.png`,
  //     [SkidDieFacesEnum.Hazard]: `${this._skidDiceImgUrls()}hazard.png`,
  //     [SkidDieFacesEnum.Slide]: `${this._skidDiceImgUrls()}slide.png`,
  //     [SkidDieFacesEnum.Spin]: `${this._skidDiceImgUrls()}spin.png`,
  //   }
  // }

  protected isRolling = signal<boolean>(false);
  protected isLocked = signal<boolean>(false);

  protected currentValueEnum = computed(() => this._currentConfig().valueDistribution[this.currentValue()]);
  protected currentFace = computed(() => this._currentConfig().faceMap[this.currentValueEnum()]);
  
  ngOnInit(): void {
    toObservable(this.dieColor, { injector: this._inj })
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe((c: string) => this._updateDieColor(c));
  }

  // --- Public --- //

  public dieColor = input<string>("neutral-300");
  public dieType = input<DieTypesEnum>(DieTypesEnum.Skid);
  
  public currentValue = signal<number>(0);
  
  public roll = () => {
    
    if (this.isLocked())
      return;

    this.isRolling.set(true);
    this.currentValue.set(Math.floor(Math.random() * 6));
    setTimeout(() => this.isRolling.set(false), 500);
  }

  public toggleLock = (value: boolean | null = null) => {
    this.isLocked.set(value ?? !this.isLocked());
  }

  // --- Private Methods --- //

  private _updateDieColor(newColor: string) {
    if (newColor == '')
      return;

    this._elementRef.nativeElement.style
      .setProperty('--die-comp-color', newColor);
  }
}
