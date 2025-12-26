import { Role } from "@/types/character";
import { DiscEffect } from "@/types/DiscEffect";

export const discEffects: DiscEffect[] = [
  {
    id: "df-wood",
    name: "ウッドペッカー",
    role: Role.Attack,
    description: "『通常攻撃』、『回避反撃』または『強化特殊スキル』が敵に命中し、なおかつ会心が出た時、それぞれ装備者にバフ効果を1重与える。バフ効果1重につき、装備者の攻撃力+9%、継続時間6秒。バフ効果の継続時間はスキルごとに計算される。",
    fourEffects: {
      atk: 9*3,
    },
    twoEffects: {
      critRate: 8,
    },
  },
  {
    id: "df-shun",
    name: "純白の行歌",
    role: Role.Attack,
    description: "装備者が任意の『エーテルベール』効果を受けている時、自身の会心率+10%。『エーテルベール』終了後でも、この効果は15秒継続する。装備者が[強攻]メンバーの場合、『エーテルベール』を発動または『エーテルベール』の継続時間を延長した際、自身の会心率10%、攻撃力+10%、重複して発動すると継続時間が更新される。",
    fourEffects: {
      atk: 10,
      critRate: 20,
    },
    twoEffects: {
      damageBonus: 10,
    },
  },
  {
    id: "df-ungaku",
    name: "雲嶽",
    role: Role.Rupture,
    description: "『強化特殊スキル』、『連携スキル』、『終結スキル』を発動時、会心率+4%。この効果は最大3重まで重ね掛け可能、継続時間15秒。重複して発動すると継続時間が更新される。重数が3重に達している場合、与える透徹ダメージ+10%。",
    fourEffects: {
      critRate: 4*3,
      sheerForce: 10,
    },
    twoEffects: {
      hpPercent: 10,
    },
  },
  {
    id: "df-taizan",
    name: "大山",
    role: Role.Stun,
    description: "装備者が[撃破]メンバーの場合、『強化特殊スキル』または『連携スキル』発動時、メンバー全員の会心ダメージ+15%。装備者の会心率が50%以上の場合、会心ダメージがさらに+15%、継続時間15秒、重複して発動すると継続時間が更新される。同じパッシブ効果は重ね掛け不可。",
    fourEffects: {
      critDamage: 15*2,
    },
    twoEffects: {
    },
  },
  {
    id: "df-gekko",
    name: "月光",
    role: Role.Support,
    description: "装備者が[支援]メンバーの場合、『強化特殊スキル』または『終結スキル』を発動すると、メンバー全員の与ダメージ+18%、継続時間25秒、重複して発動すると継続時間が更新される。同じパッシブ効果は重ね掛け不可。",
    fourEffects: {
      damageBonus: 18,
    },
    twoEffects: {
    },
  },
];

export default discEffects;