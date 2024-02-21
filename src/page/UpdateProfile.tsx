import { Button, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  resolvers,
  TUpdateProfileCredentials,
} from "../validator/update-profile-validator";
import { useEffect, useState } from "react";
import { TUser } from "../lib/utils";
import toast from "react-hot-toast";
import UpdateProfileHandler from "../integration/update-profile";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [user, setUser] = useState<null | TUser>(null);
  const [loading, setLoading] = useState(false);
  const [load , setLoad] = useState(false);
  const router = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TUpdateProfileCredentials>({
    resolver: resolvers,
  });

  const SubmitHandler = async (pramas: TUpdateProfileCredentials) => {
    if (!pramas.email && !pramas.profile?.length && !pramas.name) return;
    setLoading(true);
    const res = await UpdateProfileHandler(
      pramas.profile,
      pramas.email,
      pramas.name
    );
    if (!res) {
      setLoading(false);
      toast.error("same thing gose wrong", {
        className: "bg-red-300",
      });
      return;
    } else {
      setLoading(false);
      toast.success("update successful");
      setLoad(!load)
      return;
    }
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
  }, [load]);

  return (
    <div className="border w-[80%] md:w-[500px] md:mt-10  mx-auto mt-5 px-5 py-4 h-fit rounded-lg shadow-md">
      <form
        className="w-11/12  flex flex-col gap-y-5 mx-auto"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <h1 className="font-bold">Update Profile</h1>
        <div className="flex-col gap-y-1">
          <label className="font-medium">Name</label>
          <Input {...register("name")} />
          {errors.name ? (
            <p className="text-red-400">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="flex-col gap-y-1">
          <label className="font-medium">Email</label>
          <Input {...register("email")} />
          {errors.name ? (
            <p className="text-red-400">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="flex-col gap-y-1">
          <label className="font-medium">Avatar</label>
          <div className="flex justify-between w-full items-center gap-x-2">
            <div className="relative rounded-full w-[50px] h-[50px]">
              <img
                src={user?.profile || "/user/avatar.jpg"}
                alt="avatar"
                className="rounded-full border"
              />
            </div>
            <Input type="file" className="w-[75%]" {...register("profile")} />
          </div>
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-400 text-white"
          type="submit"
          isLoading={loading}
          cursor={loading ? "not-allowed" : "pointer"}
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdateProfile;
