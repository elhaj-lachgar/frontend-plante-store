import { useEffect, useState } from "react";
import { TAddress, TUser } from "../lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, TrashIcon } from "lucide-react";
import AddAddressModule from "../components/AddAddressModule";
import GetAddresses from "../integration/get-address";
import toast from "react-hot-toast";
import DeleteAddress from "../integration/delete-address";
import cn from "classnames";
import UpdateAddressModule from "../components/UpdateAddressModule";
import { useDispatch } from "react-redux";
import { DeleteAllItems } from "../context/CardFeatures";



function Profile() {

  const dispatch  = useDispatch();
  const [user, setUser] = useState<TUser | null>(null);
  const [address, setAddress] = useState<TAddress[] | null>(null);
  const [pay] = useSearchParams(); 
  if(pay?.get("pay") == "true") {
    dispatch(DeleteAllItems())
  }
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const router = useNavigate();

  const deleteAddress = async (id: string) => {
    if (!id) return;
    setLoading(true);
    const res = await DeleteAddress(id);
    setLoading(false);
    if (!res) {
      toast.error("internal error decalling", { duration: 2000 });
      return;
    }
    setLoad(!load);
  };

  const Fetching = async () => {
    const res = await GetAddresses();
    if (!res) {
      toast.error("same thing goes wrong in fetching addresses");
      return;
    }
    setAddress(res.data);
  };
  useEffect(() => {
    if (!window.localStorage.getItem("user")) {
      router("/");
      return;
    }
    const user = JSON.parse(
      window.localStorage.getItem("user") as string
    ) as TUser;
    setUser(user);
    Fetching();
  }, [load]);
  console.log(address);
  return (
    <div className="flex border  w-[80%] md:w-[70%]  mx-auto flex-col px-3 py-2 md:py-4 mt-10 shadow-md h-fit rounded-lg">
      {user ? (
        <>
          <div className="flex flex-col gap-y-2 ">
            <img
              src={user?.profile || "/user/avatar.jpg"}
              className="w-[40px] h-[40px] rounded-full border"
            />
            <div className="flex flex-col md:flex-row md:gap-x-5 gap-y-2 font-medium text-gray-500">
              <p>
                <span className="text-black font-semibold text-lg">
                  Email :{"  "}
                </span>{" "}
                {user.email.substring(0, 22)}
              </p>
              <p>
                <span className="text-black font-semibold text-lg">
                  Join :{" "}
                </span>{" "}
                {user.createdAt?.split("T")[0]}
              </p>
            </div>
          </div>
          <hr />
          <div className="min-h-[100px] md:min-h-[200px] flex-col gap-y-3 py-3">
            {address ? (
              <>
                {address.map((add) => (
                  <div
                    className="flex items-center py-3 px-3 bg-gray-100 rounded-lg gap-x-3 mt-3 border border-gray-500 justify-between"
                    key={add.id}
                  >
                    <div className="flex gap-x-3 items-center justify-center">
                      <div className="bg-white w-[50px] h-[50px] border-gray-500 flex items-center justify-center rounded-full border  ">
                        <MapPin color="yellow" />
                      </div>
                      <div className="flex flex-col">
                        <p className=" text-muted-foreground">{add.country}</p>
                        <p className=" text-muted-foreground">{add.city}</p>
                        <p className=" text-muted-foreground">{add.street}</p>
                      </div>
                    </div>
                    <div className="gap-x-3 flex items-center">
                      <TrashIcon
                        className={cn(
                          !loading ? "cursor-pointer" : "cursor-not-allowed"
                        )}
                        onClick={() => {
                          deleteAddress(add.id);
                        }}
                      />
                      <UpdateAddressModule
                        currentCity={add.city}
                        currentCodePostal={add.codePostal}
                        currentCountry={add.country}
                        currentStreet={add.street}
                        id={add.id}
                        load={load}
                        setLoad={setLoad}
                        key={add.id}
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <hr />
          <div className="py-2 px-3 mt-2">
            <AddAddressModule setLoad={setLoad} load={load} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Profile;
