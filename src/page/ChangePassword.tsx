import { Button, Input } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  resolvers,
  TChangePasswordCredentials,
} from "../validator/change-password-validator";
import cn from "classnames";
import ChangePasswordHandler from "../integration/change-password";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ChangePassword() {
  const [status, setStatus] = useState(false);
  const [newstatus, setNewStatus] = useState(false);
  const [confirmedstatus, setConfirmedStatus] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [ loading , setLoading] = useState(false);
  const router = useNavigate()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TChangePasswordCredentials>({
    resolver: resolvers,
  });

  const HandleSubmit = async (params: TChangePasswordCredentials) => {
    if (params.confirmPassword != params.newPassword) {
      setError("Confirm Password is incorrect");
      return;
    }
    setLoading(true);
    const res = await ChangePasswordHandler(
      params.currentPassword,
      params.newPassword,
      params.confirmPassword
    );
    if(!res){
      setLoading(false);
      toast.error("current password incorrecte",{
        className : "bg-red-300"
      })
      return;
    }
    else{
      setLoading(false);
      toast.success("change password  successful");
      router("/sign-in");
      return;
    }
  };

  return (
    <div className="border w-[80%] md:w-[500px] md:mt-10  mx-auto mt-5 px-5 py-4 h-fit rounded-lg shadow-md">
      <form
        className="w-11/12 mx-auto flex flex-col gap-y-5"
        onSubmit={handleSubmit(HandleSubmit)}
      >
        <h1 className="font-bold">Update Password</h1>
        <div className="relative flex-col gap-y-1">
          <label>current password</label>
          <Input
            type={status ? "text" : "password"}
            {...register("currentPassword")}
          />
          {errors.currentPassword ? (
            <p className="text-red-400">{errors.currentPassword.message}</p>
          ) : null}
          <div
            className={cn(
              !errors.currentPassword
                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[-50px] lg:top-[-30px]"
            )}
          >
            <EyeOff
              className={status ? "block" : "hidden"}
              onClick={() => setStatus(!status)}
            />
            <Eye
              className={status ? "hidden" : "block"}
              onClick={() => setStatus(!status)}
            />
          </div>
        </div>
        <div className="relative flex-col gap-y-1">
          <label>new password</label>
          <Input
            type={newstatus ? "text" : "password"}
            {...register("newPassword")}
          />
          {errors.newPassword ? (
            <p className="text-red-400">{errors.newPassword.message}</p>
          ) : null}
          <div
            className={cn(
              !errors.newPassword
                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[-50px] lg:top-[-30px]"
            )}
          >
            <EyeOff
              className={newstatus ? "block cursor-pointer z-10" : "hidden"}
              onClick={() => setNewStatus(!newstatus)}
            />
            <Eye
              className={newstatus ? "hidden" : "block cursor-pointer z-10"}
              onClick={() => setNewStatus(!newstatus)}
            />
          </div>
        </div>
        <div className="relative flex-col gap-y-1">
          <label>confirm password</label>
          <Input
            type={confirmedstatus ? "text" : "password"}
            {...register("confirmPassword")}
          />
          {error ? <p className="text-red-400">{error}</p> : null}
          <div
            className={cn(
              !error
                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[0px]"
            )}
          >
            <EyeOff
              className={confirmedstatus ? "block" : "hidden"}
              onClick={() => setConfirmedStatus(!confirmedstatus)}
            />
            <Eye
              className={confirmedstatus ? "hidden" : "block"}
              onClick={() => setConfirmedStatus(!confirmedstatus)}
            />
          </div>
        </div>

        <Button
          className="bg-blue-500 hover:bg-blue-400 text-white"
          isLoading={loading}
          cursor={loading ? "not-allowed" : "pointer"}
          type="submit"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
