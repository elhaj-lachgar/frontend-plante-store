import axios from "axios";
import { DOMAINE_NAME  , COUPON } from "../lib/utils";

export type TArr = {
    id : string ;
    quantity : number ;
}

export default async function SetCard( arr :TArr[] , couponId ?:string ){
    const token = window.localStorage.getItem("token");
    if(!token) return null;
    const data = JSON.stringify({data:arr , couponId : couponId || COUPON});
    console.log(data)
    const url = DOMAINE_NAME+`/api/v1/card`;
    const header = {
        "Content-Type": "application/json",
        "authorization":  `Bearer ${token}`
    }
    try{
        const responce = await axios.post(url,data,{responseType:"json" , headers : header});
        return responce.data;
    }catch(err){
        console.error(err);
        return null;
    }
}