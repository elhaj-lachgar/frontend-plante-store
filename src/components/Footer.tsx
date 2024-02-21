import Logo from "./Logo";
import { Social } from "../lib/utils";

function Footer() {
  return (
    <footer className="flex flex-col py-5  gap-y-3  w-full bg-white">
      <div className="flex flex-col gap-y-3 md:items-center px-10">
        <Logo />
        <h1 className="text-gray-500 text-lg font-semibold">Simply Naturel</h1>
        <div className="flex w-[200px] justify-between">
          {Social.map((Icon,i) => (
            <div  key={i} className="bg-gray-500 p-2 rounded cursor-pointer">
              <Icon color="white"  />
            </div>
          ))}
        </div>
      </div>
      <hr/>
      <div className="flex flex-col items-center md:flex-row md:justify-between px-10 gap-y-4 text-gray-500">
            <p>{"Copyright © 2024 Simply Natural"}</p>
            <p>{"Powered by Simply Natural"}</p>
      </div>
    </footer>
  );
}

export default Footer;
