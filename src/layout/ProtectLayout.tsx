import { Suspense, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar";
import Loading from "../components/Loading";

function ProtectLayout({ children }: { children: React.ReactNode }) {
  const router = useNavigate();
  useLayoutEffect(() => {
    if (!window.localStorage.getItem("user")) {
      router("/");
      return;
    }
  }, []);
  return (
    <main className="flex ">
      <ProfileSideBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}

export default ProtectLayout;
