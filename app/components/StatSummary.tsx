import { SelectedItems } from "@/types/selectedItems";
import { Calculator } from "../calc/components/calculator";
import { DiscSubStatusOptimizer, StatusType } from "../calc/components/discSubStatusOptimizer";

type BuffStatusType = {
  statusType: StatusType,
  buffRate: number,
}

function getSubStatusCountSub(maxRateBuff: number, secondRateBuff: number, optimizer: DiscSubStatusOptimizer): [number, number] {
  const buffRateSub = maxRateBuff / secondRateBuff;
  const maximumSubStatusCount = (() => {
    for (let index = 1; index <= optimizer.subStatusArray.length; index++) { // indexをカウントにしたいので1から
      const subStatusBuffRate = optimizer.subStatusArray.slice(-index).reduce(
        (acc, v) => acc * ((v.buffRate + 100) / 100), 1
      )
      if (subStatusBuffRate >= buffRateSub) {
        return index;
      }
    }
  })();

  const minimumSubStatusCount = (() => {
    let atkSubStatusArray = optimizer.subStatusArray.filter(s => s.maxStatusType === StatusType.AtkRate);
    let critRateSubStatusArray = optimizer.subStatusArray.filter(s => s.maxStatusType === StatusType.CritRate);
    let critDamageSubStatusArray = optimizer.subStatusArray.filter(s => s.maxStatusType === StatusType.CritDmg);
    let hpSubStatusArray = optimizer.subStatusArray.filter(s => s.maxStatusType === StatusType.HpRate);

    let currentBuffRate = 1;
    let count = 1;

    while (atkSubStatusArray.length + critRateSubStatusArray.length + critDamageSubStatusArray.length + hpSubStatusArray.length > 0) {
      count++;
      const atkBuffRateByOne = (() => {
        if (atkSubStatusArray.length > 10) {
          return atkSubStatusArray[atkSubStatusArray.length - 1]?.buffRate || 0
        } else {
          return 0;
        }
      })();
      const critRateBuffRateByOne = (() => {
        if (critRateSubStatusArray.length > 10) {
          return critRateSubStatusArray[critRateSubStatusArray.length - 1]?.buffRate || 0
        } else {
          return 0;
        }
      })();
      const critDamageBuffRateByOne = (() => {
        if (critDamageSubStatusArray.length > 10) {
          return critDamageSubStatusArray[critDamageSubStatusArray.length - 1]?.buffRate || 0
        } else {
          return 0;
        }
      })();
      const hpBuffRateByOne = (() => {
        if (hpSubStatusArray.length > 10) {
          return hpSubStatusArray[hpSubStatusArray.length - 1]?.buffRate || 0
        } else {
          return 0;
        }
      })();
      const sortedBuffStatusTypes = [
        { buffRate: atkBuffRateByOne, statusType: StatusType.AtkRate },
        { buffRate: critRateBuffRateByOne, statusType: StatusType.CritRate },
        { buffRate: critDamageBuffRateByOne, statusType: StatusType.CritDmg },
        { buffRate: hpBuffRateByOne, statusType: StatusType.HpRate }
      ].sort((a, b) => b.buffRate - a.buffRate); // 降順にソート

      if (sortedBuffStatusTypes[0].statusType === StatusType.AtkRate) {
        currentBuffRate *= (atkBuffRateByOne + 100) / 100;
        atkSubStatusArray = atkSubStatusArray.slice(0, -1);
      } else if (sortedBuffStatusTypes[0].statusType === StatusType.CritRate) {
        currentBuffRate *= (critRateBuffRateByOne + 100) / 100;
        critRateSubStatusArray = critRateSubStatusArray.slice(0, -1);
      } else if (sortedBuffStatusTypes[0].statusType === StatusType.CritDmg) {
        currentBuffRate *= (critDamageBuffRateByOne + 100) / 100;
        critDamageSubStatusArray = critDamageSubStatusArray.slice(0, -1);
      } else {
        currentBuffRate *= (hpBuffRateByOne + 100) / 100;
        hpSubStatusArray = hpSubStatusArray.slice(0, -1);
      }
      
      if (currentBuffRate >= buffRateSub) {
        return count;
      } else {
        continue;
      }
    }
    return 9999; // 明らかに変な数字を変えす
  })();

  return [maximumSubStatusCount, minimumSubStatusCount];
}
        

function getStatusTypeName(statusType: StatusType) {
  switch(statusType) {
    case StatusType.AtkRate: return "攻撃力%";
    case StatusType.PENRate: return "貫通率";
    case StatusType.DmgBonus: return "属性ダメージボーナス";
    default: return "[バグってるので教えて]";
  }
}

