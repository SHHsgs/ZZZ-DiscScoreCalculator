// バフの効果まとめ
export type Buff = {
  // 効果値。%表記を使う場合は数値でそのまま格納（例: 5 -> 5%）。
  critRate?: number; // 会心率増加
  critDamage?: number; // 会心ダメージ増加
  damageBonus?: number; // 与ダメージ倍率/加算（%なら 10 -> +10%）
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
