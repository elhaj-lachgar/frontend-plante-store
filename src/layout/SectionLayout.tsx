import React from "react";
import Header from "../components/Header";

function SectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}

export default SectionLayout;