function calculateSummary(props: SelectedItems) {
  // サマリー専用計算
  /*
    会心について：
      1. 会心率：会心ダメ＝１：２を推奨
      2. 会心率「」%達成を優先。
         サブステの会心率は他の○個分の価値
    5番メインについて：
      1. 最適は「」。
      『』との差はサブステ○個分
      【】との差はサブステ△個分
      2. 最適はサブステヒット数X個から「」、それ未満は『』。
      【】との差はサブステ△個分
   */
  const calculator = new Calculator(props);
  const optimizer5thAtk = new DiscSubStatusOptimizer(props, StatusType.AtkRate);
  const optimizer5thPEN = new DiscSubStatusOptimizer(props, StatusType.PENRate);
  const optimizer5thAtt = new DiscSubStatusOptimizer(props, StatusType.DmgBonus);
  const subStatusRates: {
    subStatusCount: number,
    sortedBuffStatusTypes: BuffStatusType[], // 降順
  }[] = [];
  [20, 25, 30].forEach((subStatusCount) => {
    const finalBuffrate5thAtk = calculator.calculateFinalBuffRate(optimizer5thAtk, subStatusCount);
    const finalBuffrate5thPEN = calculator.calculateFinalBuffRate(optimizer5thPEN, subStatusCount);
    const finalBuffrate5thAtt = calculator.calculateFinalBuffRate(optimizer5thAtt, subStatusCount);
    subStatusRates.push((() => {
      const sortedBuffStatusTypes: BuffStatusType[] = [
        { statusType: StatusType.AtkRate, buffRate: finalBuffrate5thAtk },
        { statusType: StatusType.PENRate, buffRate: finalBuffrate5thPEN },
        { statusType: StatusType.DmgBonus, buffRate: finalBuffrate5thAtt },
      ].sort((a, b) => b.buffRate - a.buffRate); // 火力上昇率の降順にソート
      return { subStatusCount: subStatusCount, sortedBuffStatusTypes: sortedBuffStatusTypes };
    })());
  });

  const recommentTwosetDiscText = ""; // TODO: 2セット推奨ディスクの文章生成

  if (subStatusRates[0].sortedBuffStatusTypes[0].statusType === subStatusRates[1].sortedBuffStatusTypes[0].statusType && subStatusRates[1].sortedBuffStatusTypes[0].statusType === subStatusRates[2].sortedBuffStatusTypes[0].statusType) {
    // どのサブステ数でも優位なメインが同じ場合
    const maxEffectiveSubStatusType = subStatusRates[2].sortedBuffStatusTypes[0]
    const secondEffectiveSubStatusType = subStatusRates[2].sortedBuffStatusTypes[1]
    const maxOptimizer = (() => {
      if (maxEffectiveSubStatusType.statusType === StatusType.AtkRate) {
        return optimizer5thAtk;
      } else if (maxEffectiveSubStatusType.statusType === StatusType.PENRate) {
        return optimizer5thPEN;
      } else {
        return optimizer5thAtt;
      }
    })();

    const [subStatusCountSubMaximum, subStatusCountSubMinimum] = getSubStatusCountSub(maxEffectiveSubStatusType.buffRate, secondEffectiveSubStatusType.buffRate, maxOptimizer);


    const subStatusCountText = (() => {
      // TODO: minimumとmaximumが同じ時の表示修正
      if (subStatusCountSubMaximum < 100) {
        const subStatusCountText = (subStatusCountSubMinimum === subStatusCountSubMaximum) ? subStatusCountSubMinimum : `${subStatusCountSubMinimum}~${subStatusCountSubMaximum}`;
        return <>{getStatusTypeName(secondEffectiveSubStatusType.statusType)}との差はサブステ{subStatusCountText}個分程度。</>
      } else {
        return <>なお、サブステではこの差は埋められない。</>;
      }
    })();
    return <>
      5番の最適は{getStatusTypeName(maxEffectiveSubStatusType.statusType)}。<br />
      {subStatusCountText}<br />
      {recommentTwosetDiscText}
    </>;
  } else {
    return <>
      5番のメインステによる差は誤差程度でしかないため、サブステの良いものを優先。<br />
      {recommentTwosetDiscText}
    </>;
  }

}

export default function StatSummary(props: SelectedItems) {
  // 👇 ここで X,Y,Z を計算
  // const { attackSubstatCount, betterStat, equivalentSubstatCount } = calculateSummary(props);

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
        {calculateSummary(props)}
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
