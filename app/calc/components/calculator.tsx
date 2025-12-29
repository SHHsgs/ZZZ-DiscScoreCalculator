import { Buff } from "@/types/buff";
import { Attribute, Character, Role } from "@/types/character";
import { DiscEffect } from "@/types/DiscEffect";
import { EngineEquipment } from "@/types/engineEquipment";

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

export function calculatePENRatioBuffPercent(selectedItems: SelectedItems, baseDiffence: number, beforeBuffRate: number, afterBuffRate: number) {
      // 22 貫通率
    if (selectedItems.selectedCharacter.role === Role.Rupture) {
      return 0;
    }
    const PENRetio = (selectedItems.selectedCharacter.buff.PENRatio || 0) + (selectedItems.selectedEngineEquipment.advancedStats.PENRatio || 0) + (selectedItems.selectedEngineEquipment.effects.PENRatio || 0)
    + (selectedItems.selectedDiscFour1.twoEffects.PENRate || selectedItems.selectedDiscTwo1.twoEffects.PENRate || 0)
    + (selectedItems.selectedCharacter2.buff.PENRatio || 0)
    + (selectedItems.selectedCharacter3.buff.PENRatio || 0)
    const registerDeffence = selectedItems.selectedCharacter.buff.registerDeffence || 0 + (selectedItems.selectedCharacter2.buff.registerDeffence || 0) + (selectedItems.selectedCharacter3.buff.registerDeffence || 0)
    + (selectedItems.selectedEngineEquipment.effects.registerDeffence || 0) + (selectedItems.selectedEngineEquipment2.effects.registerDeffence || 0) + (selectedItems.selectedEngineEquipment3.effects.registerDeffence || 0)
    + (selectedItems.externalBuffs.registerDeffence || 0);
    const beforeDiffence = baseDiffence * (1 - registerDeffence / 100) * (1 - PENRetio + beforeBuffRate / 100);
    const afterDiffence = baseDiffence * (1 - registerDeffence / 100) * (1 - (PENRetio + afterBuffRate) / 100); // ここで貫通値は扱わない
    return (794 / (794 + afterDiffence)) / (794 / (794 + beforeDiffence)) * 100 - 100;
}

