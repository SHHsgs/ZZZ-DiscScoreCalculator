"use client";
import React from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  value: string;
  options: Option[];
  className?: string;
  onChange?: (value: string) => void;
  selected?: string;
};

export default function PullDown({ label, value, onChange, options, className, selected }: Props) {
  return (
    <label className={`flex flex-col ${className ?? ""}`}>
      {label && <span className="mb-1 font-medium">{label}</span>}
      <select
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        disabled={!onChange}
        className={`border p-2 rounded ${!onChange ? "opacity-50 cursor-not-allowed" : ""}`}
        defaultValue={selected}
        id={label}
        name={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
