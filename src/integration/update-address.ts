import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default async function UpdateAddressHandler(
  id: string,
  city: string,
  street: string,
  country: string,
  codePostal: number
) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;

  const data = JSON.stringify({ city, codePostal, country, street });

  const url = DOMAINE_NAME + `/api/v1/location/${id}`;
  const header = {
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };
  try {
    const response = await axios.put(url, data, {
      headers: header,
      responseType: "json",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
