import { Button, Input } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  TSignInCredentials,
  resolvers,
} from "../../validator/sing-in-validator";
import cn from "classnames";
import SignInHandler from "../../integration/sign-in";
import toast from "react-hot-toast";


function SignIn() {
  const [status, setStatus] = useState(false);
  const [ loading,setLoading ] = useState(false);
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInCredentials>({
    resolver: resolvers,
  });

  const SubmitHandler = async (params : TSignInCredentials)=>{
      setLoading(true);
      const res = await SignInHandler(params.password , params.email)
      if(!res){
        setLoading(false);
        toast.error("incorrect password or email address",{
          className : "bg-red-300"
        })
        return;
      }
      else{
        setLoading(false);
        toast.success("login successful");
        router("/");
        return;
      }
  }

  return (
    <div className=" w-11/12 md:w-[400px] flex flex-col px-2 lg:px-5 gap-y-3 border rounded-xl py-4 bg-white">
      <h1 className="text-2xl  font-mono text-center w-full">Log In</h1>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(SubmitHandler)}>
        <div className=" gap-y-2 flex-col">
          <label className="text-muted-foreground font-bold">Email</label>
          <Input
            type="text"
            {...register("email")}
            className={cn(
              errors.email
                ? "focus:border-red-400 border"
                : "focus:border-green-400"
            )}
          />
          {errors.email ? (
            <p className="text-red-400">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="relative gap-y-2 flex-col">
          <label className=" relative text-muted-foreground font-bold">
            Password
          </label>
          <Input
            type={status ? "text" : "password"}
            {...register("password")}
            className={cn(
              errors.password
                ? "focus:border-red-400 border"
                : "focus:border-green-400"
            )}
          />
          <div
            className={cn(
              !errors.password
                ? "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/3"
                : "absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-[-30px]"
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
          {errors.password ? (
            <p className="text-red-400">{errors.password.message}</p>
          ) : null}
        </div>
        <Button
          backgroundColor={" rgb(59 130 246)"}
          _hover={{ backgroundColor: "rgb(59 130 246)" }}
          color={"white"}
          type="submit"
          isLoading={loading}
          cursor={loading ? "not-allowed" : "pointer"}
        >
          {"Log in"}
        </Button>
      </form>
      <hr className="mt-4" />
      <p className="text-center text-muted-foreground">
        create account ?{" "}
        <span className="text-green-500 cursor-pointer">
          <Link to={"/sign-up"}>register</Link>
        </span>
      </p>
    </div>
  );
}

export default SignIn;
