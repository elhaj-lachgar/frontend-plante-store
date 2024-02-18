import { createContext } from "react";
import { TPLante } from "../lib/utils";




type TPlanteContext =  {  
    plantes : TPLante [],
    setPlantes: (plates:TPLante[]) => void;
}

const InitState : TPlanteContext = {
    plantes : [],
    setPlantes : () =>{console.log("hi")}
}


export const PlanteContext  = createContext<TPlanteContext>(InitState);