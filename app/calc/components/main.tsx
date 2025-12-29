"use client";
import React, { useState } from "react";
import PullDown from "../../components/PullDown";
import characters from "../../data/characters";
import discEffect, { discEffects } from "../../data/discEffects";
import engineEquipments from "../../data/engineEquipments";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import { Role } from "@/types/character";
import { useSearchParams } from "next/navigation";
import Tabs from "../../components/Tabs";
import StatSummary from "@/app/components/StatSummary";
import Accordion from "@/app/components/Accordion";
import { Buff } from "@/types/buff";
import { BuffInput } from "./externalBuffs";

export default function Main() {
  const searchParams = useSearchParams();
  const agentOptions = characters.filter((ch) => [Role.Attack, Role.Rupture].includes(ch.role)).map((ch) => ({ value: ch.name, label: ch.name }));
  const supportAgentOptions = characters.filter((ch) => [Role.Support].includes(ch.role)).map((ch) => ({ value: ch.name, label: ch.name }));
  const stunAgentOptions = characters.filter((ch) => Role.Stun === ch.role).map((ch) => ({ value: ch.name, label: ch.name }));
  const deffenceAgentOptions = characters.filter((ch) => Role.Defense === ch.role).map((ch) => ({ value: ch.name, label: ch.name }));
  const [a, setA] = useState(searchParams.get("agent") ?? agentOptions[0]?.value ?? "");
  const attackEquipmentOptions = engineEquipments.filter((eq) => [Role.Attack, Role.Rupture].includes(eq.role)).map((eq) => ({ value: eq.id ?? eq.name, label: eq.name }));
  const supportEquipmentOptions = engineEquipments.filter((eq) => [Role.Support].includes(eq.role)).map((eq) => ({ value: eq.id ?? eq.name, label: eq.name }));
  const stunEquipmentOptions = engineEquipments.filter((eq) => eq.role == Role.Stun).map((eq) => ({ value: eq.id ?? eq.name, label: eq.name }));
  const deffenceEquipmentOptions = engineEquipments.filter((eq) => eq.role == Role.Defense).map((eq) => ({ value: eq.id ?? eq.name, label: eq.name }));
  const [b, setB] = useState(attackEquipmentOptions.find((ae) => {
    const selectedAgent = characters.find((agent) => agent.name === a);
    return ae.value == selectedAgent?.motif;
  })?.value
  ?? attackEquipmentOptions[0]?.value);
  const [disc1st, setDisc1st] = useState("df-wood");
  const [disc2nd, setDisc2nd] = useState("df-sword");

  const [stunDiscFourSet, setStunDiscFourSet] = useState("df-taizan");
  const [supportDiscFourSet, setSupportDiscFourSet] = useState("df-taizan");

  const [supportAgent, setSupportAgent] = useState("アストラ");
  const [supportEngineEquipment, setSupportEngineEquipment] = useState("ee-lu");
  const [stunAgent, setStunAgent] = useState("ダイアリン");
  const [stunEngineEquipment, setStunEngineEquipment] = useState("ee-dyarin");

  const attackerDiscSets = discEffect.filter((de) => de.role != null && [Role.Attack, Role.Rupture].includes(de.role)).map((de) => ({ value: de.id, label: de.name }));
  const stunDiscSets = discEffect.filter((de) => [Role.Stun, Role.Defense, null].includes(de.role)).map((de) => ({ value: de.id, label: de.name }));
  const supportDiscSets = discEffect.filter((de) => [Role.Support, Role.Defense, null].includes(de.role)).map((de) => ({ value: de.id, label: de.name }));

  const g4Options = [
    { value: "critRate", label: "会心率(24%)" },
    { value: "critDamage", label: "会心ダメージ(48%)" },
    { value: "abnormalMastery", label: "異常マスタリー(92)" },
    { value: "hpPercent", label: "HP(30%)" },
    { value: "atkPercent", label: "攻撃力(30%)" },
    { value: "defPercent", label: "防御力(48%)" },
  ];

  const g5Options = [
    { value: "penetration", label: "貫通率(24%)" },
    { value: "elementalDamage", label: "属性ダメージ(30%)" },
    { value: "hpPercent", label: "HP(30%)" },
    { value: "atkPercent", label: "攻撃力(30%)" },
    { value: "defPercent", label: "防御力(48%)" },
  ];

  const g6Options = [
    { value: "abnormalControl", label: "異常掌握(30%)" },
    { value: "impact", label: "衝撃力(18%)" },
    { value: "energyRegenPercent", label: "エネルギー自動回復(60%)" },
    { value: "hpPercent", label: "HP(30%)" },
    { value: "atkPercent", label: "攻撃力(30%)" },
    { value: "defPercent", label: "防御力(48%)" },
  ];

  const [g4, setG4] = useState(g4Options[0].value);
  const [g5, setG5] = useState(g5Options[0].value);
  const [g6, setG6] = useState(g6Options[0].value);

  function selectAgent(agentName: string) {
    setA(agentName);
    const agent = characters.find((ch) => ch.name === agentName);
    const motif = engineEquipments.find((eq) => eq.id === agent?.motif);
    setB(motif?.id || "ee-ive");
  };
  
  function selectStunAgent(agentName: string) {
    setStunAgent(agentName);
    const agent = characters.find((ch) => ch.name === agentName);
    const motif = engineEquipments.find((eq) => eq.id === agent?.motif);
    setStunEngineEquipment(motif?.id || "ee-dyarin");
  };

  const selectedCharacter = characters.find((ch) => ch.name === a) ?? characters[0];
  const selectedCharacter2 = characters.find((ch) => ch.name === stunAgent) ?? characters[0];
  const selectedCharacter3 = characters.find((ch) => ch.name === supportAgent) ?? characters[0];
  const selectedEngineEquipment = engineEquipments.find((eq) => (eq.id ?? eq.name) === b) ?? engineEquipments[0];
  const selectedEngineEquipment2 = engineEquipments.find((eq) => (eq.id ?? eq.name) === stunEngineEquipment) ?? engineEquipments[0];
  const selectedEngineEquipment3 = engineEquipments.find((eq) => (eq.id ?? eq.name) === supportEngineEquipment) ?? engineEquipments[0];
  const selectedDiscFourSet = discEffects.find((de) => (de.id ?? de.name) === disc1st) ?? discEffects[0];
  const selectedDiscFourSet2 = discEffects.find((de) => de.id === stunDiscFourSet) ?? discEffects[0];
  const selectedDiscFourSet3 = discEffects.find((de) => de.id === supportDiscFourSet) ?? discEffects[0];
  const selectedDiscTwoSet = discEffects.find((de) => (de.id ?? de.name) === disc2nd) ?? discEffects[0];

  const [externalBuffs, setExternalBuffs] = useState<Buff>({
    critRate: 0, // 会心率増加
    critDamage: 0, // 会心ダメージ増加
    damageBonus: 0, // 与ダメージ倍率/加算（%なら 10 -> +10%）
    atkRate: 0, // 攻撃力増加（%）
    atkValue: 0, // 攻撃力増加（固定値）
    resistanceIgnore: 0, // 耐性無視（%）。例: 20 -> 相手の耐性を20%無視
    sheerForce: 0, // 透徹ダメージ（%）
    hpPercent: 0, // HP増加（%）
    hpPercentInBattle: 0, // 戦闘中HP増加（%）
    sheerForcePowerNum: 0, // 透徹力増加（固定値）
    registerDeffence: 0, // 防御無視（%）
    PENRatio: 0, // 貫通率（%）
  });
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ディスクの火力数値化ツール</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 mb-4">
        <div className="relative min-h-[2rem] sm:min-h-0">
          <span className="block text-center sm:absolute sm:bottom-2 sm:left-0 sm:w-full">
            アタッカー
          </span>
        </div>
        <PullDown label="エージェント" value={a} onChange={selectAgent} options={agentOptions} />
        <PullDown label="音動機" value={b} onChange={setB} options={attackEquipmentOptions} />
        <PullDown label="4セット" value={disc1st} onChange={setDisc1st} options={attackerDiscSets} />
        <PullDown label="2セット" value={disc2nd} onChange={setDisc2nd} options={attackerDiscSets} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 mb-4">
        <div className="relative min-h-[2rem] sm:min-h-0">
          <span className="block text-center sm:absolute sm:bottom-2 sm:left-0 sm:w-full">
            撃破・防護
          </span>
        </div>
        <PullDown value={stunAgent} onChange={selectStunAgent} options={stunAgentOptions.concat(deffenceAgentOptions)} />
        <PullDown value={stunEngineEquipment} onChange={setStunEngineEquipment} options={stunEquipmentOptions.concat(deffenceEquipmentOptions)} />
        <PullDown value={stunDiscFourSet} onChange={setStunDiscFourSet} options={stunDiscSets} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 mb-4">
        <div className="relative min-h-[2rem] sm:min-h-0">
          <span className="block text-center sm:absolute sm:bottom-2 sm:left-0 sm:w-full">
            支援・防護
          </span>
        </div>
        <PullDown value={supportAgent} onChange={setSupportAgent} options={supportAgentOptions.concat(deffenceAgentOptions)} />
        <PullDown value={supportEngineEquipment} onChange={setSupportEngineEquipment} options={supportEquipmentOptions.concat(deffenceEquipmentOptions)} />
        <PullDown value={supportDiscFourSet} onChange={setSupportDiscFourSet} options={supportDiscSets} />
      </div>

      <Accordion title="その他バフ">
        <>
          <div className="text-sm opacity-80">凸効果など上記で選択できないものを入力してください。</div>
          <div className="text-sm opacity-80">※一旦防御無視と与ダメだけ対応</div>
          <BuffInput value={externalBuffs} onChange={setExternalBuffs} />
        </>
      </Accordion>

      <h2 className="text-xl font-semibold mt-6 mb-3">メインステの火力上昇率</h2>

      <Tabs
        tabs={[
          {
            id: "barChart", label: "グラフでの比較",
            toolTipText: <>
              ・サブステを含まず、ディスク２セット、４セット効果を含みます。<br />
              ・プルダウンの選択によって目盛りの刻み方が変わることがあります。<br />
              ・4番は会心率が高くなりがちですがサブステの率が腐るのが早くなるので<br />
              　気をつけてください。<br />
              ・貫通率、属性ダメージはグラフの通りですがHP、攻撃、会心ダメ、<br />
              　マスタリーはサブステがあるのでバランスに気をつけてください。<br />
              　（サブステ込みで数値化できるようにしたい）
            </>,
            content: 
              <BarChart
                // highlightIndices: index per group to emphasize (e.g. highlight B in group 4, C in group 5, A in group 6)
                highlightIndices={[]}
                width={700}
                height={300}
                selectedCharacter={selectedCharacter}
                selectedCharacter2={selectedCharacter2}
                selectedCharacter3={selectedCharacter3}
                selectedEngineEquipment={selectedEngineEquipment}
                selectedEngineEquipment2={selectedEngineEquipment2}
                selectedEngineEquipment3={selectedEngineEquipment3}
                selectedDiscFour1={selectedDiscFourSet}
                selectedDiscFour2={selectedDiscFourSet2}
                selectedDiscFour3={selectedDiscFourSet3}
                selectedDiscTwo1={selectedDiscTwoSet}
                externalBuffs={externalBuffs}
              />
          } ,
          { id: "tab2", label: "5番について簡易まとめ", content: 
            <>
              <StatSummary
                selectedCharacter={selectedCharacter}
                // selectedCharacter2={selectedCharacter2}
                // selectedCharacter3={selectedCharacter3}
                selectedEngineEquipment={selectedEngineEquipment}
                // selectedEngineEquipment2={selectedEngineEquipment2}
                // selectedEngineEquipment3={selectedEngineEquipment3}
                selectedDiscFour={selectedDiscFourSet}
                // selectedDiscFour2={selectedDiscFourSet2}
                // selectedDiscFour3={selectedDiscFourSet3}
                // selectedDiscTwo1={selectedDiscTwoSet}
              />
              {/* <div className="opacity-50 text-sm m-1">※メイン貫通率＋２セットパファーとメイン攻撃％＋２セット折枝の比較</div> */}
            </>
          },
        ]}
      />

      <h2 className="text-xl font-semibold mt-6 mb-3">【未実装】メインステータス</h2>
      <span className="text-sm opacity-75">ここを変えても何も起きません</span>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <PullDown label={"1.HP"} value="2200" options={[{ value: "2200", label: "2200" }]} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <PullDown label={"6."} value={g6} onChange={setG6} options={g6Options} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <PullDown label={"2.攻撃"} value="316" options={[{ value: "316", label: "316" }]} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <PullDown label={"5."} value={g5} onChange={setG5} options={g5Options} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <PullDown label={"3.防御"} value="184" options={[{ value: "184", label: "184" }]} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <PullDown label={"4."} value={g4} onChange={setG4} options={g4Options} />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-3">【未実装】サブステの火力上昇率</h2>
      <span className="text-sm opacity-75">個数が増えるほど１つあたりの効果は減少します。</span>
      <LineChart
        series={[
          { name: "Series A", values: [5, 10, 12, 18, 22, 30, 28, 35, 40, 42, 45, 48, 50, 55, 58, 60, 62, 65, 68, 70], color: "#3B82F6" },
          { name: "Series B", values: [2, 6, 8, 10, 12, 14, 18, 20, 22, 25, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46], color: "#F97316" },
        ]}
        xMax={20}
        height={260}
      />
    </div>
  );
}
