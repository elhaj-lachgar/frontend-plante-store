import axios from 'axios';
import { DOMAINE_NAME } from '../lib/utils';

export default async function GetUserOrders () {
    const token =  window.localStorage.getItem('token');
    if(!token) return null;
    const header = {
        "authorization":`Bearer ${token}`,
        "content-type": "application/json",
    };
    const url = DOMAINE_NAME+"/api/v1/order/order-user";
    try {
        const response = await axios.get(url,{headers:header , responseType :"json"});
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}