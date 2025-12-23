import { Attribute, Role } from "@/types/character";
import { EngineEquipment } from "../../types/engineEquipment";

// EngineEquipment データ。画面表示はしない。
export const engineEquipments: EngineEquipment[] = [
  {
    id: "ee-ive",
    name: "心弦のノクターン",
    attributes: [Attribute.Fire],
    baseAttack: 713,
    advancedStats: {
      critRate: 24,
    },
    role: Role.Attack,
    effects: {
      critDamage: 50,
      resistanceIgnore: 25,
    },
    note: "イヴリンのモチーフ音動機。",
  },
  {
    id: "ee-yi",
    name: "青溟の鳥籠",
    attributes: [Attribute.Ether],
    baseAttack: 743,
    advancedStats: {
      hp: 30,
    },
    role: Role.Rupture,
    effects: {
      critRate: 20,
      damageBonus: 8*2,
      sheerForce: 20,
    },
    note: "儀玄のモチーフ音動機。",
  },
  {
    id: "ee-lu",
    name: "喧嘩腰のボンバルダム",
    attributes: [],
    baseAttack: 624,
    advancedStats: {
      energyRecharge: 50,
    },
    role: Role.Support,
    effects: {
      atk: 6,
    },
    note: "ルーシーのモチーフ音動機。",
  },
  {
    id: "ee-lucia",
    name: "炉で歌い上げられる夢",
    attributes: [],
    baseAttack: 713,
    advancedStats: {
      hp: 30,
    },
    role: Role.Support,
    effects: {
      damageBonus: 25,
      hpPercent: 15,
    },
    note: "リュシアのモチーフ音動機。",
  },
];

export default engineEquipments;
