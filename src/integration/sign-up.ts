import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";

export default async function SignUpHandler(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  profile?: string
) {

  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("confirmPassword", confirmPassword);
  data.append("name", name);
  if(profile) data.append("image", profile);
  
  const url = `${DOMAINE_NAME}/api/v1/auth/sign-up`;


  try {
    const responce = await axios.post(url, data, {
      responseType: "json",
    });

    window.localStorage.setItem('user', JSON.stringify(responce.data?.data));
    window.localStorage.setItem('token',responce.data?.token);
    return responce.data;
  } catch (err) {
    return null;
  }
}
