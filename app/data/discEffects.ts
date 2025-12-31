import { Role } from "@/types/character";
import { DiscEffect } from "@/types/DiscEffect";

export const discEffects: DiscEffect[] = [
  {
    id: "df-wood",
    name: "ウッドペッカー",
    role: Role.Attack,
    description: "『通常攻撃』、『回避反撃』または『強化特殊スキル』が敵に命中し、なおかつ会心が出た時、それぞれ装備者にバフ効果を1重与える。バフ効果1重につき、装備者の攻撃力+9%、継続時間6秒。バフ効果の継続時間はスキルごとに計算される。",
    fourEffects: {
      atkRateInBattle: 9*3,
    },
    twoEffects: {
      critRate: 8,
    },
  },
  {
    id: "df-sword",
    name: "折枝の刀歌",
    role: Role.Attack,
    description: "異常掌握が115Pt以上の時、装備者の会心ダメージ+30%。任意のメンバーが敵に[凍結]効果を付与した時、または[砕氷]効果を発動した時、装備者の会心率+12%。継続時間15秒。",
    fourEffects: {
      critDamage: 30,
      critRate: 12,
    },
    twoEffects: {
      critDamage: 16,
    },
  },
  {
    id: "df-puff",
    name: "パファー・エレクトロ",
    role: Role.Attack,
    description: "『終結スキル』の与ダメージ+20%。『終結スキル』発動時、装備者の攻撃力+15%、継続時間12秒。",
    fourEffects: {
      damageBonus: 20,
      atkRateInBattle: 15,
    },
    twoEffects: {
      PENRate: 8,
    },
  },
  {
    id: "df-hormon",
    name: "ホルモン・パンク",
    role: Role.Attack,
    description: "接敵状態かつ操作中のメンバーになった時、装備者の攻撃力+25%、継続時間10秒。20秒に1回のみ発動可能。",
    fourEffects: {
      atkRateInBattle: 25,
    },
    twoEffects: {
      atkRateInStatus: 10,
    },
  },
  {
    id: "df-shun",
    name: "純白の行歌",
    role: Role.Attack,
    description: "装備者が任意の『エーテルベール』効果を受けている時、自身の会心率+10%。『エーテルベール』終了後でも、この効果は15秒継続する。装備者が[強攻]メンバーの場合、『エーテルベール』を発動または『エーテルベール』の継続時間を延長した際、自身の会心率10%、攻撃力+10%、重複して発動すると継続時間が更新される。",
    fourEffects: {
      atkRateInBattle: 10,
      critRate: 20,
    },
    twoEffects: {
      damageBonus: 10,
    },
  },
  {
    id: "df-ungaku",
    name: "雲嶽は我に似たり",
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
    name: "大山を統べる者",
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
    name: "月光騎士の讃歌",
    role: Role.Support,
    description: "装備者が[支援]メンバーの場合、『強化特殊スキル』または『終結スキル』を発動すると、メンバー全員の与ダメージ+18%、継続時間25秒、重複して発動すると継続時間が更新される。同じパッシブ効果は重ね掛け不可。",
    fourEffects: {
      damageBonus: 18,
    },
    twoEffects: {
    },
  },
  {
    id: "df-swing",
    name: "スイング・ジャズ",
    role: null,
    description: "『連携スキル』または『終結スキル』発動時、チーム全体の与ダメージ+15%、継続時間12秒。同じパッシブ効果は重ね掛け不可。",
    fourEffects: {
      damageBonus: 15,
    },
    twoEffects: {
    },
  },
  {
    id: "df-astra",
    name: "静寂のアストラ(２層)",
    role: null,
    description: "任意のメンバーが『クイック支援』で出場した時、チーム全体が「天籟」を獲得する、最大3重まで重ね掛け可能、継続時間15秒、重複して発動すると継続時間が更新される。「天籟」1重につき、『クイック支援』で出場したメンバーの与ダメージ+8%、該当効果はチーム内でひとつしか有効にならない。",
    fourEffects: {
      damageBonus: 16,
    },
    twoEffects: {
    },
  },
];

export default discEffects;