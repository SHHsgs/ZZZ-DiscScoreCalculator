"use client";
import React, { useState } from "react";
import PullDown from "../components/PullDown";
import characters from "../data/characters";
import engineEquipments from "../data/engineEquipments";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import { useSearchParams } from "next/navigation";

export default function CalcPage() {
  const agentOptions = characters.map((ch) => ({ value: ch.name, label: ch.name }));
  const [a, setA] = useState(useSearchParams().get("agent") ?? agentOptions[0]?.value ?? "");
  const equipmentOptions = engineEquipments.map((eq) => ({ value: eq.id ?? eq.name, label: eq.name }));
  const [b, setB] = useState(equipmentOptions[0]?.value ?? "");
  const [c, setC] = useState("opt1");

  const genericOptions = [
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
  ];

  const g4Options = [
    { value: "critRate", label: "会心率" },
    { value: "critDamage", label: "会心ダメージ" },
    { value: "abnormalMastery", label: "異常マスタリー" },
    { value: "hpPercent", label: "HP%" },
    { value: "atkPercent", label: "攻撃力%" },
    { value: "defPercent", label: "防御力%" },
  ];

  const g5Options = [
    { value: "penetration", label: "貫通率" },
    { value: "elementalDamage", label: "属性ダメージ" },
    { value: "hpPercent", label: "HP%" },
    { value: "atkPercent", label: "攻撃力%" },
    { value: "defPercent", label: "防御力%" },
  ];

  const g6Options = [
    { value: "abnormalControl", label: "異常掌握" },
    { value: "impact", label: "衝撃力" },
    { value: "energyRegenPercent", label: "エネルギー自動回復" },
    { value: "hpPercent", label: "HP%" },
    { value: "atkPercent", label: "攻撃力%" },
    { value: "defPercent", label: "防御力%" },
  ];

  const g2 = "316";
  const [g4, setG4] = useState(g4Options[0].value);
  const [g5, setG5] = useState(g5Options[0].value);
  const [g6, setG6] = useState(g6Options[0].value);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">タイトル</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PullDown label="エージェント" value={a} onChange={setA} options={agentOptions} />
        <PullDown label="音動機" value={b} onChange={setB} options={equipmentOptions} />
        <PullDown label="4セット" value={c} onChange={setC} options={genericOptions} />
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-3">タイトル2</h2>

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
      <h2 className="text-xl font-semibold mt-6 mb-3">タイトル3</h2>

      {/* derive selected objects to pass into BarChart */}
      {(() => {
        const selectedCharacter = characters.find((ch) => ch.name === a) ?? null;
        const selectedEngineEquipment = engineEquipments.find((eq) => (eq.id ?? eq.name) === b) ?? null;
        const attackValue2 = Number(g2 || 0);
        return (
          <BarChart
            // highlightIndices: index per group to emphasize (e.g. highlight B in group 4, C in group 5, A in group 6)
            highlightIndices={[4, 2, 0]}
            width={700}
            height={220}
            selectedCharacter={selectedCharacter}
            selectedEngineEquipment={selectedEngineEquipment}
            attackValue2={attackValue2}
          />
        );
      })()}

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
