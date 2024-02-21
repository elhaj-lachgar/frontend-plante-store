import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <>
      <div className="h-[calc(70vh-66px)] flex flex-col gap-y-5 items-center justify-center">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-6xl font-extrabold text-gray-400 ">404</h1>
          <p className="text-lg ">oops! this page could not found</p>
          <Link to={"/"} >
          <Button leftIcon={<Home />} backgroundColor="rgb(59 130 246)" color={"white"}>Back Home</Button>
        </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default NotFound;
