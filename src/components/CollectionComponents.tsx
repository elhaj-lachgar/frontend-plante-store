
import GetCategoryById from "../integration/get-category-id";
import { useContext } from "react";
import { PlanteContext } from "../context/PlanteContext";
import { TPLante } from "../lib/utils";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export type TProps = {
  imageUrl : string;
  name : string;
  id : string;
}[]

function CollectionComponents({arr}:{arr: TProps}) {
  const {  setPlantes } = useContext(PlanteContext);
  const router = useNavigate();
  const ClickCollectionHandler = async (id:string)=>{
    const res = await GetCategoryById(id);
    if(!res) return;
    console.log(res.data);
    const arr: TPLante[] = res.data.plantes.map((plante: any) => {
      return {
        id: plante.id,
        name: plante.name,
        categoryId: res.data.name,
        description: plante.description,
        imageUrl: plante.imageUrl,
        price: plante.price,
        currency: plante.currency,
        discountPrice: plante.discountPrice,
        rating: plante.rating,
        createdAt: plante.createdAt,
        updatedAt: plante.updatedAt,
      };
    });

    setPlantes(arr);
    router("/shop");
  }

  return (
    <div className="flex flex-col gap-y-5 gap-x-4 items-center lg:flex-row lg:w-11/12 lg:mx-auto">
      {arr.map((collection) => (
        <div className="bg-green flex flex-col items-center relative w-11/12 h-[500px] md:h-[600px] lg:h-[500px] rounded-lg">
          <img
            src={collection.imageUrl}
            alt="collection image"
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute flex flex-col px-4 py-3 z-10">
          <h1 className="font-medium text-lg" >{collection.name}</h1>
          </div>
          <div className="absolute top-[90%] text-green-600 text-lg font-medium hover:text-blue-700">
           <Button color={'rgb(29 78 216 )'} backgroundColor={"transparent"} fontSize={"large"} fontWeight={"bold"} onClick={()=>{ClickCollectionHandler(collection.id)}}>
           see collection 
           </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CollectionComponents;
