import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";


export default async function CreateReviewHandler (id:string , rating : number , content : string) {
    const token = window.localStorage.getItem("token");
    if(!token) return null;

    const data = JSON.stringify({id,rating,content});

    const header = {
        "authorization": `Bearer ${token}`,
        "content-type": "application/json"
    };

    const url = DOMAINE_NAME+"/api/v1/review";

    try {
        const responce = await axios.post(url,data,{headers:header , responseType :"json"});
        return responce.data;
    } catch (error) {
      console.error(error);
      return null;
    }
}