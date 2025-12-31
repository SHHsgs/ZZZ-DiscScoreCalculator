import { Attribute, Role } from "@/types/character";
import { SelectedItems } from "@/types/selectedItems";

// 列（ステータス）
const COLUMNS = [
  { key: "atkRate", label: "攻撃%" },
  { key: "atkValue", label: "攻撃固定値" },
  { key: "critRate", label: "会心率" },
  { key: "critDmg", label: "会心ダメ" },
  { key: "damageBonus", label: "与ダメ" },
  { key: "resistanceIgnore", label: "属性耐性無視" },
  { key: "registerDeffence", label: "防御無視" },
  { key: "PENRatio", label: "貫通率" },
  { key: "hpRate", label: "HP%" },
  { key: "sheerForce", label: "透徹力固定値" },
] as const;

// 行（バフの出所）
const ROWS = [
  "基礎パラ(コアスキル込)",
  "音動機(上級ステ+音動機効果)",
  "自己バフ(コアパッシブ等)",
  "4セット効果(2セット効果除く)",
  "2セット効果(4セット+2セット)",
  "撃破バフ",
  "撃破音動機バフ",
  "4セット効果(撃破)",
  "支援バフ",
  "支援音動機バフ",
  "4セット効果(支援)",
  "その他バフ(戦闘前%+戦闘中%)",
] as const;

export type StatRow = {
  [key in typeof COLUMNS[number]["key"]]?: string;
};

export type StatTableData = {
  [rowLabel: string]: StatRow;
};

