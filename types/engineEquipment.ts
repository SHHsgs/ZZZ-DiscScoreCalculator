import { Attribute, Role } from "./character";

// EngineEquipment（旧: Ondouki）データの型定義
export type EngineEquipmentAdvancedStats = {
  hp?: number; // HP%
  atk?: number;
  def?: number;
  impact?: number; // 衝撃力
  abnormalControl?: number; // 異常掌握
  abnormalMastery?: number; // 異常マスタリー
  critRate?: number; // 会心率（%なら 5 -> 5%）
  critDamage?: number; // 会心ダメージ（%なら 50 -> 50%）
  energyRecharge?: number; // エネルギー回復（%）
};

export type EngineEquipmentEffects = {
  // 効果値。%表記を使う場合は数値でそのまま格納（例: 10 -> 10%）。
  critRate?: number; // 会心率増加
  critDamage?: number; // 会心ダメージ増加
  damageBonus?: number; // 与ダメージ倍率/加算（%なら 10 -> +10%）
  atk?: number; // 攻撃力増加（%）
  // 耐性無視（%）。例: 20 -> 相手の耐性を20%無視
  resistanceIgnore?: number;
  sheerForce?: number; // 透徹ダメージ（%）
  hpPercent?: number; // HP増加（%）
};

export type EngineEquipment = {
  id?: string; // 任意の識別子
  name: string; // 表示名
  attributes: Attribute[]; // バフの対応する属性。空配列の場合は全属性対応
  // 基礎ステータス（装備自体が持つ基本値）
  baseAttack: number;
  // 上級ステータス（追加/派生ステータスがあれば記載）
  advancedStats: EngineEquipmentAdvancedStats;
  // 適合特性
  role: Role;
  // 装備固有の効果
  effects: EngineEquipmentEffects;
  // 補足メモ（任意）
  note?: string;
};
