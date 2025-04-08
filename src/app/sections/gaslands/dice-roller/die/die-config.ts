export enum DieTypesEnum {
  Skid,
  D6,
}

export interface DieConfig<T> {
  // number of faces
  faceNum: number,
  
  // map between numeric faces (idx) and faceType faces
  valueDistribution: T[], 
  
  // map between face types and images
  faceMap: Record<string, string>
}

// --- Skid Die --- //

export enum SkidDieFacesEnum {
  Shift = "Shift",
  Hazard = "Hazard",
  Slide = "Slide",
  Spin = "Spin"
}

const SkidDieConfig: DieConfig<SkidDieFacesEnum> = {
  faceNum: 6,

  valueDistribution: [
    SkidDieFacesEnum.Shift,
    SkidDieFacesEnum.Shift,
    SkidDieFacesEnum.Shift,
    SkidDieFacesEnum.Hazard,
    SkidDieFacesEnum.Spin,
    SkidDieFacesEnum.Slide
  ],

  faceMap: {
    [SkidDieFacesEnum.Shift]: `assets/images/skid-die/shift.png`,
    [SkidDieFacesEnum.Hazard]: `assets/images/skid-die/hazard.png`,
    [SkidDieFacesEnum.Slide]: `assets/images/skid-die/slide.png`,
    [SkidDieFacesEnum.Spin]: `assets/images/skid-die/spin.png`,
  }
};

// --- D6 Die --- //

const D6DieConfig: DieConfig<number> = {
  faceNum: 6,

  valueDistribution: [ 0, 1, 2, 3, 4, 5 ],

  faceMap: {
    0: `assets/images/d6/dice-six-faces-one.png`,
    1: `assets/images/d6/dice-six-faces-two.png`,
    2: `assets/images/d6/dice-six-faces-three.png`,
    3: `assets/images/d6/dice-six-faces-four.png`,
    4: `assets/images/d6/dice-six-faces-five.png`,
    5: `assets/images/d6/dice-six-faces-six.png`,
  }
};

// --- Types export --- //

export const DieConfigCollection = {
  [DieTypesEnum.Skid]: SkidDieConfig,
  [DieTypesEnum.D6]: D6DieConfig
}
