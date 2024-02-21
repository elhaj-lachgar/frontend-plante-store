import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default async function GetSearchResults(search: string) {
  const url = DOMAINE_NAME + "/api/v1/search/" + search;
  try {
    const response = await axios.get(url, { responseType: "json" });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
