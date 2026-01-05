"use client";
import { useState, ReactNode, ElementType } from "react";

type AccordionProps = {
  title: string;
  children: ReactNode;
  as?: ElementType; // 見出しタグ変更用
  isDefaultOpen?: boolean;
};

export default function Accordion({
  title,
  children,
  as: Heading = "h3",
  isDefaultOpen = false,
}: AccordionProps) {
  const [open, setOpen] = useState(isDefaultOpen);

  return (
    <div className="border-b border-slate-400 mb-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left py-1 flex items-center justify-between"
      >
        <Heading className="text-base font-medium">{title}</Heading>
        <span
          className={`ml-2 transition-transform text-slate-400 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="pb-4 pl-1">
          {children}
        </div>
      )}
    </div>
  );
}
