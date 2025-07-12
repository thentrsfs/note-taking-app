'use client';

import { Suspense } from "react";
import AppLayoutClient from "./AppLayoutClient";
import Loading from "@/components/ui/Loading";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <AppLayoutClient>{children}</AppLayoutClient>
    </Suspense>
  );
}
