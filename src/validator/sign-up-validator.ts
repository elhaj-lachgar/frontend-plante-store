import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const isValid = (value: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm.test(value);

const SignUpCredentials = z.object({
    name : z.string().min(3,{message: "name is required must contain at least 3 characters"}),
    email : z.string().email({message: "email is required must valid email"}),
    password: z.string().refine(isValid, {
        message:
          "this not valid password must be at betewen 8 and 16 characters and containes A-Z , a-z and 1-2",
      }),
    profile: z.string().optional().array().refine((files)=>files[0]),
})


export type TSignUpCredentials = z.infer<typeof SignUpCredentials>;

export const resolvers = zodResolver(SignUpCredentials);