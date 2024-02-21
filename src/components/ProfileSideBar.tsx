import { Link, useNavigate } from "react-router-dom";
import { SideBarItems } from "../lib/utils";
import { LogOut } from "lucide-react";

function ProfileSideBar() {
  const router = useNavigate();

  const LogOutHandler = ()=>{
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token");
    router("/sign-in");
  }
  return (
    <div className="w-[34px] md:w-[200px] gap-y-5 flex flex-col pt-5 md:px-3 md:pt-10 bg-gray-50 top-0 sticky min-h-[600px] border">
      {SideBarItems.map((ele) => (
        <Link
          key={ele.name}
          to={ele.link}
          className="w-full flex justify-center md:items-center md:justify-between md:p-2 p-1 hover:bg-blue-100 rounded-lg"
        >
          <p className="hidden md:block">{ele.name}</p>
          <ele.icon />
        </Link>
      ))}
      <div
        className="w-full font-bold text-red-500 flex justify-center md:items-center md:justify-between md:p-2 p-1 hover:bg-blue-100 rounded-lg cursor-pointer"
        onClick={LogOutHandler}
      >
        <p className="hidden md:block ">Log Out</p>
        <LogOut />
      </div>
    </div>
  );
}

export default ProfileSideBar;
