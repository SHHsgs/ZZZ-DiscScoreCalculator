import { Buff } from "@/types/buff";
import { Attribute, Character, Role } from "@/types/character";
import { DiscEffect } from "@/types/DiscEffect";
import { EngineEquipment } from "@/types/engineEquipment";
import { Calculator } from "./calculator";

export type SelectedItems = {
  selectedCharacter: Character;
  selectedCharacter2: Character;
  selectedCharacter3: Character;
  selectedEngineEquipment: EngineEquipment;
  selectedEngineEquipment2: EngineEquipment;
  selectedEngineEquipment3: EngineEquipment;
  selectedDiscFour1: DiscEffect;
  selectedDiscFour2: DiscEffect;
  selectedDiscFour3: DiscEffect;
  selectedDiscTwo1: DiscEffect;
  externalBuffs: Buff;
}

enum StatusType {
  HpValue = "HP固定値(112)",
  HpRate = "HP%(3%)",
  AtkValue = "攻撃力固定値(19)",
  AtkRate = "攻撃力%(3%)",
  DefValue = "防御力固定値(15)",
  DefRate = "防御力%(4.8%)",
  CritRate = "会心率(2.4%)",
  CritDmg = "会心ダメージ(4.8%)",
  PENValue = "貫通値(9)",
  AnoMastery = "異常マスタリー(9)",
}

type SubStatusAssign = {
  idx: number;
  maxStatusType: StatusType;
  buffRate: number;
}

export class DiscSubStatusOptimizer {
  private selectedItems: SelectedItems;
  private subStatusArray: SubStatusAssign[]; // 5番属性ダメ/貫通率の場合の分配(6番HP/攻撃力前提)
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
    for (let index = 0; index < idealCount; index++) {
      const atkHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.AtkRate).length;
      const critRateHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.CritRate).length;
      const critDamageHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.CritDmg).length;
      const hpHitCount = subStatusArray.filter((x) => x.maxStatusType == StatusType.HpRate).length;
  
      const atkBuffPercent5thElemtntalPEN = calculator.calculateAtkBuffPercent((AtkRate5th6th + 3 * atkHitCount), (AtkRate5th6th + 3 * (atkHitCount + 1)));
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
      if (atkBuffPercent5thElemtntalPEN >= critRateBuffPercent && atkBuffPercent5thElemtntalPEN >= critDamageBuffPercent && atkBuffPercent5thElemtntalPEN >= hpBuffPercent){
        subStatusArray.push({ idx: index, maxStatusType: StatusType.AtkRate, buffRate: atkBuffPercent5thElemtntalPEN });
      } else if (critRateBuffPercent >= atkBuffPercent5thElemtntalPEN && critRateBuffPercent >= critDamageBuffPercent && critRateBuffPercent >= hpBuffPercent) {
        subStatusArray.push({ idx: index, maxStatusType: StatusType.CritRate, buffRate: critRateBuffPercent });
      } else if (critDamageBuffPercent >= atkBuffPercent5thElemtntalPEN && critDamageBuffPercent >= critRateBuffPercent && critDamageBuffPercent >= hpBuffPercent) {
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
    // const effectiveSubStatusArray5thAttackHP = this.subStatusArray.slice(0, effectiveSubStatusCount);
    // const character = this.selectedItems.selectedCharacter;
    // const engineEquipment = this.selectedItems.selectedEngineEquipment
    // // const atkRate = (engineEquipment.advancedStats.atk || 0)
    // const atkHitCount = effectiveSubStatusArray5thAttackHP.filter((x) => x.maxStatusType == StatusType.AtkRate).length;
    return effectiveSubStatusCount;
  }
}
