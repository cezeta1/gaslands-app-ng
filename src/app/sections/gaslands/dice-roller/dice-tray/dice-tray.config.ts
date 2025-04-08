import { DieTypesEnum } from "../die/die-config"

export interface DiceTrayConfig {
  name?: string,
  type?: DieTypesEnum,
  color?: string,
  collapsed?: boolean

  diceAmount: number
}
