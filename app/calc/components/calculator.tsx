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

export class Calculator {
  private selectedItems: SelectedItems;

  constructor(selectedItems: SelectedItems) {
      this.selectedItems = selectedItems;
  }

  calculateCritRateBuffPercent (beforeBuffRate: number, afterBuffRate: number) {
      // 会心率
      const baseCritRate = this.selectedItems.selectedCharacter.baseCritRate + (this.selectedItems.selectedCharacter.buff.critRate || 0) + (this.selectedItems.selectedEngineEquipment.advancedStats.critRate || 0) + (this.selectedItems.selectedEngineEquipment.effects.critRate || 0) + (this.selectedItems.selectedDiscTwo1.twoEffects.critRate || 0) + (this.selectedItems.selectedDiscFour1.twoEffects.critRate || 0) + (this.selectedItems.selectedDiscFour1.fourEffects.critRate || 0)
      + (this.selectedItems.selectedCharacter2.buff.critRate || 0) + (this.selectedItems.selectedCharacter2.buff.critRate || 0) + (this.selectedItems.selectedEngineEquipment2.effects.critRate || 0)
      + (this.selectedItems.selectedCharacter3.buff.critRate || 0) + (this.selectedItems.selectedCharacter3.buff.critRate || 0) + (this.selectedItems.selectedEngineEquipment3.effects.critRate || 0)
      const beforeCritRate = Math.min(baseCritRate + beforeBuffRate, 100);
      const afterCritRate = Math.min(baseCritRate + afterBuffRate, 100);
      const cridDmg = this.selectedItems.selectedCharacter.baseCritDamage + (this.selectedItems.selectedCharacter.buff.critDamage || 0) + (this.selectedItems.selectedEngineEquipment.advancedStats.critDamage || 0) + (this.selectedItems.selectedEngineEquipment.effects.critDamage || 0) + (this.selectedItems.selectedDiscTwo1.twoEffects.critDamage || 0) + (this.selectedItems.selectedDiscFour1.twoEffects.critDamage || 0) + (this.selectedItems.selectedDiscFour1.fourEffects.critDamage || 0)
      + (this.selectedItems.selectedCharacter2.buff.critDamage || 0) + (this.selectedItems.selectedCharacter2.buff.critDamage || 0) + (this.selectedItems.selectedEngineEquipment2.advancedStats.critDamage || 0) + (this.selectedItems.selectedEngineEquipment2.effects.critDamage || 0)
      + (this.selectedItems.selectedCharacter3.buff.critDamage || 0) + (this.selectedItems.selectedCharacter3.buff.critDamage || 0) + (this.selectedItems.selectedEngineEquipment2.advancedStats.critDamage || 0) + (this.selectedItems.selectedEngineEquipment3.effects.critDamage || 0)
      return (1 + (afterCritRate / 100) * (cridDmg / 100)) / (1 + (beforeCritRate / 100) * (cridDmg / 100)) * 100 - 100;
  }

