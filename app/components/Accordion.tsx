"use client";
import { useState, ReactNode, ElementType } from "react";

type AccordionProps = {
  title: string;
  children: ReactNode;
  as?: ElementType; // 見出しタグ変更用
};

export default function Accordion({
  title,
  children,
  as: Heading = "h3",
}: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-400">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left py-1 flex items-center justify-between"
      >
        <Heading className="text-base font-medium">{title}</Heading>
        <span
          className={`ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="pb-4 pl-1 text-sm text-slate-700">
          {children}
        </div>
      )}
    </div>
  );
}
