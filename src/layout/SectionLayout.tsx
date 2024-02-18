import React from "react";
import Header from "../components/Header";
import { Suspense } from "react";
import Loading from "../components/Loading";

function SectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}

export default SectionLayout;
