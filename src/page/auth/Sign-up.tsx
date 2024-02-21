import { Button, FormLabel, Input} from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  TSignUpCredentials,
  resolvers,
} from "../../validator/sign-up-validator";
import cn from "classnames";
import SignUpHandler from "../../integration/sign-up";
import toast from "react-hot-toast";

function SignUp() {
  const [Confirmstatus, setConfirmStatus] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [confirmPassword, setConfirmPassword] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TSignUpCredentials>({
    resolver: resolvers,
  });
  const SubmitHandler = async (params: TSignUpCredentials) => {
    if (!confirmPassword || confirmPassword != params.password) {
      setError("password not matched");
      return;
    }
    setLoading(true);
    const res = await SignUpHandler(
      params.name,
      params.email,
      params.password,
      confirmPassword,
      params.profile[0]
    );
    if (!res) {
      setLoading(false);
      toast.error("same thing gose wrong", {
        className: "bg-red-300",
      });
      return;
    } else {
      setLoading(false);
      toast.success("login successful");
      router("/");
      return;
    }
  };

  const HandleEyesClassName = () => {

    if (errors.password)
      return "z-10 absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5  top-[-120px] md:top-[-75px] ";
    if (error)
      return "z-10 absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[-20px] md:top-[0px]";
    return "z-10 absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3";
  };
  return (
    <div className="w-11/12 md:w-[500px] lg:w-[500px] flex flex-col px-2 md:px-5 gap-y-3 border rounded-xl py-4 bg-white">
      <h1 className="text-center w-full  font-mono text-2xl">Sign up</h1>
      <form
        className="flex flex-col gap-y-3"
        id="form"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        <div className="flex flex-col gap-y-2">
          <FormLabel>Email</FormLabel>
          <Input type="text" {...register("email")} />
          {errors.email ? (
            <p className="text-red-400">{errors.email.message}</p>
          ) : null}
        </div>
        <div className=" flex flex-row gap-x-3 justify-between">
          <div className=" relative flex flex-col w-[45%]">
            <label>password</label>
            <Input
              type={status ? "text" : "password"}
              {...register("password")}
            />
            <div className={HandleEyesClassName()}>
              <EyeOff
                className={cn("cursor-pointer", status ? "block" : "hidden")}
                onClick={() => setStatus(!status)}
              />
              <Eye
                className={cn("cursor-pointer", status ? "hidden" : "block")}
                onClick={() => setStatus(!status)}
              />
            </div>
            {errors.password ? (
              <p className="text-red-400">{errors.password.message}</p>
            ) : null}
          </div>
          <div className="relative flex flex-col w-[45%] ">
            <label>comfirm password</label>
            <Input
              type={Confirmstatus ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            />
            <div className={HandleEyesClassName()}>
              <EyeOff
                className={cn(
                  "cursor-pointer",
                  Confirmstatus ? "block" : "hidden"
                )}
                onClick={() => setConfirmStatus(!Confirmstatus)}
              />
              <Eye
                className={cn(
                  "cursor-pointer",
                  Confirmstatus ? "hidden" : "block"
                )}
                onClick={() => setConfirmStatus(!Confirmstatus)}
              />
            </div>
            {error ? <p className="text-red-400">{error}</p> : null}
          </div>
        </div>
        <div className="flex flex-row gap-x-3 justify-between">
          <div className="flex flex-col ">
            <label>profile</label>
            <Input type="file" {...register("profile")} />
          </div>
          <div className="flex flex-col ">
            <label>name</label>
            <Input type="text" {...register("name")} />
            {errors?.name ? (
              <p className="text-red-400">{errors.name.message}</p>
            ) : null}
          </div>
        </div>
        <Button
          backgroundColor={"  rgb(34 197 94)"}
          _hover={{ backgroundColor: " rgb(34 197 94)" }}
          color={"white"}
          type="submit"
          isLoading={loading}
          onClick={() => {
            const data = {
              name: getValues("name"),
              password: getValues("password"),
              email: getValues("email"),
              profile: getValues("profile"),
            };
            SubmitHandler(data);
          }}
          cursor={loading ? "not-allowed" : "pointer"}
        >
          Sign up
        </Button>
      </form>
      <hr />
      <p className="text-center text-muted-foreground">
        already you have account ?{" "}
        <span className="text-blue-500">
          <Link to={"/sign-in"}>log in</Link>
        </span>
      </p>
    </div>
  );
}

export default SignUp;
