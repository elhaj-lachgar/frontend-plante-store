import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";


export default async function UpdateProfileHandler (profile?: FileList ,email?: string , name?: string ){
    const token = window.localStorage.getItem("token");
    if(!token) return null;
    const url = `${DOMAINE_NAME}/api/v1/auth/update-profile`;
    const data = new FormData();
    if(email) data.append("email", email);
    if(name) data.append("name", name);
    if(profile && profile?.length > 0 ) data.append("image", profile[0]);
    const header = {
        "authorization" : `Bearer ${token}`,
    }

    try {
        const responce = await axios.put(url ,data ,{responseType : "json" ,headers : header});
        window.localStorage.setItem('user', JSON.stringify(responce.data?.data));
        return responce.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}