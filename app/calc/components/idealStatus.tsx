import { Buff } from "@/types/buff";
import { Character, Role } from "@/types/character";
import { DiscEffect } from "@/types/DiscEffect";
import { EngineEquipment } from "@/types/engineEquipment";
import { DiscSubStatusOptimizer, StatusType } from "./discSubStatusOptimizer";
import { Calculator } from "./calculator";
import PullDown from "@/app/components/PullDown";
import { useState } from "react";

type Props = {
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
};

export default function IdealStatus(props: Props) {
  const calculator = new Calculator(props);
  const [baseDiffence, setBaseDiffence] = useState("952.8");
  const [subStatusCount, setSubStatusCount] = useState(30);

  const optimizer = new DiscSubStatusOptimizer(props, parseFloat(baseDiffence));
  const statusInBattle = optimizer.getStatusWithoutBattle(subStatusCount + 30);
  const atkHitCount = optimizer.subStatusArray.slice(0, subStatusCount + 30).filter((x) => x.maxStatusType == StatusType.AtkRate).length;
  const critRateHitCount = optimizer.subStatusArray.slice(0, subStatusCount + 30).filter((x) => x.maxStatusType == StatusType.CritRate).length;
  const critDamageHitCount = optimizer.subStatusArray.slice(0, subStatusCount + 30).filter((x) => x.maxStatusType == StatusType.CritDmg).length;
  const hpHitCount = optimizer.subStatusArray.slice(0, subStatusCount + 30).filter((x) => x.maxStatusType == StatusType.HpRate).length;

  const atkHitCountWithout6th = atkHitCount - 10;
  const atkHitCountWithout5th = atkHitCountWithout6th - 10;
  const atk5thBuffPercent = calculator.calculateAtkBuffPercent(atkHitCountWithout5th, atkHitCountWithout6th);
  const PEN5thBuffPercent = calculator.calculatePENRatioBuffPercent(parseFloat(baseDiffence), 0, 24);
  const dmgBonus5thBuffPercent = calculator.calculateDmgBonusBuffPercent(atkHitCountWithout5th, atkHitCountWithout6th);
  const is5thAtk = optimizer.subStatusArray[10].maxStatusType === StatusType.AtkRate;
  const is5thPEN = optimizer.subStatusArray[10].maxStatusType === StatusType.PENRate;
  const is5thDmgBuff = optimizer.subStatusArray[10].maxStatusType === StatusType.DmgBonus;
  // 5番攻撃の場合のヒット数と5,6番攻撃の場合のヒット数
  const atkHitCountWithoutMain = props.selectedCharacter.role === Role.Rupture ? 0 : (is5thAtk ? atkHitCount - 20 : atkHitCount - 10);
  const maxEffectiveSubStatusType = (() => {
    if (atkHitCountWithoutMain >= critRateHitCount && atkHitCountWithoutMain >= critDamageHitCount && atkHitCountWithoutMain >= hpHitCount){
      return StatusType.AtkRate;
    } else if (critRateHitCount >= atkHitCountWithoutMain && critRateHitCount >= critDamageHitCount && critRateHitCount >= hpHitCount) {
      return StatusType.CritRate;
    } else if (critDamageHitCount >= atkHitCountWithoutMain && critDamageHitCount >= critRateHitCount && critDamageHitCount >= hpHitCount) {
      return StatusType.CritDmg;
    } else {
      return StatusType.HpRate;
    }
  })();
  const is4thCritDmg = critDamageHitCount > atkHitCountWithoutMain && critDamageHitCount > critRateHitCount;
  const critDamageHitCountWithout4th = critDamageHitCount - (is4thCritDmg ? 10 : 0);
  const is4thCritRate = critRateHitCount > atkHitCountWithoutMain && critRateHitCount > critDamageHitCount;
  const critRateHitCountWithout4th = critRateHitCount - (is4thCritRate ? 10 : 0);

  const hpHitCountWithoutMain = Math.max(((!is4thCritDmg && !is4thCritRate) ? hpHitCount - 10 : hpHitCount)
  - ((!is5thPEN && !is5thDmgBuff) ? 10 : 0), 0);

  return (
    <div className="rounded-md border border-slate-300 bg-slate-50 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 mb-4">
        <PullDown label="敵の防御力" value={baseDiffence.toString()} onChange={setBaseDiffence} options={[{ value: "952.8", label: "952.8" }, { value: "1588.0", label: "1588.0" }]} />
        <div className="relative w-4/3"><span className="absolute bottom-2 w-full text-xs">通常の敵は952.8。<br />ワンダリングハンターのみ1588。</span></div>
      </div>
      <div className="grid grid-cols-[2fr_1fr_2fr]">
        <div className="rounded-md border border-gray-300 p-2">
          <h3 className="text-base font-medium mb-2">理想ステ</h3>
          <div className="mx-2 text-xs">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>HP</div>
                <div className="text-right">{Math.ceil(statusInBattle.hp)}</div>
              </div>
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>攻撃力</div>
                <div className="text-right">{Math.ceil(statusInBattle.atk)}</div>
              </div>
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>会心率</div>
                <div className="text-right">{Math.round(statusInBattle.critRate * 10) / 10}%</div>
              </div>
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>会心ダメ</div>
                <div className="text-right">{Math.round(statusInBattle.critDmg * 10) / 10}%</div>
              </div>
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>貫通率</div>
                <div className="text-right">{(is5thPEN ? 24 : 0) + (props.selectedDiscTwo1.twoEffects.PENRate || props.selectedDiscFour1.twoEffects.PENRate || 0)}%</div>
              </div>
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>透徹力</div>
                <div className="text-right">{Math.ceil(statusInBattle.sheerForce)}</div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className="rounded-md border border-gray-300 p-2">
          <h3 className="text-base font-medium">ステータス理想振り分け</h3>
          <label htmlFor="subStatusCount" className="flex flex-col gap-1 text-sm">
            有効サブステ数：{subStatusCount}
            <input
              type="range"
              id="subStatusCount"
              min={0}
              max={48}
              step={1}
              value={subStatusCount}
              onChange={(e) => setSubStatusCount(Number(e.target.value))}
            />
          </label>
          <div className="text-sm mb-0.5">
            メインステ
            <div className="grid grid-cols-3 gap-x-1 gap-y-1 text-xs text-center">
              <div>4番：{is4thCritDmg ? "会心ダメ" : (is4thCritRate ? "会心率" : (props.selectedCharacter.role === Role.Rupture ? "HP%" : "攻撃%"))}</div>
              <div>5番：{is5thAtk ? "攻撃%" : (is5thPEN ? "貫通率" : "属性ダメ")}</div>
              <div>6番：{props.selectedCharacter.role === Role.Rupture ? "HP%" : "攻撃%"}</div>
            </div>
          </div>
          <div className="text-sm">
          サブステ
            <div className="mx-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>HP%</div>
                <div className="text-right">{hpHitCountWithoutMain}</div>
              </div>
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>攻撃力%</div>
                <div className="text-right">{atkHitCountWithoutMain}</div>
              </div>
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>会心率</div>
                <div className="text-right">{critRateHitCountWithout4th}</div>
              </div>
              <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                <div>会心ダメ</div>
                <div className="text-right">{critDamageHitCountWithout4th}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}