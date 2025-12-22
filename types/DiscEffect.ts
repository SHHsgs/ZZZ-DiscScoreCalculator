import { Role } from "./character";

export type TwoEffects = {
  critRate?: number;
  critDamage?: number;
  atk?: number;
  damageBonus?: number;
  hpPercent?: number;
}

export type FourEffects = {
  critRate?: number;
  critDamage?: number;
  atk?: number;
  damageBonus?: number;
  sheerForce?: number;
}

export type DiscEffect = {
  id: string;
  name: string;
  role: Role;
  description: string;
  fourEffects: FourEffects;
  twoEffects: TwoEffects;
}
