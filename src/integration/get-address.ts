import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";
export default async function GetAddresses () {
    const token = window.localStorage.getItem('token');
    if(!token) return null;
    const url = `${DOMAINE_NAME}/api/v1/location`;
    const header = {
        "authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
    try {
        const response = await axios.get(url,{headers:header , responseType:'json'});
        return response.data
    }
    catch (err) {
        console.log(err);
        return null;
    }
}