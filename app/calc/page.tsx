"use client";
import React, { Suspense } from "react";
import Main from "./components/main";

export default function CalcPage() {
  return (
    <Suspense fallback={null}>
      <Main />
    </Suspense>
  );
}
