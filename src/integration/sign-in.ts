// import ParseJson from "./parse-json";
import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default async function SignInHandler(password: string, email: string) {

  const data = JSON.stringify({ password, email });
  const url = `${DOMAINE_NAME}/api/v1/auth/sign-in`;
  const header = {
    "Content-Type": "application/json",
  };

  try {
    const responce = await axios.post(url, data, {
      responseType: "json",
      headers: header,
    });

    window.localStorage.setItem('user', JSON.stringify(responce.data?.data));
    window.localStorage.setItem('token',responce.data?.token);
    return responce.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
