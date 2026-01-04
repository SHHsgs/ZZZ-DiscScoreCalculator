import { Role, CharacterStatus } from "@/types/character";
import { Calculator } from "./calculator";
import { SelectedItems } from "@/types/selectedItems";

export enum StatusType {
  HpValue = "HP固定値(112)",
  HpRate = "HP%(3%)",
  AtkValue = "攻撃力固定値(19)",
  AtkRate = "攻撃力%(3%)",
  DefValue = "防御力固定値(15)",
  DefRate = "防御力%(4.8%)",
  CritRate = "会心率(2.4%)",
  CritDmg = "会心ダメージ(4.8%)",
  PENRate = "貫通率(メイン24%)",
  PENValue = "貫通値(9)",
  AnoMastery = "異常マスタリー(9)",
  DmgBonus = "属性ダメージボーナス(メイン30%)"
}

type SubStatusAssign = {
  idx: number;
  maxStatusType: StatusType;
  buffRate: number;
}

export class DiscSubStatusOptimizer {
  private selectedItems: SelectedItems;
  public subStatusArray: SubStatusAssign[]; // 5番属性ダメ/貫通率の場合の分配(6番HP/攻撃力前提)
  private atkHitCount;
  private critRateHitCount;
  private critDamageHitCount;
  private hpHitCount;

