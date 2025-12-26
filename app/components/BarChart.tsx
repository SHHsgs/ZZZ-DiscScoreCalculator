"use client";
import React, { useState } from "react";
import { Character, Role } from "../../types/character";
import { EngineEquipment } from "../../types/engineEquipment";
import PullDown from "./PullDown";
import { DiscEffect } from "@/types/DiscEffect";

type Category = { name: string; value: number; color?: string };
type Group = { name: string; categories: Category[] };

type Props = {
  // highlightIndices[i] is the index of category within group i to highlight (optional)
  highlightIndices?: number[];
  width?: number;
  height?: number;
  maxY?: number; // optional override for Y axis max
  // 選択中のキャラクターと装備
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
};

export default function BarChart({ highlightIndices = [], width = 700, height = 300, maxY, selectedCharacter, selectedCharacter2, selectedCharacter3, selectedEngineEquipment, selectedEngineEquipment2, selectedEngineEquipment3, selectedDiscFour1, selectedDiscFour2, selectedDiscFour3, selectedDiscTwo1 }: Props) {
  // 各カテゴリ値はそれぞれ独立した関数で計算する
  function computeG4A() {
    // 会心率
    const baseCritRate = selectedCharacter.baseCritRate + (selectedCharacter.buff.critRate || 0) + (selectedEngineEquipment.advancedStats.critRate || 0) + (selectedEngineEquipment.effects.critRate || 0) + (selectedDiscFour1.twoEffects.critRate || 0) + (selectedDiscFour1.fourEffects.critRate || 0) + (selectedDiscTwo1.twoEffects.critRate || 0)
    + (selectedCharacter2.buff.critRate || 0) + (selectedCharacter2.buff.critRate || 0) + (selectedEngineEquipment2.effects.critRate || 0)
    + (selectedCharacter3.buff.critRate || 0) + (selectedCharacter3.buff.critRate || 0) + (selectedEngineEquipment3.effects.critRate || 0)
    const cridDmg = selectedCharacter.baseCritDamage + (selectedCharacter.buff.critDamage || 0) + (selectedEngineEquipment.advancedStats.critDamage || 0) + (selectedEngineEquipment.effects.critDamage || 0) + (selectedDiscFour1.twoEffects.critDamage || 0) + (selectedDiscFour1.fourEffects.critDamage || 0)
    + (selectedCharacter2.buff.critDamage || 0) + (selectedCharacter2.buff.critDamage || 0) + (selectedEngineEquipment2.advancedStats.critDamage || 0) + (selectedEngineEquipment2.effects.critDamage || 0)
    + (selectedCharacter3.buff.critDamage || 0) + (selectedCharacter3.buff.critDamage || 0) + (selectedEngineEquipment2.advancedStats.critDamage || 0) + (selectedEngineEquipment3.effects.critDamage || 0)
    return (1 + ((baseCritRate + 24) / 100) * (cridDmg / 100)) / (1 + (baseCritRate / 100) * (cridDmg / 100)) * 100 - 100;
  }
  function computeG4B() {
    // 会心ダメ
    const critRate = selectedCharacter.baseCritRate + (selectedCharacter.buff.critRate || 0) + (selectedEngineEquipment.advancedStats.critRate || 0) + (selectedEngineEquipment.effects.critRate || 0) + (selectedDiscFour1.twoEffects.critRate || 0) + (selectedDiscFour1.fourEffects.critRate || 0)
    + (selectedCharacter2.buff.critRate || 0) + (selectedCharacter2.buff.critRate || 0) + (selectedEngineEquipment2.advancedStats.critRate || 0) + (selectedEngineEquipment2.effects.critRate || 0)
    + (selectedCharacter3.buff.critRate || 0) + (selectedCharacter3.buff.critRate || 0) + (selectedEngineEquipment2.advancedStats.critRate || 0) + (selectedEngineEquipment3.effects.critRate || 0)
    const baseCridDmg = selectedCharacter.baseCritDamage + (selectedCharacter.buff.critDamage || 0) + (selectedEngineEquipment.advancedStats.critDamage || 0) + (selectedEngineEquipment.effects.critDamage || 0) + (selectedDiscFour1.twoEffects.critDamage || 0) + (selectedDiscFour1.fourEffects.critDamage || 0)
    + (selectedCharacter2.buff.critDamage || 0) + (selectedCharacter2.buff.critDamage || 0) + (selectedEngineEquipment2.advancedStats.critDamage || 0) + (selectedEngineEquipment2.effects.critDamage || 0)
    + (selectedCharacter3.buff.critDamage || 0) + (selectedCharacter3.buff.critDamage || 0) + (selectedEngineEquipment2.advancedStats.critDamage || 0) + (selectedEngineEquipment3.effects.critDamage || 0)
    return (1 + (critRate / 100) * ((baseCridDmg + 48) / 100)) / (1 + (critRate / 100) * (baseCridDmg / 100)) * 100 - 100;
  }
  function computeG4M() { return 0; } // 異常マスタリー
  function computeG4C() { return computeG5HP(); }
  function computeG4D() { return computeG5Atk(); }
  function computeG4E() { return computeG5Def(); }

  const [baseDiffence, setBaseDiffence] = useState("952.8");
  function computeG5Pierce(PENRetio: number) {
    // 22 貫通率 2セット効果込み（24+8=32%）
    if (selectedCharacter.role === Role.Rupture) {
      return 0;
    }
    const registerDeffence = selectedCharacter.buff.registerDeffence || 0 + (selectedCharacter2.buff.registerDeffence || 0) + (selectedCharacter3.buff.registerDeffence || 0)
    + (selectedEngineEquipment.effects.registerDeffence || 0) + (selectedEngineEquipment2.effects.registerDeffence || 0) + (selectedEngineEquipment3.effects.registerDeffence || 0);
    const beforeDiffence = parseFloat(baseDiffence) * (1 - registerDeffence / 100);
    const afterDiffence = parseFloat(baseDiffence) * (1 - registerDeffence / 100) * (1 - PENRetio / 100); // ここで貫通値は扱わない
    return (794 / (794 + afterDiffence)) / (794 / (794 + beforeDiffence)) * 100 - 100;
  }
  function computeG5AttrDmg() {
    // 28 属性ダメージ
    const beforeDmgBonus = 100 + (selectedCharacter.buff.damageBonus || 0) // 自己バフ
    + (selectedCharacter2.buff.damageBonus || 0) // 撃破バフ
    + (selectedCharacter3.buff.damageBonus || 0) // 支援バフ
    + (selectedDiscFour2.fourEffects.damageBonus || 0) // 撃破ディスク4セット効果
    + (selectedDiscFour3.fourEffects.damageBonus || 0) // 支援ディスク4セット効果
    + ((selectedEngineEquipment.attributes.includes(selectedCharacter.attribute) || selectedEngineEquipment.attributes.length === 0)
      ? (selectedEngineEquipment.effects.damageBonus || 0)
      : 0) // アタッカーの音動機効果、属性が対応していれば加算
    + ((selectedEngineEquipment2.attributes.includes(selectedCharacter.attribute) || selectedEngineEquipment2.attributes.length === 0)
      ? (selectedEngineEquipment2.effects.damageBonus || 0)
      : 0) // 撃破の音動機効果、属性が対応していれば加算
    + ((selectedEngineEquipment3.attributes.includes(selectedCharacter.attribute) || selectedEngineEquipment3.attributes.length === 0)
      ? (selectedEngineEquipment3.effects.damageBonus || 0)
      : 0); // 支援の音動機効果、属性が対応していれば加算
    const afterDmgBonus = 100 + (selectedCharacter.buff.damageBonus || 0)
    + (selectedCharacter2.buff.damageBonus || 0)
    + (selectedCharacter3.buff.damageBonus || 0)
    + (selectedDiscFour2.fourEffects.damageBonus || 0)
    + (selectedDiscFour3.fourEffects.damageBonus || 0)
    + ((selectedEngineEquipment.attributes.includes(selectedCharacter.attribute) || selectedEngineEquipment.attributes.length === 0)
      ? (selectedEngineEquipment.effects.damageBonus || 0)
      : 0)
    + ((selectedEngineEquipment2.attributes.includes(selectedCharacter.attribute) || selectedEngineEquipment2.attributes.length === 0)
      ? (selectedEngineEquipment2.effects.damageBonus || 0)
      : 0)
    + ((selectedEngineEquipment3.attributes.includes(selectedCharacter.attribute) || selectedEngineEquipment3.attributes.length === 0)
      ? (selectedEngineEquipment3.effects.damageBonus || 0)
      : 0)
    + 30; // 5番メイン 固定 30%
    return (afterDmgBonus / beforeDmgBonus) * 100 - 100;
  }
  function computeG5HP() {
    if (selectedCharacter?.role !== Role.Rupture) {
      return 0;
    }
    const baseHp = selectedCharacter?.baseHp ?? 0;
    const bonusHpNumMain = 2200;
    const bosusHpRateMain = 30; // 5番メイン 固定 30%
    const bonusAttackNumMain = 316;
    const hpPercentInBattle = selectedCharacter.buff.hpPercentInBattle || 0 + (selectedCharacter2.buff.hpPercentInBattle || 0) + (selectedCharacter3.buff.hpPercentInBattle || 0);

    const bonusHpRate = (selectedEngineEquipment?.advancedStats?.hp ?? 0) + ((selectedDiscFour1.id === "df-ungaku") ? 10 : 0);
    const beforeHp = (baseHp * (1 + (bonusHpRate) / 100) + bonusHpNumMain) * (1 + hpPercentInBattle / 100);
    const afterHp = (baseHp * (1 + (bosusHpRateMain + bonusHpRate) / 100) + bonusHpNumMain) * (1 + hpPercentInBattle / 100); // メイン30%追加

    const atkPercentInBattle = selectedCharacter.buff.atkRate || 0 + (selectedCharacter2.buff.atkRate || 0) + (selectedCharacter3.buff.atkRate || 0)
    + (selectedEngineEquipment.effects.atk || 0) + (selectedEngineEquipment2.effects.atk || 0) + (selectedEngineEquipment3.effects.atk || 0)
    + (selectedDiscFour1.fourEffects.atk || 0) + (selectedDiscFour2.fourEffects.atk || 0) + (selectedDiscFour3.fourEffects.atk || 0);
    const atk = (((selectedCharacter?.baseAtk ?? 0) + (selectedEngineEquipment?.baseAttack ?? 0) + bonusAttackNumMain))
    * (1 + atkPercentInBattle / 100)
    + (selectedCharacter2?.buff?.atkValue || 0)
    + (selectedCharacter3?.buff?.atkValue || 0);

    const beforeSheerForce = beforeHp * 0.1 + atk * 0.3 + (selectedCharacter2?.buff?.sheerForcePowerNum || 0) + (selectedCharacter3?.buff?.sheerForcePowerNum || 0);
    const afterSheerForce = afterHp * 0.1 + atk * 0.3 + (selectedCharacter2?.buff?.sheerForcePowerNum || 0) + (selectedCharacter3?.buff?.sheerForcePowerNum || 0);
    return (afterSheerForce / beforeSheerForce) * 100 - 100;
  } // 26 HP%
  function computeG5Atk() {
    // 攻撃力% の計算:
    // baseAttack: 選択キャラの baseAtk
    // bonusAttackRate: 5番メイン 固定 30%
    // bonusAttackNumMain: 2番メイン 固定 316
    // eeBaseAttack: 選択した音動機の基礎ステ
    // eeAdvancedAttackRate: 選択 EngineEquipment の advancedStats?.atk（% として扱う）
    const baseAttack = selectedCharacter?.baseAtk ?? 0;
    const bonusAttackRate = 30;
    const bonusAttackNumMain = 316;
    const eeBaseAttack = selectedEngineEquipment?.baseAttack ?? 0;
    const eeAdvancedAttackRate = selectedEngineEquipment?.advancedStats?.atk ?? 0;

    const atkPercentInBattle = selectedCharacter.buff.atkRate || 0 + (selectedCharacter2.buff.atkRate || 0) + (selectedCharacter3.buff.atkRate || 0)
    + (selectedEngineEquipment.effects.atk || 0) + (selectedEngineEquipment2.effects.atk || 0) + (selectedEngineEquipment3.effects.atk || 0)
    + (selectedDiscFour1.fourEffects.atk || 0) + (selectedDiscFour2.fourEffects.atk || 0) + (selectedDiscFour3.fourEffects.atk || 0);

    const beforeAtk = ((baseAttack + eeBaseAttack) * (1 + eeAdvancedAttackRate / 100) + bonusAttackNumMain)
    * (1 + atkPercentInBattle / 100)
    + (selectedCharacter2?.buff?.atkValue || 0) + (selectedCharacter3?.buff?.atkValue || 0);
    const afterAtk = ((baseAttack + eeBaseAttack) * (1 + (bonusAttackRate + eeAdvancedAttackRate) / 100) + bonusAttackNumMain)
    * (1 + atkPercentInBattle / 100)
    + (selectedCharacter2?.buff?.atkValue || 0) + (selectedCharacter3?.buff?.atkValue || 0);
    if (selectedCharacter?.role === Role.Rupture) {
      const bonusHpNumMain = 2200;
      const hp = (selectedCharacter?.baseHp ?? 0) * (1 + (selectedEngineEquipment?.advancedStats?.hp ?? 0) / 100) + bonusHpNumMain;
      const beforeSheerForce = hp * 0.1 + beforeAtk * 0.3;
      const afterSheerForce = hp * 0.1 + afterAtk * 0.3;
      return afterSheerForce/beforeSheerForce * 100 - 100;
    } else {
      return afterAtk/beforeAtk * 100 - 100;
    }
  }
  function computeG5Def() { return 0; } // 15 防御力%

  function computeG6A() { return 2 + 12; } // 32
  function computeG6B() { return 1 + 13; } // 25
  function computeG6C() { return 1 + 15; } // 30

  const groups: Group[] = [
    { name: "4番", categories: [
      { name: "会心率", value: computeG4A() },
      { name: "会心ダメージ", value: computeG4B() },
      { name: "異常マスタリー", value: computeG4M() },
      { name: "HP%", value: computeG4C() },
      { name: "攻撃力%", value: computeG4D() },
      { name: "防御力%", value: computeG4E() },
    ]},
    { name: "5番", categories: [
      { name: "貫通率(2セットあり)", value: computeG5Pierce(24 + 8) },
      { name: "貫通率(2セットなし)", value: computeG5Pierce(24) },
      { name: "属性ダメージ", value: computeG5AttrDmg() },
      { name: "HP%", value: computeG5HP() },
      { name: "攻撃力%", value: computeG5Atk() },
      { name: "防御力%", value: computeG5Def() },
    ]},
    { name: "6番", categories: [
      { name: "A", value: computeG6A() },
      { name: "B", value: computeG6B() },
      { name: "C", value: computeG6C() },
    ]},
  ];
  const padding = { top: 12, right: 12, bottom: 48, left: 40 };
  const innerW = width - padding.left - padding.right;
  const innerH = (height - padding.top - padding.bottom) * 0.65;

  // compute global max
  const dataMax = Math.max(0, ...groups.flatMap((g) => g.categories.map((c) => c.value)));
  const yMax = maxY && maxY > dataMax ? maxY : Math.ceil((dataMax || 10) / 10) * 10;

  const groupCount = groups.length;
  // Allow custom larger gaps between groups; increase gaps particularly between group 0-1 and 1-2
  const gaps: number[] = Array.from({ length: Math.max(0, groupCount - 1) }).map((_, i) => {
    // make gaps after group 0 and 1 larger to separate groups 4-5 and 5-6 visually
    if (i === 0 || i === 1) return 56; // larger gap between group 0-1 and 1-2
    return 20; // default small gap
  });
  const totalGaps = gaps.reduce((s, v) => s + v, 0);
  const groupWidth = (innerW - totalGaps) / groupCount;

  // helper: convert hex (#rrggbb or #rgb) to HSL
  function hexToHsl(hex: string) {
    const h = hex.replace("#", "");
    const bigint = h.length === 3
      ? parseInt(h.split("").map((c) => c + c).join(""), 16)
      : parseInt(h, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hh = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          hh = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          hh = (b - r) / d + 2;
          break;
        case b:
          hh = (r - g) / d + 4;
          break;
      }
      hh = hh * 60;
    }
    return { h: Math.round(hh), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  // Determine a uniform bar width that fits all groups: base per-group available width,
  // then scale down (previous behavior used *0.2). We compute per-group base and take the minimum.
  const catGap = 12;
  const perGroupBaseWidths = groups.map((g) => {
    const cnt = g.categories.length;
    return (groupWidth - catGap * (cnt - 1)) / cnt;
  });
  const minBase = Math.min(...perGroupBaseWidths);
  // Double the previous width: previous used *0.2 and min 6px — now use *0.4 and min 12px
  const uniformCatWidth = Math.max(12, minBase * 0.4);

  function yForValue(v: number) {
    const ratio = Math.max(0, Math.min(1, v / yMax));
    return padding.top + (1 - ratio) * innerH;
  }

  return (
    <div className="w-full overflow-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 mb-4">
        <PullDown label="敵の防御力" value={baseDiffence.toString()} onChange={setBaseDiffence} options={[{ value: "952.8", label: "952.8" }, { value: "1588.0", label: "1588.0" }]} />
        <div className="relative w-4/3"><span className="absolute bottom-2 w-full text-xs">通常の敵は952.8。<br />ワンダリングハンターのみ1588。</span></div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Bar chart">
          <defs>
            <style>{`.axis{stroke:#9ca3af;stroke-width:1}.label{fill:#6b7280;font-size:12px;font-family:Inter,Arial,sans-serif}`}</style>
          </defs>

        {/* y grid and labels */}
        {Array.from({ length: 5 + 1 }).map((_, i) => {
          const v = Math.round((yMax / 5) * i);
          const y = yForValue(v);
          return (
            <g key={i}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#333333" strokeWidth={0.5} />
              <text className="label" x={padding.left - 8} y={y + 4} textAnchor="end">
                {v}
              </text>
            </g>
          );
        })}

        {/* x axis groups and bars */}
        {groups.map((g, gi) => {
          // compute group X by adding group widths and the variable gaps before this group
          const sumGapsBefore = gi > 0 ? gaps.slice(0, gi).reduce((s, v) => s + v, 0) : 0;
          const gx = padding.left + gi * groupWidth + sumGapsBefore;
          const cats = g.categories;
          const catCount = cats.length;
          // Use uniformCatWidth computed above so all groups have same bar width
          const catWidth = uniformCatWidth;
          const groupInnerTotalWidth = catCount * catWidth + (catCount - 1) * catGap;
          const offset = Math.max(0, (groupWidth - groupInnerTotalWidth) / 2);
          return (
            <g key={g.name}>
              {/* group label: 下方向に余白を確保（全グループ共通） */}
              <text className="label" x={gx + groupWidth / 2} y={padding.top + 20} textAnchor="middle">
                {g.name}
              </text>

              {/* bars */}
              {cats.map((c, ci) => {
                const bx = gx + offset + ci * (catWidth + catGap);
                const by = yForValue(c.value);
                const bh = padding.top + innerH - by;
                const isHighlighted = highlightIndices[gi] === ci;
                // preserve hue; adjust saturation/lightness to emphasize highlighted bars
                let baseH = (ci * 60) % 360;
                let baseS = 70;
                let baseL = 55;
                if (c.color) {
                  try {
                    const hsl = hexToHsl(c.color);
                    baseH = hsl.h;
                    baseS = hsl.s;
                    baseL = hsl.l;
                  } catch (e) {
                    // keep defaults if parsing fails
                  }
                }

                let displayS: number;
                let lightness: number;
                let opacity = 1;
                let stroke: string | undefined = undefined;
                let strokeWidth: number | undefined = undefined;

                if (isHighlighted) {
                  // Make highlighted bars noticeably stronger: increase saturation more and make darker.
                  displayS = Math.min(100, Math.round(baseS * 1.25));
                  lightness = Math.max(4, baseL - 28);
                  opacity = 1;
                  stroke = `hsl(${baseH} ${Math.min(100, Math.round(baseS * 1.25))}% ${Math.max(2, lightness - 14)}%)`;
                  strokeWidth = 1.5;
                } else {
                  // De-emphasize non-highlighted bars: keep them visible but a bit more muted (not too faint)
                  displayS = Math.max(12, Math.round(baseS * 0.55));
                  lightness = Math.min(92, baseL + 12);
                  opacity = 0.65;
                }

                const fill = `hsl(${baseH} ${displayS}% ${lightness}%)`;

                return (
                  <g key={c.name}>
                    <rect
                      x={bx}
                      y={by}
                      width={catWidth}
                      height={bh}
                      fill={fill}
                      opacity={opacity}
                      rx={3}
                      {...(stroke ? { stroke, strokeWidth } : {})}
                    />
                    {/* category label: 全グループで右90°回転（縦書き相当） */}
                    <text
                      className="label text-sm"
                      x={bx + catWidth / 2}
                      y={padding.top + innerH + 26}
                      textAnchor="start"
                      transform={`rotate(90 ${bx + catWidth / 2} ${padding.top + innerH + 18})`}
                    >
                      {c.name}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
