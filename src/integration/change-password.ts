import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";


export default async function ChangePasswordHandler(currentPassword : string , newPassword : string , confirmPassword : string){
    const token = window.localStorage.getItem('token');
    if(!token) return null;
    const url = `${DOMAINE_NAME}/api/v1/auth/change-password`;
    const header = {
        "authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
    }
    const data = JSON.stringify({confirmPassword , newPassword , currentPassword});

    try {
        const responce = await axios.put(url ,data ,{responseType : "json" ,headers : header});
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        return responce.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}