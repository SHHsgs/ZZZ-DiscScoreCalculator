import { Attribute, Character, Role } from "../../types/character";

// サンプルのキャラクターデータ（画面表示は行いない）
export const characters: Character[] = [
  {
    name: "風の勇者",
    role: Role.Attack,
    attribute: Attribute.Physical,
    motif: "ee-001",
    baseHp: 1024,
    baseAtk: 132,
    baseDef: 86,
    baseImpact: 12,
    baseAbnormalControl: 8,
    baseAbnormalMastery: 24,
    baseCritRate: 5, // 5%
    baseCritDamage: 50, // 50%
  },
  {
    name: "炎の戦士",
    role: Role.Rupture,
    attribute: Attribute.Fire,
    motif: "ee-002",
    baseHp: 1210,
    baseAtk: 156,
    baseDef: 98,
    baseImpact: 18,
    baseAbnormalControl: 6,
    baseAbnormalMastery: 30,
    baseCritRate: 7.5,
    baseCritDamage: 60,
  },
  {
    name: "水の賢者",
    role: Role.Support,
    attribute: Attribute.Ice,
    motif: "od-004",
    baseHp: 900,
    baseAtk: 110,
    baseDef: 72,
    baseImpact: 8,
    baseAbnormalControl: 20,
    baseAbnormalMastery: 40,
    baseCritRate: 4,
    baseCritDamage: 45,
  },
  {
    name: "イヴリン",
    role: Role.Attack,
    attribute: Attribute.Fire,
    motif: "ee-ive",
    baseHp: 7788,
    baseAtk: 854+75,
    baseDef: 612,
    baseImpact: 93,
    baseAbnormalControl: 92,
    baseAbnormalMastery: 90,
    baseCritRate: 5+14.4,
    baseCritDamage: 50,
  }
];

export default characters;
