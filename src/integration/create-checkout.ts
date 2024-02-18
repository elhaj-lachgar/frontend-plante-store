import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";


export default async function CreateCheckout (address:string){
    const token = window.localStorage.getItem('token');
    if(!token) return null;
    const url = DOMAINE_NAME+"/api/v1/checkout";
    const data = JSON.stringify({address});
    const header  = {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    try {
        const responce = await axios.post(url, data , {responseType : "json" , headers: header});
        return responce.data;
    }catch(err) {
        console.error(err);
        return null;
    }
}