import { Buff } from "./buff";

// キャラクターデータの型定義
export type Character = {
  // 表示用の名前（日本語可）
  name: string;

  // 役割（ロール）
  // 役割（ロール）: 列挙型 `Role` を使用します
  role: Role;

  // 属性
  attribute: Attribute;
  
  // モチーフ: 参照先は `EngineEquipment` の `id`（文字列）
  // 例: "od-001"
  motif?: string;

  // 基礎ステータス（数値）。単位や表記は呼び出し側で解釈します。
  baseHp: number; // 基礎HP
  baseAtk: number; // 基礎攻撃力
  baseDef: number; // 基礎防御力
  baseImpact: number; // 基礎衝撃力
  baseAbnormalControl: number; // 基礎異常掌握
  baseAbnormalMastery: number; // 基礎異常マスタリー
  baseCritRate: number; // 基礎会心率（%で表すなら 5 -> 5%）
  baseCritDamage: number; // 基礎会心ダメージ（%で表すなら 50 -> 50%）
  buff: Buff; // 自己バフ（コアパッシブやコアスキルの効果をここに記載）
};

// 属性の列挙型
export enum Attribute {
  Physical = "物理",
  Fire = "炎",
  Ice = "氷",
  Electric = "電気",
  Ether = "エーテル",
}

// ロールの列挙型
export enum Role {
  Attack = "強攻",
  Rupture = "命破",
  Anomaly = "異常",
  Stun = "撃破",
  Support = "支援",
  Defense = "防護",
}

// 装備込みのステータスを表す型定義
export type CharacterStatus = {
  hp: number;
  atk: number;
  critRate: number;
  critDmg: number;
  sheerForce: number;
}
