import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default async function UpdateReviewService(
  id: string,
  rating?: number,
  content?: string
) {
  const token = window.localStorage.getItem("token");
  if (!token) return null;
  let body: {
    rating?: number;
    content?: string;
  } = { rating: undefined, content: undefined };
  if (rating) body.rating = rating;
  if (content) body.content = content;

  const header = {
    authorization: `Bearer ${token}`,
    "content-type": "application/json",
  };

  const url = DOMAINE_NAME + "/api/v1/review/" + id;

  try {
    const responce = await axios.put(url, body, { headers: header });
    return responce.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