  constructor(selectedItems: SelectedItems) {
    this.selectedItems = selectedItems;
    const calculator = new Calculator(selectedItems);
    const subStatusArray: SubStatusAssign[] = [];
    const AtkRate5th6th = (this.selectedItems.selectedCharacter.role == Role.Rupture) ? 0 : 30;

    const idealCount = 78; // サブステヒット数: 有効3つ、+5、4,5,6で+10で78が理論値
    // FIXME: 4,5番メインステ後から計算したほうがよい。6番は先でいい
    (() => {
      // 4番メインステ
      // FIXME: 冗長
      const atkHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.AtkRate).length;
      const critRateHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.CritRate).length;
      const critDamageHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.CritDmg).length;
      const hpHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.HpRate).length;

      const atkBuffPercent = calculator.calculateAtkBuffPercent((AtkRate5th6th + 3 * atkHitCount), (AtkRate5th6th + 3 * (atkHitCount + 10)));
      const critRateBuffPercent = calculator.calculateCritRateBuffPercent(2.4 * critRateHitCount, 2.4 * (critRateHitCount + 10));
      const critDamageBuffPercent = calculator.calculateCritDamageBuffPercent(4.8 * critDamageHitCount, 4.8 * (critDamageHitCount + 10));
      const hpBuffPercent = (() => {
        if (this.selectedItems.selectedCharacter.role == Role.Rupture) {
          return calculator.calculateHPBuffPercent(3 * hpHitCount, 3 * (hpHitCount + 10));
        } else {
          return 0;
        }
      })();

      // 伸び率が良いものを配列にpush
      if (atkBuffPercent >= critRateBuffPercent && atkBuffPercent >= critDamageBuffPercent && atkBuffPercent >= hpBuffPercent) {
        for (let index = 0; index < 10; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.AtkRate, buffRate: atkBuffPercent });
        }
      } else if (critRateBuffPercent >= atkBuffPercent && critRateBuffPercent >= critDamageBuffPercent && critRateBuffPercent >= hpBuffPercent) {
        for (let index = 0; index < 10; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.CritRate, buffRate: critRateBuffPercent });
        }
      } else if (critDamageBuffPercent >= atkBuffPercent && critDamageBuffPercent >= critRateBuffPercent && critDamageBuffPercent >= hpBuffPercent) {
        for (let index = 0; index < 10; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.CritDmg, buffRate: critDamageBuffPercent });
        }
      } else {
        for (let index = 0; index < 10; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.HpRate, buffRate: hpBuffPercent });
        }
      }
    })();

    (() => {
      // 5番メインステ
      // FIXME: 冗長
      const atkHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.AtkRate).length;
      const hpHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.HpRate).length;

      const atkBuffPercent = calculator.calculateAtkBuffPercent((AtkRate5th6th + 3 * atkHitCount), (AtkRate5th6th + 3 * (atkHitCount + 10)));
      const hpBuffPercent = (() => {
        if (this.selectedItems.selectedCharacter.role == Role.Rupture) {
          return calculator.calculateHPBuffPercent(3 * hpHitCount, 3 * (hpHitCount + 10));
        } else {
          return 0;
        }
      })();
      const PENBuffPercent = calculator.calculatePENRatioBuffPercent(0, 24);
      const dmgBonusBuffPercent = calculator.calculateDmgBonusBuffPercent(0, 30);

      // 伸び率が良いものを配列にpush
      if (atkBuffPercent >= PENBuffPercent && atkBuffPercent >= dmgBonusBuffPercent && atkBuffPercent >= hpBuffPercent) {
        for (let index = 10; index < 20; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.AtkRate, buffRate: atkBuffPercent });
        }
      } else if (PENBuffPercent >= atkBuffPercent && PENBuffPercent >= dmgBonusBuffPercent && PENBuffPercent >= hpBuffPercent) {
        for (let index = 10; index < 20; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.PENRate, buffRate: PENBuffPercent });
        }
      } else if (dmgBonusBuffPercent >= atkBuffPercent && dmgBonusBuffPercent >= PENBuffPercent && dmgBonusBuffPercent >= hpBuffPercent) {
        for (let index = 10; index < 20; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.DmgBonus, buffRate: dmgBonusBuffPercent });
        }
      } else {
        for (let index = 10; index < 20; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.HpRate, buffRate: hpBuffPercent });
        }
      }
    })();

    (() => {
      // 6番メインステ
      // FIXME: 冗長
      const atkHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.AtkRate).length;
      const hpHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.HpRate).length;

      const atkBuffPercent = calculator.calculateAtkBuffPercent((AtkRate5th6th + 3 * atkHitCount), (AtkRate5th6th + 3 * (atkHitCount + 10)));
      const hpBuffPercent = (() => {
        if (this.selectedItems.selectedCharacter.role == Role.Rupture) {
          return calculator.calculateHPBuffPercent(3 * hpHitCount, 3 * (hpHitCount + 10));
        } else {
          return 0;
        }
      })();

      // 際の伸び率が良いものを配列にpush
      if (atkBuffPercent >= hpBuffPercent) {
        for (let index = 20; index < 30; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.AtkRate, buffRate: atkBuffPercent });
        }
      } else {
        for (let index = 20; index < 30; index++) {
          subStatusArray.push({ idx: index, maxStatusType: StatusType.HpRate, buffRate: hpBuffPercent });
        }
      }
    })();
    for (let index = 30; index < idealCount; index++) {
      const atkHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.AtkRate).length;
      const critRateHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.CritRate).length;
      const critDamageHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.CritDmg).length;
      const hpHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.HpRate).length;

      const atkBuffPercent = calculator.calculateAtkBuffPercent((AtkRate5th6th + 3 * atkHitCount), (AtkRate5th6th + 3 * (atkHitCount + 1)));
      const critRateBuffPercent = calculator.calculateCritRateBuffPercent(2.4 * critRateHitCount, 2.4 * (critRateHitCount + 1));
      const critDamageBuffPercent = calculator.calculateCritDamageBuffPercent(4.8 * critDamageHitCount, 4.8 * (critDamageHitCount + 1));
      const hpBuffPercent = (() => {
        if (this.selectedItems.selectedCharacter.role == Role.Rupture) {
          return calculator.calculateHPBuffPercent(3 * hpHitCount, 3 * (hpHitCount + 1));
        } else {
          return 0;
        }
      })();

      // サブステを一つ伸ばした際の伸び率が良いものを配列にpush
      if (atkBuffPercent >= critRateBuffPercent && atkBuffPercent >= critDamageBuffPercent && atkBuffPercent >= hpBuffPercent) {
        subStatusArray.push({ idx: index, maxStatusType: StatusType.AtkRate, buffRate: atkBuffPercent });
      } else if (critRateBuffPercent >= atkBuffPercent && critRateBuffPercent >= critDamageBuffPercent && critRateBuffPercent >= hpBuffPercent) {
        subStatusArray.push({ idx: index, maxStatusType: StatusType.CritRate, buffRate: critRateBuffPercent });
      } else if (critDamageBuffPercent >= atkBuffPercent && critDamageBuffPercent >= critRateBuffPercent && critDamageBuffPercent >= hpBuffPercent) {
        subStatusArray.push({ idx: index, maxStatusType: StatusType.CritDmg, buffRate: critDamageBuffPercent });
      } else {
        subStatusArray.push({ idx: index, maxStatusType: StatusType.HpRate, buffRate: hpBuffPercent });
      }
    }
    this.subStatusArray = subStatusArray;
    this.atkHitCount = this.subStatusArray.filter((x) => x.maxStatusType == StatusType.AtkRate).length;
    this.critRateHitCount = this.subStatusArray.filter((x) => x.maxStatusType == StatusType.CritRate).length;
    this.critDamageHitCount = this.subStatusArray.filter((x) => x.maxStatusType == StatusType.CritDmg).length;
    this.hpHitCount = this.subStatusArray.filter((x) => x.maxStatusType == StatusType.HpRate).length;
  }

  getStatusWithoutBattle(effectiveSubStatusCount: number) {
    const effectiveSubStatusArray = this.subStatusArray.slice(0, effectiveSubStatusCount);
    const character = this.selectedItems.selectedCharacter;
    const engineEquipment = this.selectedItems.selectedEngineEquipment;
    const discEffect4 = this.selectedItems.selectedDiscFour1;
    const discEffect2 = this.selectedItems.selectedDiscFour1;
    const atkHitCount = effectiveSubStatusArray.filter((x) => x.maxStatusType == StatusType.AtkRate).length;
    const critRateHitCount = effectiveSubStatusArray.filter((x) => x.maxStatusType == StatusType.CritRate).length;
    const critDamageHitCount = effectiveSubStatusArray.filter((x) => x.maxStatusType == StatusType.CritDmg).length;
    const hpHitCount = effectiveSubStatusArray.filter((x) => x.maxStatusType == StatusType.HpRate).length;

    const hpInStatus = (character.baseHp) * (1 + (3 * hpHitCount + (discEffect4.twoEffects.hpPercent || 0) + (discEffect2.twoEffects.hpPercent || 0)) / 100) + 2200;
    const atkInStatus = (character.baseAtk + engineEquipment.baseAttack) * (1 + ((engineEquipment.advancedStats.atk || 0) + 3 * atkHitCount + (discEffect4.twoEffects.atkRateInStatus || 0) + (discEffect2.twoEffects.atkRateInStatus || 0)) / 100) + 316;
    const characterStatus: CharacterStatus = {
      hp: hpInStatus,
      atk: atkInStatus,
      critRate: (character.baseCritRate + ((engineEquipment.advancedStats.critRate || 0) + 2.4 * critRateHitCount)  + (discEffect4.twoEffects.critRate || 0) + (discEffect2.twoEffects.critRate || 0)),
      critDmg: (character.baseCritDamage + ((engineEquipment.advancedStats.critDamage || 0) + 4.8 * critDamageHitCount)  + (discEffect4.twoEffects.critDamage || 0) + (discEffect2.twoEffects.critDamage || 0)),
      sheerForce: (character.role === Role.Rupture) ? (hpInStatus * 0.1 + atkInStatus * 0.3) : 0,
    }
    return characterStatus;
  }
}