export function calculateDmgBonusBuffPercent(selectedItems: SelectedItems, beforeBuffRate: number, afterBuffRate: number) {
    // 28 属性ダメージ
    const beforeDmgBonus = 100 + (selectedItems.selectedCharacter.buff.damageBonus || 0) // 自己バフ
    + (() => {
      switch(selectedItems.selectedCharacter.attribute) {
        // 撃破のバフ、属性が対応していれば加算
        case Attribute.Physical: return selectedItems.selectedCharacter2.buff.physicalDamageBonus || 0
        case Attribute.Fire: return selectedItems.selectedCharacter2.buff.fireDamageBonus || 0
        case Attribute.Ice: return selectedItems.selectedCharacter2.buff.iceDamageBonus || 0
        case Attribute.Electric: return selectedItems.selectedCharacter2.buff.electricDamageBonus || 0
        case Attribute.Ether: return selectedItems.selectedCharacter2.buff.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (() => {
      switch(selectedItems.selectedCharacter.attribute) {
        // 支援のバフ、属性が対応していれば加算
        case Attribute.Physical: return selectedItems.selectedCharacter3.buff.physicalDamageBonus || 0
        case Attribute.Fire: return selectedItems.selectedCharacter3.buff.fireDamageBonus || 0
        case Attribute.Ice: return selectedItems.selectedCharacter3.buff.iceDamageBonus || 0
        case Attribute.Electric: return selectedItems.selectedCharacter3.buff.electricDamageBonus || 0
        case Attribute.Ether: return selectedItems.selectedCharacter3.buff.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (selectedItems.selectedDiscTwo1.twoEffects.damageBonus || 0) // 2セットディスク効果
    + (selectedItems.selectedDiscFour1.twoEffects.damageBonus || 0) // 4セットディスク2セット効果
    + (selectedItems.selectedDiscFour1.fourEffects.damageBonus || 0) // 4セットディスク4セット効果
    + (selectedItems.selectedDiscFour2.fourEffects.damageBonus || 0) // 撃破ディスク4セット効果
    + (selectedItems.selectedDiscFour3.fourEffects.damageBonus || 0) // 支援ディスク4セット効果
    + (selectedItems.selectedEngineEquipment.effects.damageBonus || 0) // アタッカーの音動機効果、属性が対応していれば加算
    + (() => {
      switch(selectedItems.selectedCharacter.attribute) {
        case Attribute.Physical: return selectedItems.selectedEngineEquipment.effects.physicalDamageBonus || 0
        case Attribute.Fire: return selectedItems.selectedEngineEquipment.effects.fireDamageBonus || 0
        case Attribute.Ice: return selectedItems.selectedEngineEquipment.effects.iceDamageBonus || 0
        case Attribute.Electric: return selectedItems.selectedEngineEquipment.effects.electricDamageBonus || 0
        case Attribute.Ether: return selectedItems.selectedEngineEquipment.effects.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (selectedItems.selectedEngineEquipment2.effects.damageBonus || 0) // 撃破の音動機効果、属性が対応していれば加算
    + (() => {
      switch(selectedItems.selectedCharacter.attribute) {
        case Attribute.Physical: return selectedItems.selectedEngineEquipment2.effects.physicalDamageBonus || 0
        case Attribute.Fire: return selectedItems.selectedEngineEquipment2.effects.fireDamageBonus || 0
        case Attribute.Ice: return selectedItems.selectedEngineEquipment2.effects.iceDamageBonus || 0
        case Attribute.Electric: return selectedItems.selectedEngineEquipment2.effects.electricDamageBonus || 0
        case Attribute.Ether: return selectedItems.selectedEngineEquipment2.effects.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (selectedItems.selectedEngineEquipment3.effects.damageBonus || 0) // 支援の音動機効果、属性が対応していれば加算
    + (() => {
      switch(selectedItems.selectedCharacter.attribute) {
        case Attribute.Physical: return selectedItems.selectedEngineEquipment3.effects.physicalDamageBonus || 0
        case Attribute.Fire: return selectedItems.selectedEngineEquipment3.effects.fireDamageBonus || 0
        case Attribute.Ice: return selectedItems.selectedEngineEquipment3.effects.iceDamageBonus || 0
        case Attribute.Electric: return selectedItems.selectedEngineEquipment3.effects.electricDamageBonus || 0
        case Attribute.Ether: return selectedItems.selectedEngineEquipment3.effects.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (selectedItems.externalBuffs.damageBonus || 0) // 外部バフ
    + beforeBuffRate
    ;
    const afterDmgBonus = beforeDmgBonus - beforeBuffRate + afterBuffRate;
    return (afterDmgBonus / beforeDmgBonus) * 100 - 100;
  }

//   function computeG5HP(is6th?: boolean) {
//     // is6thをBarChart側に実装
//     // 26 HP%
//     if (selectedCharacter?.role !== Role.Rupture) {
//       return 0;
//     }
//     const baseHp = selectedCharacter?.baseHp ?? 0;
//     const bonusHpNumMain = 2200;
//     const bosusHpRateMain = 30; // 5番メイン 固定 30%
//     const bonusAttackNumMain = 316;
//     const hpPercentInBattle = selectedCharacter.buff.hpPercentInBattle || 0 + (selectedCharacter2.buff.hpPercentInBattle || 0) + (selectedCharacter3.buff.hpPercentInBattle || 0);

//     const bonusHpRate = (selectedEngineEquipment?.advancedStats?.hp ?? 0) + ((selectedDiscFour1.id === "df-ungaku" || selectedDiscTwo1.id === "df-ungaku") ? 10 : 0);
//     const beforeHp = (baseHp * (1 + (bonusHpRate) / 100) + bonusHpNumMain) * (1 + hpPercentInBattle / 100);
//     const afterHp = (baseHp * (1 + (bosusHpRateMain + bonusHpRate) / 100) + bonusHpNumMain) * (1 + hpPercentInBattle / 100); // メイン30%追加

//     const atkPercentInStatus = (selectedDiscFour1.twoEffects.atk ?? 0) + (selectedDiscTwo1.twoEffects.atk ?? 0) + (selectedEngineEquipment.advancedStats.atk ?? 0)
//     + ((isFixed6th && !is6th) ? 30 : 0);
//     const atkPercentInBattle = selectedCharacter.buff.atkRate || 0 + (selectedCharacter2.buff.atkRate || 0) + (selectedCharacter3.buff.atkRate || 0)
//     + (selectedEngineEquipment.effects.atkRate || 0) + (selectedEngineEquipment2.effects.atkRate || 0) + (selectedEngineEquipment3.effects.atkRate || 0)
//     + (selectedDiscFour1.fourEffects.atk || 0) + (selectedDiscFour2.fourEffects.atk || 0) + (selectedDiscFour3.fourEffects.atk || 0);
//     const atk = (((selectedCharacter?.baseAtk ?? 0) + (selectedEngineEquipment?.baseAttack ?? 0)) * (1 + atkPercentInStatus / 100) + bonusAttackNumMain)
//     * (1 + atkPercentInBattle / 100)
//     + (selectedCharacter2?.buff?.atkValue || 0)
//     + (selectedCharacter3?.buff?.atkValue || 0);

//     const beforeSheerForce = beforeHp * 0.1 + atk * 0.3 + (selectedCharacter2?.buff?.sheerForcePowerNum || 0) + (selectedCharacter3?.buff?.sheerForcePowerNum || 0);
//     const afterSheerForce = afterHp * 0.1 + atk * 0.3 + (selectedCharacter2?.buff?.sheerForcePowerNum || 0) + (selectedCharacter3?.buff?.sheerForcePowerNum || 0);
//     return (afterSheerForce / beforeSheerForce) * 100 - 100;
//   }