import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const UpdateAddressCredentials = z.object({
    city : z.string().min(1,{message: "city is required"}),
    country : z.string().min(1,{message: "country is required"}),
    street : z.string().min(1,{message: "street is required"}),
    codePostal : z.string().min(1,{message: "codePostal is required"}),
})


export type TUpateAddressCredentials = z.infer< typeof UpdateAddressCredentials >;

export const resolvers = zodResolver(UpdateAddressCredentials);