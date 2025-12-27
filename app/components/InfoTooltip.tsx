"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  width?: number;
};

export default function InfoTooltip({ children: content }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 外側クリックで閉じる
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-flex items-baseline">
      {/* アイコン */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-400 text-xs font-bold text-white hover:bg-slate-500"
      >
        ?
      </button>

      {/* 吹き出し */}
      {open && (
        <div
          className={`
            absolute left-full bottom-0 z-50 ml-2 w-128
            rounded-md border border-slate-400
            bg-slate-200 p-3 text-sm text-slate-900
            shadow-lg font-normal text-left
          `}
        >
          {/* 縁付き三角（下端基準） */}
          <div
            className="
              absolute -left-[5px] bottom-2
              h-3 w-3 rotate-45
              border-l border-b border-slate-400
              bg-slate-200
            "
          />

          {content}
        </div>
      )}
    </div>
  );
}
