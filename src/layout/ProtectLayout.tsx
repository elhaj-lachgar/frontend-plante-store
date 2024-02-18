import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar";

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
      {children}
    </main>
  );
}

export default ProtectLayout;
