import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default async function DeleteReview(id: string , planteId: string) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;
  const url = DOMAINE_NAME + `/api/v1/review/${id}`;
  const header = {
    authorization: `Bearer ${token}`,
  };
  const data = JSON.stringify({planteId});
  try {
    const responce = await axios.delete(url, {
      data ,
      headers: header,
      responseType: "json",
    });
    return responce.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
