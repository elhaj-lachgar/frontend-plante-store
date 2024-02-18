import axios from "axios";
import { DOMAINE_NAME } from "../lib/utils";


export default async function GetCoupon (key:string) {
    const url = `${DOMAINE_NAME}/api/v1/coupon/${key}`;
    try{
        const res = await axios.get(url,{responseType:"json"});
        return res.data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}