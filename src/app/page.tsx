"use client";

import { Suspense } from "react";
import HomePageContent from "@/components/HomePageContent";
import HomePageLoading from "@/components/HomePageLoading";

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageLoading />}>
      <HomePageContent />
    </Suspense>
  );
}
