import { Attribute, Character, Role } from "../../types/character";

// サンプルのキャラクターデータ（画面表示は行わない）
export const characters: Character[] = [
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
    buff: {
      critRate: 25,
      critDamage: 30,
    },
  },
  {
    name: "儀玄",
    role: Role.Rupture,
    attribute: Attribute.Ether,
    motif: "ee-yi",
    baseHp: 7953+420,
    baseAtk: 872,
    baseDef: 441,
    baseImpact: 93,
    baseAbnormalControl: 92,
    baseAbnormalMastery: 90,
    baseCritRate: 5+14.4,
    baseCritDamage: 50,
    buff: {
      critDamage: 40, // 終結後のみを含むため要考慮
      damage: 60, // ブレイク中のみ強化特殊が+30%だが一旦除外
    },
  },
  {
    name: "アストラ",
    role: Role.Support,
    attribute: Attribute.Ether,
    motif: "ee-as",
    baseHp: 0,
    baseAtk: 3428,
    baseDef: 0,
    baseImpact: 0,
    baseAbnormalControl: 0,
    baseAbnormalMastery: 0,
    baseCritRate: 0,
    baseCritDamage: 0,
    buff: {
      atkValue: 1200,
      critDamage: 25,
      damage: 20,
    },
  },
  {
    name: "リュシア",
    role: Role.Support,
    attribute: Attribute.Ether,
    motif: "ee-ru",
    baseHp: 24000,
    baseAtk: 0,
    baseDef: 0,
    baseImpact: 0,
    baseAbnormalControl: 0,
    baseAbnormalMastery: 0,
    baseCritRate: 0,
    baseCritDamage: 0,
    buff: {
      sheerForcePowerNum: 900,
      critDamage: 30,
      damage: 20,
      // HPバフは最終HPに対して5%増加なのでディスクステの割合には影響しない
    },
  },
  {
    name: "福福",
    role: Role.Stun,
    attribute: Attribute.Fire,
    motif: "ee-fu",
    baseHp: 0,
    baseAtk: 3400,
    baseDef: 0,
    baseImpact: 0,
    baseAbnormalControl: 0,
    baseAbnormalMastery: 0,
    baseCritRate: 0,
    baseCritDamage: 0,
    buff: {
      critDamage: 30,
      damage: 20, // 連携のみだが、終結は40、その他は無いため平均して20とする
    },
  },
];

export default characters;
