import { EngineEquipment } from "../../types/engineEquipment";

// サンプルの EngineEquipment データ（旧: Ondouki）。画面表示はしない。
export const engineEquipments: EngineEquipment[] = [
  {
    id: "ee-001",
    name: "共鳴チューブ",
    baseAttack: 713,
    advancedStats: {
      atk: 28,
      critRate: 3,
      critDamage: 12,
    },
    effects: {
      critRate: 6, // +6%
      critDamage: 14, // +14%
      damage: 5, // +5% 与ダメージ
      atk: 15, // +15 攻撃力（固定値として扱う）
    },
    note: "バランス型。会心寄せの運用に向く。",
  },
  {
    id: "ee-002",
    name: "反響コア",
    baseAttack: 713,
    advancedStats: {
      atk: 22,
      critDamage: 18,
    },
    effects: {
      critRate: 0,
      critDamage: 20,
      damage: 8,
      atk: 20,
    },
    note: "会心ダメージ重視のアタッカー向け。",
  },
  {
    id: "ee-003",
    name: "鼓動アンプ",
    baseAttack: 713,
    advancedStats: {
      atk: 18,
      impact: 20,
      critRate: 2.5,
    },
    effects: {
      critRate: 4,
      critDamage: 8,
      damage: 12,
      atk: 10,
    },
    note: "衝撃寄りで与ダメを伸ばしやすい。",
  },
  {
    id: "ee-004",
    name: "旋律モジュール",
    baseAttack: 713,
    advancedStats: {
      abnormalControl: 18,
      abnormalMastery: 28,
      critRate: 3,
    },
    effects: {
      critRate: 3,
      critDamage: 6,
      damage: 6,
      atk: 5,
    },
    note: "サポート寄りの補助装備。異常系運用に合わせやすい。",
  },
  {
    id: "ee-ive",
    name: "心弦のノクターン",
    baseAttack: 713,
    advancedStats: {
      critRate: 24,
    },
    effects: {
      critDamage: 50,
      resistanceIgnore: 25,
    },
    note: "イヴリンのモチーフ音動機。",
  },
];

export default engineEquipments;
