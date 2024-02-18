import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const UpdateProfileCredentials = z.object({
    email : z.string().email({message:"email not valid"}).optional().or(z.literal('')),
    profile: z.instanceof(FileList).optional(),
    name :z.string().optional().or(z.literal('')) ,
})


export type TUpdateProfileCredentials = z.infer<typeof UpdateProfileCredentials>;

export const resolvers = zodResolver(UpdateProfileCredentials);
