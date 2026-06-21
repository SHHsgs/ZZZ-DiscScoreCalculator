import { Role } from "@/types/character";
import { DiscSubStatusOptimizer, StatusType } from "./discSubStatusOptimizer";
import { Calculator } from "./calculator";
import { useState } from "react";
import { SelectedItems } from "@/types/selectedItems";
import Accordion from "@/app/components/Accordion";
import InfoTooltip from "@/app/components/InfoTooltip";
import StatusRecorder from "./statusRecorder";

export default function IdealStatus(props: SelectedItems) {
  const calculator = new Calculator(props);
  const [subStatusCount, setSubStatusCount] = useState(30);

  const optimizer5thAtk = new DiscSubStatusOptimizer(props, StatusType.AtkRate);
  const optimizer5thPEN = new DiscSubStatusOptimizer(props, StatusType.PENRate);
  const optimizer5thAtt = new DiscSubStatusOptimizer(props, StatusType.DmgBonus);
  const finalBuffrate5thAtk = calculator.calculateFinalBuffRate(optimizer5thAtk, subStatusCount);
  const finalBuffrate5thPEN = calculator.calculateFinalBuffRate(optimizer5thPEN, subStatusCount);
  const finalBuffrate5thAtt = calculator.calculateFinalBuffRate(optimizer5thAtt, subStatusCount);

  const optimizer = (() => {
    if (finalBuffrate5thAtt > finalBuffrate5thPEN && finalBuffrate5thAtt > finalBuffrate5thAtk) {
      return optimizer5thAtt;
    } else if (finalBuffrate5thPEN > finalBuffrate5thAtk && finalBuffrate5thPEN > finalBuffrate5thAtt) {
      return optimizer5thPEN;
    } else {
      return optimizer5thAtk
    }
  })();
  const statusWithoutBattle = optimizer.getStatusWithoutBattle(subStatusCount + 30);
  const atkHitCount = optimizer.subStatusArray.slice(0, subStatusCount + 30).filter((x) => x.maxStatusType == StatusType.AtkRate).length;
  const critRateHitCount = optimizer.subStatusArray.slice(0, subStatusCount + 30).filter((x) => x.maxStatusType == StatusType.CritRate).length;
  const critDamageHitCount = optimizer.subStatusArray.slice(0, subStatusCount + 30).filter((x) => x.maxStatusType == StatusType.CritDmg).length;
  const hpHitCount = optimizer.subStatusArray.slice(0, subStatusCount + 30).filter((x) => x.maxStatusType == StatusType.HpRate).length;

  const atkHitCountWithout6th = atkHitCount - 10;
  const atkHitCountWithout5th = atkHitCountWithout6th - 10;
  const atk5thBuffPercent = calculator.calculateAtkBuffPercent(atkHitCountWithout5th, atkHitCountWithout6th);
  const PEN5thBuffPercent = calculator.calculatePENRatioBuffPercent(0, 24);
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

  const mainStatus5thType = is5thAtk ? StatusType.AtkRate : (is5thPEN ? StatusType.PENRate : (is5thDmgBuff ? StatusType.DmgBonus : StatusType.HpRate));
  const statusInBattle = calculator.calculateIdealStatusInBattle(optimizer, subStatusCount, mainStatus5thType);

  const [userStatus, setUserStatus] = useState({
    hp: 0,
    atk: 0,
    critRate: 0,
    critDmg: 0,
    PENRatio: 0,
    sheerForce: 0,
    dmgBonus: 0,
  });
  const userStatusInBattle = calculator.calculateStatusInBattle(userStatus.atk, userStatus.hp, userStatus.critRate, userStatus.critDmg, userStatus.PENRatio, userStatus.dmgBonus);

  const handleCopyIdealStatus = () => {
    const penRatio = props.selectedCharacter.role === Role.Attack 
      ? (is5thPEN ? 24 : 0) + (props.selectedDiscTwo1.twoEffects.PENRate || props.selectedDiscFour1.twoEffects.PENRate || 0)
      : 0;
    const dmgBonus = (props.selectedDiscTwo1.twoEffects.damageBonus || 0) + (props.selectedDiscFour1.twoEffects.damageBonus || 0) + (is5thDmgBuff ? 30 : 0);
    
    setUserStatus({
      hp: Math.ceil(statusWithoutBattle.hp),
      atk: Math.ceil(statusWithoutBattle.atk),
      critRate: Math.round(statusWithoutBattle.critRate * 10) / 10,
      critDmg: Math.round(statusWithoutBattle.critDmg * 100) / 100,
      PENRatio: penRatio,
      sheerForce: statusWithoutBattle.sheerForce,
      dmgBonus: dmgBonus,
    });
  };

  return (
    <div className="rounded-md border border-slate-300 bg-slate-50 p-4">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-[2fr_1fr_2fr]">
        <div className="rounded-md border border-gray-300 p-2">
          <div className="mb-2">
            <h3 className="text-base font-medium mb-2">理想ステ</h3>
            <div className="mx-2 text-xs">
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                  <div>HP</div>
                  <div className="text-right">{Math.ceil(statusWithoutBattle.hp)}</div>
                </div>
                <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                  <div>攻撃力</div>
                  <div className="text-right">{Math.ceil(statusWithoutBattle.atk)}</div>
                </div>
                <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                  <div>会心率</div>
                  <div className="text-right">{Math.round(statusWithoutBattle.critRate * 10) / 10}%</div>
                </div>
                <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                  <div>会心ダメ</div>
                  <div className="text-right">{Math.round(statusWithoutBattle.critDmg * 10) / 10}%</div>
                </div>
                {props.selectedCharacter.role === Role.Attack && (
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>貫通率</div>
                    <div className="text-right">{(is5thPEN ? 24 : 0) + (props.selectedDiscTwo1.twoEffects.PENRate || props.selectedDiscFour1.twoEffects.PENRate || 0)}%</div>
                  </div>
                )}
                {props.selectedCharacter.role === Role.Rupture && (
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>透徹力</div>
                    <div className="text-right">{Math.ceil(statusWithoutBattle.sheerForce)}</div>
                  </div>
                )}
                <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                  <div>属性ダメ</div>
                  <div className="text-right">{Math.round(((props.selectedDiscTwo1.twoEffects.damageBonus || 0) + (props.selectedDiscFour1.twoEffects.damageBonus || 0) + (is5thDmgBuff ? 30 : 0)) * 10) / 10}%</div>
                </div>
              </div>
            </div>
          </div>
          <Accordion title="戦闘中ステ">
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
                {props.selectedCharacter.role === Role.Attack && (
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>貫通率</div>
                    <div className="text-right">{Math.round(statusInBattle.PENRatio * 10) / 10}%</div>
                  </div>
                )}
                {props.selectedCharacter.role === Role.Rupture && (
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>透徹力</div>
                    <div className="text-right">{Math.ceil(statusInBattle.sheerForce)}</div>
                  </div>
                )}
                <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                  <div>属性ダメ</div>
                  <div className="text-right">{Math.round(statusInBattle.dmgBonus * 10) / 10}%</div>
                </div>
              </div>
            </div>
          </Accordion>
          <div className="grid grid-cols-[2fr_1fr_2fr]">
            <div className="text-base font-normal mt-1">火力指数</div>
            <div></div>
            <div className="mx-2 text-right text-lg font-bold font-mono">
              {Math.round(statusInBattle.finalAttackValue * 100) / 100}
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
      <Accordion title="手持ちのステータスと比較">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-[2fr_1.5fr_1.5fr]">
          <div className="rounded-md border border-gray-300 p-2">
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-medium">
                  手持ちのステータス
                  <InfoTooltip>
                    自分のキャラのステータスを入力することで理想配分との比較ができます。<br />
                    もしくは、数値を記録しておくことでディスクセットやサブキャラを跨いだ火力比較ができます。<br />
                    なお、弱点（120%）を想定した計算です。それ以外については「その他バフ」欄の属性耐性無視にマイナスの値を入れてください。
                  </InfoTooltip>
                </h3>
                <button
                  onClick={handleCopyIdealStatus}
                  className="px-3 py-1 border border-blue-500 text-blue-500 rounded text-xs hover:bg-blue-600 transition-colors whitespace-nowrap ml-2"
                >
                  理想ステをコピー
                </button>
              </div>
              <div className="mx-2 text-xs">
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>HP</div>
                    <label htmlFor="userHp" className="sr-only">HP</label>
                    <input id="userHp" type="number" value={userStatus.hp} min="0" onChange={(e) => setUserStatus({...userStatus, hp: Number(e.target.value)})} className="text-right bg-white w-14 border border-gray-400 no-spinner px-1" />
                  </div>
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>攻撃力</div>
                    <label htmlFor="userAtk" className="sr-only">攻撃力</label>
                    <input id="userAtk" type="number" value={userStatus.atk} min="0" onChange={(e) => setUserStatus({...userStatus, atk: Number(e.target.value)})} className="text-right bg-white w-14 border border-gray-400 no-spinner px-1" />
                  </div>
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>会心率</div>
                    <label htmlFor="userCritRate" className="sr-only">会心率</label>
                    <input id="userCritRate" type="number" value={userStatus.critRate} min="0" max="100" onChange={(e) => setUserStatus({...userStatus, critRate: Number(e.target.value)})} className="text-right bg-white w-14 border border-gray-400 no-spinner px-1" />
                  </div>
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>会心ダメ</div>
                    <label htmlFor="userCritDmg" className="sr-only">会心ダメ</label>
                    <input id="userCritDmg" type="number" value={userStatus.critDmg} min="0" onChange={(e) => setUserStatus({...userStatus, critDmg: Number(e.target.value)})} className="text-right bg-white w-14 border border-gray-400 no-spinner px-1" />
                  </div>
                  {props.selectedCharacter.role === Role.Attack && (
                    <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                      <div>貫通率</div>
                      <label htmlFor="userPENRatio" className="sr-only">貫通率</label>
                      <input id="userPENRatio" type="number" value={userStatus.PENRatio} min="0" max="100" onChange={(e) => setUserStatus({...userStatus, PENRatio: Number(e.target.value)})} className="text-right bg-white w-14 border border-gray-400 no-spinner px-1" />
                    </div>
                  )}
                  {props.selectedCharacter.role === Role.Rupture && (
                    <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                      <div>透徹力</div>
                      <label htmlFor="userSheerForce" className="sr-only">透徹力</label>
                      <input id="userSheerForce" type="number" value={userStatus.sheerForce} min="0" onChange={(e) => setUserStatus({...userStatus, sheerForce: Number(e.target.value)})} className="text-right bg-white w-14 border border-gray-400 no-spinner px-1" />
                    </div>
                  )}
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>属性ダメ</div>
                      <label htmlFor="userDmgBonus" className="sr-only">属性ダメ</label>
                      <input id="userDmgBonus" type="number" value={userStatus.dmgBonus} min="0" onChange={(e) => setUserStatus({...userStatus, dmgBonus: Number(e.target.value)})} className="text-right bg-white w-14 border border-gray-400 no-spinner px-1" />
                  </div>
                </div>
              </div>
            </div>
            <Accordion title="戦闘中ステ">
              <div className="mx-2 text-xs">
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>HP</div>
                    <div className="text-right">{Math.ceil(userStatusInBattle.hp)}</div>
                  </div>
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>攻撃力</div>
                    <div className="text-right">{Math.ceil(userStatusInBattle.atk)}</div>
                  </div>
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>会心率</div>
                    <div className="text-right">{Math.round(userStatusInBattle.critRate * 10) / 10}%</div>
                  </div>
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>会心ダメ</div>
                    <div className="text-right">{Math.round(userStatusInBattle.critDmg * 10) / 10}%</div>
                  </div>
                  {props.selectedCharacter.role === Role.Attack && (
                    <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                      <div>貫通率</div>
                      <div className="text-right">{Math.round(userStatusInBattle.PENRatio * 10) / 10}%</div>
                    </div>
                  )}
                  {props.selectedCharacter.role === Role.Rupture && (
                    <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                      <div>透徹力</div>
                      <div className="text-right">{Math.ceil(userStatusInBattle.sheerForce)}</div>
                    </div>
                  )}
                  <div className="grid grid-cols-[2fr_1fr] rounded-md bg-gray-200 px-2 py-0.5">
                    <div>属性ダメ</div>
                    <div className="text-right">{Math.round(userStatusInBattle.dmgBonus * 10) / 10}%</div>
                  </div>
                </div>
              </div>
            </Accordion>
            <div className="grid grid-cols-[2fr_1fr_2fr]">
              <div className="text-base font-normal mt-1">火力指数</div>
              <div></div>
              <div className="mx-2 text-right text-lg font-bold font-mono">
                {Math.round(userStatusInBattle.finalAttackValue * 100) / 100}
              </div>
            </div>
          </div>
          <StatusRecorder
            characterName={props.selectedCharacter.name}
            userAttackValue={userStatusInBattle.finalAttackValue}
            discFourSetId={props.selectedDiscFour1.id}
            discTwoSetId={props.selectedDiscTwo1.id}
            main5thStatusType={mainStatus5thType}
          />
        </div>
      </Accordion>
    </div>
  );
}