export default function ShowBuffs(props: SelectedItems) {
  const data: StatTableData = {
    "基礎パラ(コアスキル込)": {
      atkValue: String(props.selectedCharacter.baseAtk),
      critRate: String(props.selectedCharacter.baseCritRate),
      critDmg: String(props.selectedCharacter.baseCritDamage),
      damageBonus: "-",
      resistanceIgnore: "-",
      registerDeffence: "-",
      PENRatio: "-",
      hpRate: "-",
      sheerForce: (() => {
        if (props.selectedCharacter.role === Role.Rupture) {
          return String(props.selectedCharacter.baseHp * 0.1 + props.selectedCharacter.baseAtk * 0.3);
        } else {
          return "-"
        }
      })(),
    },
    "音動機(上級ステ+音動機効果)": {
      atkValue: String(props.selectedEngineEquipment.baseAttack),
      atkRate: String(props.selectedEngineEquipment.advancedStats.atk || 0) + "+" + String(props.selectedEngineEquipment.effects.atkRateInBattle || 0),
      critRate: (() => {
        const advanceCritRate = props.selectedEngineEquipment.advancedStats.critRate || 0;
        const effectCritRate = props.selectedEngineEquipment.effects.critRate || 0;
        return String(advanceCritRate) + "+" + String(effectCritRate);
      })(),
      critDmg: (() => {
        const advanceCritDmg = props.selectedEngineEquipment.advancedStats.critDamage || 0;
        const effectCritDmg = props.selectedEngineEquipment.effects.critDamage || 0;
        return String(advanceCritDmg) + "+" + String(effectCritDmg);
      })(),
      damageBonus: String(props.selectedEngineEquipment.effects.damageBonus || 0) +
      (() => {
        const attributeDmgBonus = (() => {
          switch(props.selectedCharacter.attribute) {
            // 属性指定ありのダメージボーナス
            case Attribute.Physical: return props.selectedEngineEquipment.effects.physicalDamageBonus || 0
            case Attribute.Fire: return props.selectedEngineEquipment.effects.fireDamageBonus || 0
            case Attribute.Ice: return props.selectedEngineEquipment.effects.iceDamageBonus || 0
            case Attribute.Electric: return props.selectedEngineEquipment.effects.electricDamageBonus || 0
            case Attribute.Ether: return props.selectedEngineEquipment.effects.etherDamageBonus || 0
            default: return 0;
          }
        })();
        return attributeDmgBonus === 0 ? "" : "+" + String(attributeDmgBonus);
      })()
      ,
      resistanceIgnore: String(props.selectedEngineEquipment.effects.resistanceIgnore || 0),
      registerDeffence: String(props.selectedEngineEquipment.effects.registerDeffence || 0),
      PENRatio: String(props.selectedEngineEquipment.effects.PENRatio || 0),
      hpRate: String(props.selectedEngineEquipment.effects.hpPercent || 0),
      sheerForce: String(props.selectedEngineEquipment.effects.sheerForcePowerNum || 0),
    },
    "自己バフ(コアパッシブ等)": {
      atkValue: String(props.selectedCharacter.buff.atkValue || 0),
      critRate: String(props.selectedCharacter.buff.critRate || 0),
      critDmg: String(props.selectedCharacter.buff.critDamage || 0),
      damageBonus: String(props.selectedCharacter.buff.damageBonus || 0) +
      (() => {
        const attributeDmgBonus = (() => {
          switch(props.selectedCharacter.attribute) {
            // 属性指定ありのダメージボーナス
            case Attribute.Physical: return props.selectedCharacter.buff.physicalDamageBonus || 0
            case Attribute.Fire: return props.selectedCharacter.buff.fireDamageBonus || 0
            case Attribute.Ice: return props.selectedCharacter.buff.iceDamageBonus || 0
            case Attribute.Electric: return props.selectedCharacter.buff.electricDamageBonus || 0
            case Attribute.Ether: return props.selectedCharacter.buff.etherDamageBonus || 0
            default: return 0;
          }
        })();
        return attributeDmgBonus === 0 ? "" : "+" + String(attributeDmgBonus);
      })(),
      resistanceIgnore: String(props.selectedCharacter.buff.resistanceIgnore || 0),
      registerDeffence: String(props.selectedCharacter.buff.registerDeffence || 0),
      PENRatio: String(props.selectedCharacter.buff.PENRatio || 0),
      hpRate: String(props.selectedCharacter.buff.hpPercent || 0),
      sheerForce: String(props.selectedCharacter.buff.sheerForcePowerNum || 0),
    },
    "4セット効果(2セット効果除く)": {
      atkRate: String(props.selectedDiscFour1.fourEffects.atkRateInBattle || 0),
      critRate: String(props.selectedDiscFour1.fourEffects.critRate || 0),
      critDmg: String(props.selectedDiscFour1.fourEffects.critDamage || 0),
      damageBonus: String(props.selectedDiscFour1.fourEffects.damageBonus || 0),
    },
    "2セット効果(4セット+2セット)": {
      atkRate: String(props.selectedDiscFour1.twoEffects.atkRateInStatus || 0) + "+" + String(props.selectedDiscFour1.twoEffects.atkRateInStatus || 0),
      critRate: String(props.selectedDiscFour1.twoEffects.critRate || 0) + "+" + String(props.selectedDiscTwo1.twoEffects.critRate || 0),
      critDmg: String(props.selectedDiscFour1.twoEffects.critDamage || 0) + "+" + String(props.selectedDiscTwo1.twoEffects.critDamage || 0),
      damageBonus: String(props.selectedDiscFour1.twoEffects.damageBonus || 0) + "+" + String(props.selectedDiscTwo1.twoEffects.damageBonus || 0),
    },
    "撃破バフ": {
      atkValue: String(props.selectedCharacter2.buff.atkValue || 0),
      critRate: String(props.selectedCharacter2.buff.critRate || 0),
      critDmg: String(props.selectedCharacter2.buff.critDamage || 0),
      damageBonus: String(props.selectedCharacter2.buff.damageBonus || 0) +
      (() => {
        const attributeDmgBonus = (() => {
          switch(props.selectedCharacter.attribute) {
            // 属性指定ありのダメージボーナス
            case Attribute.Physical: return props.selectedCharacter2.buff.physicalDamageBonus || 0
            case Attribute.Fire: return props.selectedCharacter2.buff.fireDamageBonus || 0
            case Attribute.Ice: return props.selectedCharacter2.buff.iceDamageBonus || 0
            case Attribute.Electric: return props.selectedCharacter2.buff.electricDamageBonus || 0
            case Attribute.Ether: return props.selectedCharacter2.buff.etherDamageBonus || 0
            default: return 0;
          }
        })();
        return attributeDmgBonus === 0 ? "" : "+" + String(attributeDmgBonus);
      })(),
      resistanceIgnore: String(props.selectedCharacter2.buff.resistanceIgnore || 0),
      registerDeffence: String(props.selectedCharacter2.buff.registerDeffence || 0),
      PENRatio: String(props.selectedCharacter2.buff.PENRatio || 0),
      hpRate: String(props.selectedCharacter2.buff.hpPercent || 0),
      sheerForce: String(props.selectedCharacter2.buff.sheerForcePowerNum || 0),
    },
    "撃破音動機バフ": {
      atkValue: String(props.selectedEngineEquipment2.effects.atkValue || 0),
      critRate: String(props.selectedEngineEquipment2.effects.critRate || 0),
      critDmg: String(props.selectedEngineEquipment2.effects.critDamage || 0),
      damageBonus: String(props.selectedEngineEquipment2.effects.damageBonus || 0) +
      (() => {
        const attributeDmgBonus = (() => {
          switch(props.selectedCharacter.attribute) {
            // 属性指定ありのダメージボーナス
            case Attribute.Physical: return props.selectedEngineEquipment2.effects.physicalDamageBonus || 0
            case Attribute.Fire: return props.selectedEngineEquipment2.effects.fireDamageBonus || 0
            case Attribute.Ice: return props.selectedEngineEquipment2.effects.iceDamageBonus || 0
            case Attribute.Electric: return props.selectedEngineEquipment2.effects.electricDamageBonus || 0
            case Attribute.Ether: return props.selectedEngineEquipment2.effects.etherDamageBonus || 0
            default: return 0;
          }
        })();
        return attributeDmgBonus === 0 ? "" : "+" + String(attributeDmgBonus);
      })(),
      resistanceIgnore: String(props.selectedEngineEquipment2.effects.resistanceIgnore || 0),
      registerDeffence: String(props.selectedEngineEquipment2.effects.registerDeffence || 0),
      PENRatio: String(props.selectedEngineEquipment2.effects.PENRatio || 0),
      hpRate: String(props.selectedEngineEquipment2.effects.hpPercent || 0),
      sheerForce: String(props.selectedEngineEquipment2.effects.sheerForcePowerNum || 0),
    },
    "4セット効果(撃破)": {
      atkRate: String(props.selectedDiscFour2.fourEffects.atkRateInBattle || 0),
      critRate: String(props.selectedDiscFour2.fourEffects.critRate || 0),
      critDmg: String(props.selectedDiscFour2.fourEffects.critDamage || 0),
      damageBonus: String(props.selectedDiscFour2.fourEffects.damageBonus || 0),
    },
    "支援バフ": {
      atkValue: String(props.selectedCharacter3.buff.atkValue || 0),
      critRate: String(props.selectedCharacter3.buff.critRate || 0),
      critDmg: String(props.selectedCharacter3.buff.critDamage || 0),
      damageBonus: String(props.selectedCharacter3.buff.damageBonus || 0) +
      (() => {
        const attributeDmgBonus = (() => {
          switch(props.selectedCharacter.attribute) {
            // 属性指定ありのダメージボーナス
            case Attribute.Physical: return props.selectedCharacter3.buff.physicalDamageBonus || 0
            case Attribute.Fire: return props.selectedCharacter3.buff.fireDamageBonus || 0
            case Attribute.Ice: return props.selectedCharacter3.buff.iceDamageBonus || 0
            case Attribute.Electric: return props.selectedCharacter3.buff.electricDamageBonus || 0
            case Attribute.Ether: return props.selectedCharacter3.buff.etherDamageBonus || 0
            default: return 0;
          }
        })();
        return attributeDmgBonus === 0 ? "" : "+" + String(attributeDmgBonus);
      })(),
      resistanceIgnore: String(props.selectedCharacter3.buff.resistanceIgnore || 0),
      registerDeffence: String(props.selectedCharacter3.buff.registerDeffence || 0),
      PENRatio: String(props.selectedCharacter3.buff.PENRatio || 0),
      hpRate: String(props.selectedCharacter3.buff.hpPercent || 0),
      sheerForce: String(props.selectedCharacter3.buff.sheerForcePowerNum || 0),
    },
    "支援音動機バフ": {
      atkValue: String(props.selectedEngineEquipment3.effects.atkValue || 0),
      critRate: String(props.selectedEngineEquipment3.effects.critRate || 0),
      critDmg: String(props.selectedEngineEquipment3.effects.critDamage || 0),
      damageBonus: String(props.selectedEngineEquipment3.effects.damageBonus || 0) +
      (() => {
        const attributeDmgBonus = (() => {
          switch(props.selectedCharacter.attribute) {
            // 属性指定ありのダメージボーナス
            case Attribute.Physical: return props.selectedEngineEquipment3.effects.physicalDamageBonus || 0
            case Attribute.Fire: return props.selectedEngineEquipment3.effects.fireDamageBonus || 0
            case Attribute.Ice: return props.selectedEngineEquipment3.effects.iceDamageBonus || 0
            case Attribute.Electric: return props.selectedEngineEquipment3.effects.electricDamageBonus || 0
            case Attribute.Ether: return props.selectedEngineEquipment3.effects.etherDamageBonus || 0
            default: return 0;
          }
        })();
        return attributeDmgBonus === 0 ? "" : "+" + String(attributeDmgBonus);
      })(),
      resistanceIgnore: String(props.selectedEngineEquipment3.effects.resistanceIgnore || 0),
      registerDeffence: String(props.selectedEngineEquipment3.effects.registerDeffence || 0),
      PENRatio: String(props.selectedEngineEquipment3.effects.PENRatio || 0),
      hpRate: String(props.selectedEngineEquipment3.effects.hpPercent || 0),
      sheerForce: String(props.selectedEngineEquipment3.effects.sheerForcePowerNum || 0),
    },
    "4セット効果(支援)": {
      atkRate: String(props.selectedDiscFour3.fourEffects.atkRateInBattle || 0),
      critRate: String(props.selectedDiscFour3.fourEffects.critRate || 0),
      critDmg: String(props.selectedDiscFour3.fourEffects.critDamage || 0),
      damageBonus: String(props.selectedDiscFour3.fourEffects.damageBonus || 0),
    },
    "その他バフ(戦闘前%+戦闘中%)": {
      atkValue: String(props.externalBuffs.atkValue || 0),
      atkRate: String(props.externalBuffs.atkRateInStatus || 0) + "+" + String(props.externalBuffs.atkRateInBattle || 0),
      critRate: String(props.externalBuffs.critRate || 0),
      critDmg: String(props.externalBuffs.critDamage || 0),
      damageBonus: String(props.externalBuffs.damageBonus || 0),
      resistanceIgnore: String(props.externalBuffs.resistanceIgnore || 0),
      registerDeffence: String(props.externalBuffs.registerDeffence || 0),
      PENRatio: String(props.externalBuffs.PENRatio || 0),
      hpRate: String(props.externalBuffs.hpPercent) + "+" + String(props.externalBuffs.hpPercentInBattle || 0),
      sheerForce: String(props.externalBuffs.sheerForcePowerNum || 0),
    },
  };

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-xs w-full">
        <thead>
          <tr className="border-b-2 border-slate-400 border-t-0">
            <th className="px-2 py-1 text-left border-r border-slate-400 max-w-32">
              項目
            </th>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className="border-r border-slate-400 px-2 py-1 text-center whitespace-nowrap last:border-r-0"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {ROWS.map((row) => (
            <tr key={row} className="last:border-b-0">
              <th className="border-r border-t border-slate-400 px-2 py-1 text-left font-medium max-w-32 break-keep">
                {row}
              </th>

              {COLUMNS.map((col) => {
                const value = data[row]?.[col.key];
                return (
                  <td
                    key={col.key}
                    className="border-r border-t border-slate-400 px-2 py-1 text-right last:border-r-0"
                  >
                    {value != null && value != undefined ? value : 0}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}