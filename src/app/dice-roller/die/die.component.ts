import { Component, computed, signal } from "@angular/core";
import { Image } from "primeng/image";
import { Card } from "primeng/card";
import { Chip } from 'primeng/chip';

export enum SkidDieFacesEnum {
  Shift = "Shift",
  Hazard = "Hazard",
  Slide = "Slide",
  Spin = "Spin"
}

@Component({
  selector: 'die',
  imports: [
    Image,
    Card,
    Chip
  ],
  templateUrl: './die.component.html',
  styleUrl: 'die.component.css',
})
export class DieComponent {

  private readonly _skidDiceImgUrls = signal("assets/images/skid-dice/");
  private readonly _dieConfig = {
    values: [
      SkidDieFacesEnum.Shift,
      SkidDieFacesEnum.Shift,
      SkidDieFacesEnum.Shift,
      SkidDieFacesEnum.Hazard,
      SkidDieFacesEnum.Spin,
      SkidDieFacesEnum.Slide
    ],

    faces: {
      [SkidDieFacesEnum.Shift]: `${this._skidDiceImgUrls()}shift.png`,
      [SkidDieFacesEnum.Hazard]: `${this._skidDiceImgUrls()}hazard.png`,
      [SkidDieFacesEnum.Slide]: `${this._skidDiceImgUrls()}slide.png`,
      [SkidDieFacesEnum.Spin]: `${this._skidDiceImgUrls()}spin.png`,
    }
  }

  protected isRolling = signal<boolean>(false);
  protected isLocked = signal<boolean>(false);

  protected currentValueEnum = computed(() => this._dieConfig.values[this.currentValue()]);
  protected currentFace = computed(() => this._dieConfig.faces[this.currentValueEnum()]);
   
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
}
