'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchParamReader() {
  return useSearchParams();
}
