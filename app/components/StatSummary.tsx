import { Character } from "@/types/character";
import { DiscEffect } from "@/types/DiscEffect";
import { EngineEquipment } from "@/types/engineEquipment";

type Props = {
  selectedCharacter: Character;
  selectedEngineEquipment: EngineEquipment;
  selectedDiscFour: DiscEffect;
  // 必要な最小限の入力だけ
};

function calculateSummary(props: Props) {
  // サマリー専用計算
  return {
    attackSubstatCount: 1,
    betterStat: "貫通率",
    equivalentSubstatCount: 54,
  };
}

export default function StatSummary(props: Props) {
  // 👇 ここで X,Y,Z を計算
  const { attackSubstatCount, betterStat, equivalentSubstatCount } = calculateSummary(props);

  /*
    ここでやりたいこと
    ・貫通率か属性ダメかの比較（２セット折枝を外して上回れるか）
      ・サブステいくつ分上がるか or サブステいくつ下がるまで変えたほうが良いか
        ・一旦ディスク4枚の最適サブステの振り分けを算出
        ・サブステ一つあたりの火力貢献度合いを比較
        ・そんなに変わらないか大きく変わるかで考える
    ・サブが雑魚の属性ダメかサブの強いHPか（命破）
    ・防御力の高い敵に関しては貫通率一択
  */
  return (
    <div className="rounded-md border border-slate-300 bg-slate-50 p-4 text-xl text-slate-800">
      <ul className="space-y-2">
        準備中
        {/* <li className="relative pl-4">
          <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-slate-500" />
          攻撃％のサブステ
          <strong>{attackSubstatCount}</strong>
          個以上は
          <strong>{betterStat}</strong>
          の方がよい
        </li>
        <li className="relative pl-4">
          <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-slate-500" />
          メイン攻撃％とメイン
          <strong>{betterStat}</strong>
          の差はサブステおよそ
          <strong>{equivalentSubstatCount}</strong>
          個相当
        </li> */}
      </ul>
    </div>
  );
}
