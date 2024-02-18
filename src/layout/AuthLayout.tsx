import React from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/Loading";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center items-center flex-col gap-y-5 min-h-[100vh] bg-gray-50">
      <Suspense fallback={<Loading/>}>
        <Link to={"/"}>
          <Logo />
        </Link>
        {children}
      </Suspense>
    </main>
  );
}

export default AuthLayout;
