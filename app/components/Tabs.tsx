"use client";
import InfoTooltip from "@/app/components/InfoTooltip";
import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  toolTipText?: React.ReactNode
  content: React.ReactNode;
};

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);

  return (
    <div>
      {/* タブヘッダー */}
      <div className="flex border-b border-slate-400">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`
              px-4 py-2 -mb-px text-sm
              border-b-2 transition
              ${
                activeId === tab.id
                  ? "border-blue-800 text-blue-800 font-bold"
                  : "border-transparent text-slate-500 hover:text-slate-700 font-medium"
              }
            `}
          >
            {tab.label}
            {(tab.toolTipText !== undefined) ? <InfoTooltip>{tab.toolTipText}</InfoTooltip> : null}
          </button>
        ))}
      </div>

      {/* タブ内容 */}
      <div className="pt-4">
        {tabs.find((t) => t.id === activeId)?.content}
      </div>
    </div>
  );
}
