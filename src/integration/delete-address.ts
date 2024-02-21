import axios  from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default async function DeleteAddress(id: string) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;
  const url = DOMAINE_NAME + `/api/v1/location/${id}`;
  const header = {
    authorization: `Bearer ${token}`,
  };


  try {
    const responce = await axios.delete(url, {
      headers: header,
      responseType: "json",
    });
    return responce.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
