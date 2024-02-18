import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default  async function GetCategoryById(id: string){
    const url = `${DOMAINE_NAME}/api/v1/category/${id}`;
    try {
        const response = await axios.get(url,{responseType:'json'});
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}