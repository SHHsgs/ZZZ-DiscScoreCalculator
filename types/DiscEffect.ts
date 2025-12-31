import { Role } from "./character";

export type TwoEffects = {
  critRate?: number;
  critDamage?: number;
  atkRateInStatus?: number;
  damageBonus?: number;
  hpPercent?: number;
  PENRate?: number;
}

export type FourEffects = {
  critRate?: number;
  critDamage?: number;
  atkRateInBattle?: number;
  damageBonus?: number;
  sheerForce?: number;
}

export type DiscEffect = {
  id: string;
  name: string;
  role: Role | null;
  description: string;
  fourEffects: FourEffects;
  twoEffects: TwoEffects;
}