  calculateCritDamageBuffPercent(beforeBuffRate: number, afterBuffRate: number) {
    // 会心ダメ
    const critRate = this.selectedItems.selectedCharacter.baseCritRate + (this.selectedItems.selectedCharacter.buff.critRate || 0) + (this.selectedItems.selectedEngineEquipment.advancedStats.critRate || 0) + (this.selectedItems.selectedEngineEquipment.effects.critRate || 0) + (this.selectedItems.selectedDiscTwo1.twoEffects.critRate || 0) + (this.selectedItems.selectedDiscFour1.twoEffects.critRate || 0) + (this.selectedItems.selectedDiscFour1.fourEffects.critRate || 0)
    + (this.selectedItems.selectedCharacter2.buff.critRate || 0) + (this.selectedItems.selectedCharacter2.buff.critRate || 0) + (this.selectedItems.selectedEngineEquipment2.advancedStats.critRate || 0) + (this.selectedItems.selectedEngineEquipment2.effects.critRate || 0)
    + (this.selectedItems.selectedCharacter3.buff.critRate || 0) + (this.selectedItems.selectedCharacter3.buff.critRate || 0) + (this.selectedItems.selectedEngineEquipment2.advancedStats.critRate || 0) + (this.selectedItems.selectedEngineEquipment3.effects.critRate || 0)
    const baseCridDmg = this.selectedItems.selectedCharacter.baseCritDamage + (this.selectedItems.selectedCharacter.buff.critDamage || 0) + (this.selectedItems.selectedEngineEquipment.advancedStats.critDamage || 0) + (this.selectedItems.selectedEngineEquipment.effects.critDamage || 0) + (this.selectedItems.selectedDiscTwo1.twoEffects.critDamage || 0) + (this.selectedItems.selectedDiscFour1.twoEffects.critDamage || 0) + (this.selectedItems.selectedDiscFour1.fourEffects.critDamage || 0)
    + (this.selectedItems.selectedCharacter2.buff.critDamage || 0) + (this.selectedItems.selectedCharacter2.buff.critDamage || 0) + (this.selectedItems.selectedEngineEquipment2.advancedStats.critDamage || 0) + (this.selectedItems.selectedEngineEquipment2.effects.critDamage || 0)
    + (this.selectedItems.selectedCharacter3.buff.critDamage || 0) + (this.selectedItems.selectedCharacter3.buff.critDamage || 0) + (this.selectedItems.selectedEngineEquipment2.advancedStats.critDamage || 0) + (this.selectedItems.selectedEngineEquipment3.effects.critDamage || 0)
    return (1 + (critRate / 100) * ((baseCridDmg + afterBuffRate) / 100)) / (1 + ((critRate + beforeBuffRate) / 100) * (baseCridDmg / 100)) * 100 - 100;
  }

  calculatePENRatioBuffPercent(baseDiffence: number, beforeBuffRate: number, afterBuffRate: number) {
      // 22 貫通率
    if (this.selectedItems.selectedCharacter.role === Role.Rupture) {
      return 0;
    }
    const PENRetio = (this.selectedItems.selectedCharacter.buff.PENRatio || 0) + (this.selectedItems.selectedEngineEquipment.advancedStats.PENRatio || 0) + (this.selectedItems.selectedEngineEquipment.effects.PENRatio || 0)
    + (this.selectedItems.selectedDiscFour1.twoEffects.PENRate || this.selectedItems.selectedDiscTwo1.twoEffects.PENRate || 0)
    + (this.selectedItems.selectedCharacter2.buff.PENRatio || 0)
    + (this.selectedItems.selectedCharacter3.buff.PENRatio || 0)
    const registerDeffence = this.selectedItems.selectedCharacter.buff.registerDeffence || 0 + (this.selectedItems.selectedCharacter2.buff.registerDeffence || 0) + (this.selectedItems.selectedCharacter3.buff.registerDeffence || 0)
    + (this.selectedItems.selectedEngineEquipment.effects.registerDeffence || 0) + (this.selectedItems.selectedEngineEquipment2.effects.registerDeffence || 0) + (this.selectedItems.selectedEngineEquipment3.effects.registerDeffence || 0)
    + (this.selectedItems.externalBuffs.registerDeffence || 0);
    const beforeDiffence = baseDiffence * (1 - registerDeffence / 100) * (1 - PENRetio + beforeBuffRate / 100);
    const afterDiffence = baseDiffence * (1 - registerDeffence / 100) * (1 - (PENRetio + afterBuffRate) / 100); // ここで貫通値は扱わない
    return (794 / (794 + afterDiffence)) / (794 / (794 + beforeDiffence)) * 100 - 100;
  }

