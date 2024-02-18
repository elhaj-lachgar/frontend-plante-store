import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddAddressCredentials = z.object({
    city : z.string().min(1,{message: "city is required"}),
    country : z.string().min(1,{message: "country is required"}),
    street : z.string().min(1,{message: "street is required"}),
    codePostal : z.string().min(1,{message: "codePostal is required"}),
});


export type TAddAddressCredentials = z.infer<typeof AddAddressCredentials>;

export const resolver = zodResolver(AddAddressCredentials);
