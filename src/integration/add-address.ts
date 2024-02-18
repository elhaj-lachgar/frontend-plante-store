import axios from "axios";
import { TAddress } from "../lib/utils";
import { DOMAINE_NAME } from "../lib/utils";


export default async function AddAddresse ( country: string  , city: string , street: string , codePostal : number ){
    const token = window.localStorage.getItem('token');
    if(!token) return null;
    const url = `${DOMAINE_NAME}/api/v1/location`;
    const header = {
        "authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
    const data = JSON.stringify({country , city , street , codePostal});

    try {
        const response = await axios.post(url , data , { headers : header , responseType : 'json' });
        console.log({res:response.data})
        return response.data.data as TAddress[] ;
    } catch (error) {
        console.error(error);
        return null;
    }
}
