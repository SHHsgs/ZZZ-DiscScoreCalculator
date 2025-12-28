import { Attribute, Role } from "@/types/character";
import { EngineEquipment } from "../../types/engineEquipment";

// EngineEquipment データ。画面表示はしない。
export const engineEquipments: EngineEquipment[] = [
  {
    id: "ee-shun",
    name: "孤光彩雲",
    attributes: [Attribute.Physical],
    baseAttack: 743,
    advancedStats: {
      critDamage: 48,
    },
    role: Role.Attack,
    effects: {
      resistanceIgnore: 20,
      damageBonus: 25,
      critDamage: 25,
    },
    note: "瞬光のモチーフ音動機。",
  },
  {
    id: "ee-neko",
    name: "鋼の肉球",
    attributes: [Attribute.Physical],
    baseAttack: 684,
    advancedStats: {
      critRate: 24,
    },
    role: Role.Attack,
    effects: {
      damageBonus: 20,
      critDamage: 25,
    },
    note: "猫又のモチーフ音動機。",
  },
  {
    id: "ee-neko2",
    name: "鋼の肉球（完凸）",
    attributes: [Attribute.Physical],
    baseAttack: 684,
    advancedStats: {
      critRate: 24,
    },
    role: Role.Attack,
    effects: {
      damageBonus: 40,
      critDamage: 50,
    },
    note: "猫又のモチーフ音動機。（完凸）",
  },
  {
    id: "ee-billy",
    name: "なんちゃってスターライトエンジン（完凸）",
    attributes: [Attribute.Physical],
    baseAttack: 624,
    advancedStats: {
      critRate: 25,
    },
    role: Role.Attack,
    effects: {
      damageBonus: 57.5,
    },
    note: "ビリーのモチーフ音動機。（完凸）",
  },
  {
    id: "ee-calin",
    name: "ハウスキーパー（完凸）",
    attributes: [Attribute.Physical],
    baseAttack: 624,
    advancedStats: {
      critRate: 25,
    },
    role: Role.Attack,
    effects: {
      damageBonus: 4.8*15,
    },
    note: "カリンのモチーフ音動機。（完凸）",
  },
  {
    id: "ee-soldier11",
    name: "ブリムストーン",
    attributes: [],
    baseAttack: 684,
    advancedStats: {
      atk: 30,
    },
    role: Role.Attack,
    effects: {
      atkRate: 3.5*3,
    },
    note: "11号のモチーフ音動機。",
  },
  {
    id: "ee-soldier112",
    name: "ブリムストーン（完凸）",
    attributes: [],
    baseAttack: 684,
    advancedStats: {
      atk: 30,
    },
    role: Role.Attack,
    effects: {
      atkRate: 7*3,
    },
    note: "11号のモチーフ音動機。（完凸）",
  },
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
    id: "ee-orpheus",
    name: "憤怒の銃騒",
    attributes: [Attribute.Fire],
    baseAttack: 713,
    advancedStats: {
      energyRecharge: 60,
    },
    role: Role.Attack,
    effects: {
      critRate: 20,
      registerDeffence: 15,
    },
    note: "オルペウスのモチーフ音動機。",
  },
  {
    id: "ee-bangaku",
    name: "金剛不壊怒髪衝冠",
    attributes: [Attribute.Fire],
    baseAttack: 713,
    advancedStats: {
      hp: 30,
    },
    role: Role.Rupture,
    effects: {
      critRate: 20,
      sheerForce: 9*2,
    },
    note: "盤岳のモチーフ音動機。",
  },
  {
    id: "ee-komano",
    name: "燔火の朧夜",
    attributes: [Attribute.Fire],
    baseAttack: 624,
    advancedStats: {
      hp: 25,
    },
    role: Role.Rupture,
    effects: {
      critRate: 24,
      damageBonus: 24,
    },
    note: "狛野のモチーフ音動機。",
  },
  {
    id: "ee-eren",
    name: "ディープシー・ビジター",
    attributes: [Attribute.Ice],
    baseAttack: 713,
    advancedStats: {
      critRate: 24,
    },
    role: Role.Attack,
    effects: {
      critRate: 10+10,
      damageBonus: 25,
    },
    note: "エレンのモチーフ音動機。",
  },
  {
    id: "ee-hugo",
    name: "千面の落日 ",
    attributes: [Attribute.Ice],
    baseAttack: 713,
    advancedStats: {
      critRate: 24,
    },
    role: Role.Attack,
    effects: {
      critDamage: 45,
      registerDeffence: 25,
    },
    note: "ヒューゴのモチーフ音動機。",
  },
  {
    id: "ee-yid",
    name: "セイレーンクレードル ",
    attributes: [Attribute.Ice],
    baseAttack: 713,
    advancedStats: {
      hp: 30,
    },
    role: Role.Rupture,
    effects: {
      sheerForce: 6*3,
      critRate: 20,
    },
    note: "イドリーのモチーフ音動機。",
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
      atk: 12, // 完凸3重を想定
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
  {
    id: "ee-zhao",
    name: "甘さ控えめ雪うさぎ",
    attributes: [],
    baseAttack: 713,
    advancedStats: {
      hp: 30,
    },
    role: Role.Defense,
    effects: {
      critDamage: 30,
      atk: 10
    },
    note: "リュシアのモチーフ音動機。",
  },
  {
    id: "ee-koleda",
    name: "燃獄ギア",
    attributes: [],
    baseAttack: 684,
    advancedStats: {
    },
    role: Role.Stun,
    effects: {
    },
    note: "クレタのモチーフ音動機。",
  },
  {
    id: "ee-fufu",
    name: "招福の虎炉",
    attributes: [],
    baseAttack: 713,
    advancedStats: {
    },
    role: Role.Stun,
    effects: {
      damageBonus: 10*2,
    },
    note: "クレタのモチーフ音動機。",
  },
  {
    id: "ee-dyarin",
    name: "昨夜からの着信",
    attributes: [],
    baseAttack: 713,
    advancedStats: {
    },
    role: Role.Stun,
    effects: {
      critDamage: 30,
    },
    note: "ダイアリンのモチーフ音動機。",
  },
];

export default engineEquipments;
