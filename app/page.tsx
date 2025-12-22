import { Attribute, Role } from "@/types/character";
import characters from "./data/characters";
import Link from "next/link";

function renderAgentList(options: { value: string; label: string }[]) {
  return options.map((agent) => (<div key={agent.label}><Link href={{pathname: "/calc", query: {agent: agent.value}}} className="underline">{agent.label}</Link></div>));
}

export default function Home() {
  // 属性別のキャラクターリストを生成（アタッカーのみ）
  const agentOptionsPhysical = characters.filter((ch) => ch.attribute === Attribute.Physical && [Role.Attack, Role.Rupture].includes(ch.role)).map((ch) => ({ value: ch.name, label: ch.name }));
  const agentOptionsFire = characters.filter((ch) => ch.attribute === Attribute.Fire && [Role.Attack, Role.Rupture].includes(ch.role)).map((ch) => ({ value: ch.name, label: ch.name }));
  const agentOptionsIce = characters.filter((ch) => ch.attribute === Attribute.Ice && [Role.Attack, Role.Rupture].includes(ch.role)).map((ch) => ({ value: ch.name, label: ch.name }));
  const agentOptionsElectric = characters.filter((ch) => ch.attribute === Attribute.Electric && [Role.Attack, Role.Rupture].includes(ch.role)).map((ch) => ({ value: ch.name, label: ch.name }));
  const agentOptionsEther = characters.filter((ch) => ch.attribute === Attribute.Ether && [Role.Attack, Role.Rupture].includes(ch.role)).map((ch) => ({ value: ch.name, label: ch.name }));
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">タイトル</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
        {/* 左上 */}
        <div className="mb-8">
          <div className="h-10 w-full bg-yellow-400 flex items-center px-4 font-bold">
            物理
          </div>
          <div className="h-32 w-full mt-4 px-4">
            {renderAgentList(agentOptionsPhysical)}
          </div>
        </div>

        {/* 右上 */}
        <div className="mb-8">
          <div className="h-10 w-full bg-red-500 flex items-center px-4 font-bold">
            炎
          </div>
          <div className="h-32 w-full mt-4">
            {renderAgentList(agentOptionsFire)}
          </div>
        </div>

        {/* 左中央 */}
        <div className="mb-8">
          <div className="h-10 w-full bg-cyan-400 flex items-center px-4 font-bold">
            氷
          </div>
          <div className="h-32 w-full mt-4">
            {renderAgentList(agentOptionsIce)}
          </div>
        </div>

        {/* 右中央 */}
        <div className="mb-8">
          <div className="h-10 w-full bg-blue-500 flex items-center px-4 font-bold">
            電気
          </div>
          <div className="h-32 w-full mt-4">
            {renderAgentList(agentOptionsElectric)}
          </div>
        </div>

        {/* 左下 */}
        <div className="mb-8">
          <div className="h-10 w-full bg-pink-500 flex items-center px-4 font-bold">
            エーテル
          </div>
          <div className="h-32 w-full mt-4">
            {renderAgentList(agentOptionsEther)}
          </div>
        </div>
      </div>
    </div>
  );
}