  calculateDmgBonusBuffPercent(beforeBuffRate: number, afterBuffRate: number) {
    // 28 属性ダメージ
    const baseDmgBonus = 100 + (this.selectedItems.selectedCharacter.buff.damageBonus || 0) // 自己バフ
    + (this.selectedItems.selectedCharacter2.buff.damageBonus || 0) // 撃破の与ダメバフ
    + (() => {
      switch(this.selectedItems.selectedCharacter.attribute) {
        // 撃破のバフ、属性が対応していれば加算
        case Attribute.Physical: return this.selectedItems.selectedCharacter2.buff.physicalDamageBonus || 0
        case Attribute.Fire: return this.selectedItems.selectedCharacter2.buff.fireDamageBonus || 0
        case Attribute.Ice: return this.selectedItems.selectedCharacter2.buff.iceDamageBonus || 0
        case Attribute.Electric: return this.selectedItems.selectedCharacter2.buff.electricDamageBonus || 0
        case Attribute.Ether: return this.selectedItems.selectedCharacter2.buff.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (this.selectedItems.selectedCharacter3.buff.damageBonus || 0) // 支援の与ダメバフ
    + (() => {
      switch(this.selectedItems.selectedCharacter.attribute) {
        // 支援のバフ、属性が対応していれば加算
        case Attribute.Physical: return this.selectedItems.selectedCharacter3.buff.physicalDamageBonus || 0
        case Attribute.Fire: return this.selectedItems.selectedCharacter3.buff.fireDamageBonus || 0
        case Attribute.Ice: return this.selectedItems.selectedCharacter3.buff.iceDamageBonus || 0
        case Attribute.Electric: return this.selectedItems.selectedCharacter3.buff.electricDamageBonus || 0
        case Attribute.Ether: return this.selectedItems.selectedCharacter3.buff.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (this.selectedItems.selectedDiscTwo1.twoEffects.damageBonus || 0) // 2セットディスク効果
    + (this.selectedItems.selectedDiscFour1.twoEffects.damageBonus || 0) // 4セットディスク2セット効果
    + (this.selectedItems.selectedDiscFour1.fourEffects.damageBonus || 0) // 4セットディスク4セット効果
    + (this.selectedItems.selectedDiscFour2.fourEffects.damageBonus || 0) // 撃破ディスク4セット効果
    + (this.selectedItems.selectedDiscFour3.fourEffects.damageBonus || 0) // 支援ディスク4セット効果
    + (this.selectedItems.selectedEngineEquipment.effects.damageBonus || 0) // アタッカーの音動機効果、属性が対応していれば加算
    + (() => {
      switch(this.selectedItems.selectedCharacter.attribute) {
        // 属性指定ありのダメージボーナス
        case Attribute.Physical: return this.selectedItems.selectedEngineEquipment.effects.physicalDamageBonus || 0
        case Attribute.Fire: return this.selectedItems.selectedEngineEquipment.effects.fireDamageBonus || 0
        case Attribute.Ice: return this.selectedItems.selectedEngineEquipment.effects.iceDamageBonus || 0
        case Attribute.Electric: return this.selectedItems.selectedEngineEquipment.effects.electricDamageBonus || 0
        case Attribute.Ether: return this.selectedItems.selectedEngineEquipment.effects.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (this.selectedItems.selectedEngineEquipment2.effects.damageBonus || 0) // 撃破の音動機効果
    + (() => {
      switch(this.selectedItems.selectedCharacter.attribute) {
        // 属性指定ありのダメージボーナス
        case Attribute.Physical: return this.selectedItems.selectedEngineEquipment2.effects.physicalDamageBonus || 0
        case Attribute.Fire: return this.selectedItems.selectedEngineEquipment2.effects.fireDamageBonus || 0
        case Attribute.Ice: return this.selectedItems.selectedEngineEquipment2.effects.iceDamageBonus || 0
        case Attribute.Electric: return this.selectedItems.selectedEngineEquipment2.effects.electricDamageBonus || 0
        case Attribute.Ether: return this.selectedItems.selectedEngineEquipment2.effects.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (this.selectedItems.selectedEngineEquipment3.effects.damageBonus || 0) // 支援の音動機効果、属性が対応していれば加算
    + (() => {
      switch(this.selectedItems.selectedCharacter.attribute) {
        // 属性指定ありのダメージボーナス
        case Attribute.Physical: return this.selectedItems.selectedEngineEquipment3.effects.physicalDamageBonus || 0
        case Attribute.Fire: return this.selectedItems.selectedEngineEquipment3.effects.fireDamageBonus || 0
        case Attribute.Ice: return this.selectedItems.selectedEngineEquipment3.effects.iceDamageBonus || 0
        case Attribute.Electric: return this.selectedItems.selectedEngineEquipment3.effects.electricDamageBonus || 0
        case Attribute.Ether: return this.selectedItems.selectedEngineEquipment3.effects.etherDamageBonus || 0
        default: return 0;
      }
    })()
    + (this.selectedItems.externalBuffs.damageBonus || 0) // 外部バフ
    + beforeBuffRate
    ;
    const beforeDmgBonus = baseDmgBonus + beforeBuffRate;
    const afterDmgBonus = baseDmgBonus + afterBuffRate;
    return (afterDmgBonus / beforeDmgBonus) * 100 - 100;
  }

  calculateHPBuffPercent(beforeBuffRate: number, afterBuffRate: number) {
    // 26 HP%
    if (this.selectedItems.selectedCharacter?.role !== Role.Rupture) {
      return 0;
    }
    const baseHp = this.selectedItems.selectedCharacter?.baseHp ?? 0;
    const bonusHpNumMain = 2200;
    const bonusAttackNumMain = 316;
    const hpPercentInBattle = this.selectedItems.selectedCharacter.buff.hpPercentInBattle || 0 + (this.selectedItems.selectedCharacter2.buff.hpPercentInBattle || 0) + (this.selectedItems.selectedCharacter3.buff.hpPercentInBattle || 0);

    const bonusHpRate = (this.selectedItems.selectedEngineEquipment?.advancedStats?.hp ?? 0) + (this.selectedItems.selectedDiscFour1.twoEffects.hpPercent || 0) + (this.selectedItems.selectedDiscTwo1.twoEffects.hpPercent || 0);
    const beforeHp = (baseHp * (1 + (beforeBuffRate + bonusHpRate) / 100) + bonusHpNumMain) * (1 + hpPercentInBattle / 100);
    const afterHp = (baseHp * (1 + (afterBuffRate + bonusHpRate) / 100) + bonusHpNumMain) * (1 + hpPercentInBattle / 100); // メイン30%追加

    const atkPercentInStatus = (this.selectedItems.selectedDiscFour1.twoEffects.atk ?? 0) + (this.selectedItems.selectedDiscTwo1.twoEffects.atk ?? 0) + (this.selectedItems.selectedEngineEquipment.advancedStats.atk ?? 0);
    const atkPercentInBattle = this.selectedItems.selectedCharacter.buff.atkRate || 0 + (this.selectedItems.selectedCharacter2.buff.atkRate || 0) + (this.selectedItems.selectedCharacter3.buff.atkRate || 0)
    + (this.selectedItems.selectedEngineEquipment.effects.atkRate || 0) + (this.selectedItems.selectedEngineEquipment2.effects.atkRate || 0) + (this.selectedItems.selectedEngineEquipment3.effects.atkRate || 0)
    + (this.selectedItems.selectedDiscFour1.fourEffects.atk || 0) + (this.selectedItems.selectedDiscFour2.fourEffects.atk || 0) + (this.selectedItems.selectedDiscFour3.fourEffects.atk || 0);
    const atk = (((this.selectedItems.selectedCharacter?.baseAtk ?? 0) + (this.selectedItems.selectedEngineEquipment?.baseAttack ?? 0)) * (1 + atkPercentInStatus / 100) + bonusAttackNumMain)
    * (1 + atkPercentInBattle / 100)
    + (this.selectedItems.selectedCharacter2?.buff?.atkValue || 0)
    + (this.selectedItems.selectedCharacter3?.buff?.atkValue || 0);

    const beforeSheerForce = beforeHp * 0.1 + atk * 0.3 + (this.selectedItems.selectedCharacter2?.buff?.sheerForcePowerNum || 0) + (this.selectedItems.selectedCharacter3?.buff?.sheerForcePowerNum || 0);
    const afterSheerForce = afterHp * 0.1 + atk * 0.3 + (this.selectedItems.selectedCharacter2?.buff?.sheerForcePowerNum || 0) + (this.selectedItems.selectedCharacter3?.buff?.sheerForcePowerNum || 0);
    return (afterSheerForce / beforeSheerForce) * 100 - 100;
  }

  calculateAtkBuffPercent(beforeBuffRate: number, afterBuffRate: number) {
    // 攻撃力% の計算:
    // baseAttack: 選択キャラの baseAtk
    // bonusAttackRate: 5番メイン 固定 30%
    // bonusAttackNumMain: 2番メイン 固定 316
    // eeBaseAttack: 選択した音動機の基礎ステ
    // eeAdvancedAttackRate: 選択 EngineEquipment の advancedStats?.atk（% として扱う）
    const baseAttack = this.selectedItems.selectedCharacter?.baseAtk ?? 0;
    const bonusAttackNumMain = 316;
    const eeBaseAttack = this.selectedItems.selectedEngineEquipment?.baseAttack ?? 0;
    const attackRateInStatus = this.selectedItems.selectedEngineEquipment?.advancedStats?.atk ?? 0 + (this.selectedItems.selectedDiscFour1.twoEffects.atk ?? 0) + (this.selectedItems.selectedDiscTwo1.twoEffects.atk ?? 0);

    const atkPercentInBattle = this.selectedItems.selectedCharacter.buff.atkRate || 0 + (this.selectedItems.selectedCharacter2.buff.atkRate || 0) + (this.selectedItems.selectedCharacter3.buff.atkRate || 0)
    + (this.selectedItems.selectedEngineEquipment.effects.atkRate || 0) + (this.selectedItems.selectedEngineEquipment2.effects.atkRate || 0) + (this.selectedItems.selectedEngineEquipment3.effects.atkRate || 0)
    + (this.selectedItems.selectedDiscFour1.fourEffects.atk || 0) + (this.selectedItems.selectedDiscFour2.fourEffects.atk || 0) + (this.selectedItems.selectedDiscFour3.fourEffects.atk || 0);

    const beforeAtk = ((baseAttack + eeBaseAttack) * (1 + (beforeBuffRate + attackRateInStatus) / 100) + bonusAttackNumMain)
    * (1 + atkPercentInBattle / 100)
    + (this.selectedItems.selectedCharacter2?.buff?.atkValue || 0) + (this.selectedItems.selectedCharacter3?.buff?.atkValue || 0);
    const afterAtk = ((baseAttack + eeBaseAttack) * (1 + (afterBuffRate + attackRateInStatus) / 100) + bonusAttackNumMain)
    * (1 + atkPercentInBattle / 100)
    + (this.selectedItems.selectedCharacter2?.buff?.atkValue || 0) + (this.selectedItems.selectedCharacter3?.buff?.atkValue || 0);
    if (this.selectedItems.selectedCharacter?.role === Role.Rupture) {
      const bonusHpNumMain = 2200;
      const hp = (this.selectedItems.selectedCharacter?.baseHp ?? 0) * (1 + (this.selectedItems.selectedEngineEquipment?.advancedStats?.hp ?? 0) / 100) + bonusHpNumMain;
      const beforeSheerForce = hp * 0.1 + beforeAtk * 0.3;
      const afterSheerForce = hp * 0.1 + afterAtk * 0.3;
      return afterSheerForce/beforeSheerForce * 100 - 100;
    } else {
      return afterAtk/beforeAtk * 100 - 100;
    }
  }
}
