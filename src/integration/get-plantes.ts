import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default async function GetPlantes (page: number) {
    const url = `${DOMAINE_NAME}/api/v1/plante?page=${page}`
    try {
        const response = await axios.get(url,{responseType:"json"});
        return response.data;
    }
    catch (err) {
        console.error(err)
        return null;
    }
}  