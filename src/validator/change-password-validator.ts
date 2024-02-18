import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const isValid = (value: string) =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm.test(value);
const ChangePasswordCredentials = z.object({
    currentPassword : z.string().refine(isValid, {
        message:
          "this not valid password must be at betewen 8 and 16 characters and containes A-Z , a-z and 1-2",
      }),
    newPassword : z.string().refine(isValid, {
        message:
          "this not valid password must be at betewen 8 and 16 characters and containes A-Z , a-z and 1-2",
      }),
    confirmPassword : z.string(),
});


export type TChangePasswordCredentials = z.infer<typeof ChangePasswordCredentials>

export const resolvers = zodResolver(ChangePasswordCredentials);