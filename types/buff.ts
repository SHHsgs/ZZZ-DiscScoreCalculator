// バフの効果まとめ
export type Buff = {
  // 効果値。%表記を使う場合は数値でそのまま格納（例: 5 -> 5%）。
  critRate?: number; // 会心率増加
  critDamage?: number; // 会心ダメージ増加
  damageBonus?: number; // 与ダメージ倍率/加算（%なら 10 -> +10%）
  physicalDamageBonus?: number; // 物理属性ダメージボーナス
  fireDamageBonus?: number; // 炎属性ダメージボーナス
  iceDamageBonus?: number; // 氷属性ダメージボーナス
  electricDamageBonus?: number; // 電気属性ダメージボーナス
  etherDamageBonus?: number; // エーテル属性ダメージボーナス
  atkRate?: number; // 攻撃力増加（%）
  atkValue?: number; // 攻撃力増加（固定値）
  // 耐性無視（%）。例: 20 -> 相手の耐性を20%無視
  resistanceIgnore?: number;
  sheerForce?: number; // 透徹ダメージ（%）
  hpPercent?: number; // HP増加（%）
  hpPercentInBattle?: number; // 戦闘中HP増加（%）
  sheerForcePowerNum?: number; // 透徹力増加（固定値）
  registerDeffence?: number; // 防御無視（%）
  PENRatio?: number; // 貫通率（%）
};

export const BUFF_FIELDS: { key: keyof Buff; label: string }[] = [
  { key: "critRate", label: "会心率(%)" },
  { key: "critDamage", label: "会心ダメージ(%)" },
  { key: "damageBonus", label: "与ダメージ(%)" },
  { key: "atkRate", label: "戦闘中攻撃力(%)" },
  { key: "atkValue", label: "攻撃力固定値(実数値)" },
  { key: "resistanceIgnore", label: "属性耐性無視" },
  { key: "sheerForce", label: "透徹ダメージ(%)" },
  { key: "hpPercent", label: "戦闘前HP(%)" },
  { key: "hpPercentInBattle", label: "戦闘中HP(%)" },
  { key: "sheerForcePowerNum", label: "透徹力固定値(実数値)" },
  { key: "registerDeffence", label: "防御無視(%)" },
  { key: "PENRatio", label: "貫通率(%)" },
];
