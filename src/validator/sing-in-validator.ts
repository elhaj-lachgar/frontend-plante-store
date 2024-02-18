import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const isValid = (value: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm.test(value);

const SignInCredentials = z.object({
  email: z.string().email({ message: "this not valid email" }),
  password: z.string().refine(isValid, {
    message:
      "this not valid password must be at betewen 8 and 16 characters and containes A-Z , a-z and 1-2",
  }),
});


export type TSignInCredentials = z.infer<typeof SignInCredentials>;

export const resolvers = zodResolver(SignInCredentials);
