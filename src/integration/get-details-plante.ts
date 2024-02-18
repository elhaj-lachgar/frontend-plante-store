import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";



export default async function GetDetailsPlante (id: string) {
    const url = `${DOMAINE_NAME}/api/v1/plante/${id}`;
    try {
        const response = await axios.get(url,{responseType:"json"});
        return response.data;
    }
    catch (err) {
        console.error(err)
        return null;
    }
}