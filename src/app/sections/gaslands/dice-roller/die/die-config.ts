export enum DieTypesEnum {
  Numerical,
  Skid,
  Atk,
  Def
}

export interface DieConfig<T> {
  faceNum: number, 
  valueDistribution: T[],
  faceMap: { string : string }
}

// --- Skid Die --- //

export enum SkidDieFacesEnum {
  Shift = "Shift",
  Hazard = "Hazard",
  Slide = "Slide",
  Spin = "Spin"
}

// export const SkidDieConfig: DieConfig<SkidDieFacesEnum> = {
//   faceNum: 6, 
//   valueDistribution: [
//     SkidDieFacesEnum.Shift,
//     SkidDieFacesEnum.Shift,
//     SkidDieFacesEnum.Shift,
//     SkidDieFacesEnum.Hazard,
//     SkidDieFacesEnum.Spin,
//     SkidDieFacesEnum.Slide
//   ],

  // faceMap: { string : string }

  // faces: {
  //   [SkidDieFacesEnum.Shift]: `${this._skidDiceImgUrls()}shift.png`,
  //   [SkidDieFacesEnum.Hazard]: `${this._skidDiceImgUrls()}hazard.png`,
  //   [SkidDieFacesEnum.Slide]: `${this._skidDiceImgUrls()}slide.png`,
  //   [SkidDieFacesEnum.Spin]: `${this._skidDiceImgUrls()}spin.png`,
  // }
//};
