import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import GetAddresses from "../integration/get-address";
import toast from "react-hot-toast";
import CreateCheckout from "../integration/create-checkout";
import Loading from "./Loading";

function ValidateCheckout() {
  const [choisenAddress, setChoisenAdresse] = useState<null | string>(null);
  const [addresse, setAddress] = useState<any>(null);
  const [loading, setLaoding] = useState(false);
  const [floading, setFloading] = useState(true);

  const Fetching = async () => {
    const res = await GetAddresses();
    setFloading(false);
    if (!res) {
      toast.error("same thing goes wrong in fetching addresses");
      return;
    }
    setAddress(res.data);
  };
  useEffect(() => {
    Fetching();
  }, []);

  const CheckoutHandler = async () => {
    if (!choisenAddress) return;
    setLaoding(true);
    const res = await CreateCheckout(choisenAddress);
    if (!res) {
      setLaoding(false);
      toast.error("same thing gose wrong");
      return;
    }
    setLaoding(false);
    location.href = res.url;
  };
  return (
    <div className="flex flex-col gap-y-4 border w-full rounded-lg r">
      <h1 className=" py-3 px-3 font-bold text-gray-600 text-lg">
        Shipping Addresses
      </h1>
      <hr />
      <div className=" py-3 px-3 h-full min-h-[100px] flex flex-col w-full gap-y-4">
        {addresse ? (
          addresse.map((address: any) => (
            <div
              key={address.id}
              className="flex items-center gap-x-3 border px-3 py-2 rounded-lg"
            >
              <input
                type="checkbox"
                className="rounded-full"
                id={address.id}
                onClick={(e) => setChoisenAdresse(e.currentTarget.id)}
                checked={address.id == choisenAddress}
              />
              <div className="fle flex-col gap-y-3 text-gray-500 ">
                <p>{address.city}</p>
                <p>{address.country}</p>
                <p>{address?.street}</p>
              </div>
            </div>
          ))
        ) : floading ? (
          <Loading />
        ) : null}
      </div>
      <hr />
      <div className="py-2 px-3">
        <Link to={"/profile/me"}>
          <Button
            width={"100%"}
            leftIcon={<Plus className="text-blue-700" />}
            color={"rgb(29 78 216)"}
          >
            Add Address
          </Button>
        </Link>
      </div>
      <hr />
      <div className=" py-3 px-3 flex justify-end items-center gap-x-2">
        <Link to={"/shop"}>
          <Button>Back to back</Button>
        </Link>
        <Button
          color={"white"}
          backgroundColor={"rgb(34 197 94)"}
          _hover={{ backgroundColor: "rgb(74 222 128)" }}
          cursor={choisenAddress ? "pointer" : "not-allowed"}
          onClick={CheckoutHandler}
          isLoading={loading}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default ValidateCheckout;
