import PullDown from "@/app/components/PullDown";

const enemyDeffenceValues = [
  { value: "952.8", label: "952.8" }, // 通常のボス
  { value: "1588.0", label: "1588.0" }, // ワンダリングハンター
  { label: "476.4", value: "476.4" } // 原初の悪夢
]

type Props = {
  baseDeffence: string;
  onChange: (value: string) => void;
}

export function EnemyDeffence({ baseDeffence, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-5 mb-4">
      <PullDown label="敵の防御力" value={baseDeffence.toString()} onChange={onChange} options={enemyDeffenceValues} />
      <div className="relative w-4/3 min-h-12 sm:min-h-20"><span className="absolute top-0 sm:top-6 w-full text-xs">2.5の新ボス：476.4<br />ワンダリングハンター：1588<br />その他ボス：952.8</span></div>
    </div>
  );
}