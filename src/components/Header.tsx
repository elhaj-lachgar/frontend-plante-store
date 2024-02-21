import Logo from "./Logo";
import { AlignJustifyIcon } from "lucide-react";
import { ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { HeaderItems, TUser } from "../lib/utils";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../context/CardStore";
import { Button } from "@chakra-ui/react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const { cardItems } = useSelector((state: RootState) => state.card);

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") as string) as TUser);
    }
  }, []);
  return (
    <nav
      className={cn(
        "flex items-center py-4 w-full md:w-10/12 lg:w-9/12 mx-auto   justify-between relative top-0 z-10  ",
        isOpen ? "flex-col" : ""
      )}
    >
      <div className="w-full flex justify-between items-center px-2">
        <Link
          to={"/"}
          className="flex gap-x-2 items-center text-xl font-mono"
        >
          <Logo />
          Simply Natural
        </Link>
        <div className="flex gap-x-3 items-center">
          <div className="hidden md:flex items-center gap-x-3">
            {HeaderItems.map((item, index) => (
              <>
                <Link
                  to={item.link}
                  key={item.name}
                  className="hover:text-blue-400 font-medium"
                >
                  {item.name}
                </Link>
                {index != 2 ? <hr /> : null}
              </>
            ))}
          </div>
          {user ? (
            <Link to={"/profile/me"}>
              <img
                src={user?.profile || "/user/avatar.jpg"}
                alt="avatar"
                className="w-[30px] h-[30px] rounded-full"
              />
            </Link>
          ) : (
            <Link to={"/sign-in"}>
              <Button
                color={"white"}
                size={"sm"}
                backgroundColor={"rgb(74 222 128 )"}
                _hover={{ backgroundColor: "rgb(74 222 128 )" }}
              >
                Sign In
              </Button>
            </Link>
          )}

          <div className="relative">
            <Link to={`/cart`}>
              <ShoppingBasket
                className="font-medium text-blue-500 cursor-pointer "
                size={35}
              />
            </Link>
            <span className="absolute top-[-5px] right-[-2px] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-gray-300 text-blue-400">
              {cardItems.length}
            </span>
          </div>
          <AlignJustifyIcon
            className="block md:hidden"
            size={35}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
      <div
        className={cn(
          isOpen ? "flex flex-col gap-y-3 bg-white w-full px-2 py-4" : "hidden"
        )}
      >
        {HeaderItems.map((item, index) => (
          <>
            <Link to={item.link} key={item.name}>
              {item.name}
            </Link>
            {index != 2 ? <hr /> : null}
          </>
        ))}
      </div>
    </nav>
  );
}

export default Header;
