import { Button, Input } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GetPlante from "../integration/get-plants";
import { PlanteContext } from "../context/PlanteContext";


function Banner({
  image,
  text,
  search,
}: {
  image?: string;
  text?: string;
  search?: string;
}) {

  const { setPlantes } = useContext(PlanteContext);
  const [ keyword , setKeyword ] = useState<null|string>(null);

  const SearchHandler = async ()=>{
    if(!keyword) return;
    const res = await GetPlante (keyword);
    if(!res) return;
    const arr = res.data.data.map( (plante:any)=>{
      return {
        id: plante.id,
        name: plante.name,
        categoryId: plante.category.name,
        description: plante.description,
        imageUrl: plante.imageUrl,
        price: plante.price,
        currency: plante.currency,
        discountPrice: plante.discountPrice,
        rating: plante.rating,
        createdAt: plante.createdAt,
        updatedAt: plante.updatedAt,
      };
    })
    setPlantes(arr);
  }

  return (
    <div className="w-full h-[400px] lg:h-[500px] relative">
      <img
        src={image || "/banner.jpg"}
        className="object-cover w-full h-[400px]  lg:h-[500px] lg:rounded-b-[50px]"
      />
      <div className="flex flex-col   w-full md:w-10/12 lg:w-9/12 mx-auto">
        {text ? (
          <div className="absolute px-5 top-[30%] flex flex-col gap-y-5 text-gray-700">
            <p
              className={`w-full md:w-[500px] text-[40px] lg:text-[50px] font-bold`}
            >
              {text}
            </p>
            {search ? (
              <div className="flex gap-x-3 items-center">
                <Button  onClick={()=>SearchHandler()} cursor={keyword ? "pointer" : "not-allowed"}>
                  <Search/>
                </Button>
                <Input borderColor={"black"} onChange={(e)=>setKeyword(e.currentTarget.value)}/>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="absolute px-5 top-[100px] flex flex-col gap-y-5 text-gray-700">
            <h1 className="text-xl  font-medium lg:text-2xl">
              Best Quality Plants
            </h1>
            <p className="w-full md:w-[500px] text-[40px] lg:text-[50px] font-bold">
              Amazing Variety Of Plants Starting Just $6
            </p>
            <Link to={"/shop"}>
              <Button
                color="white"
                width={"200px"}
                colorScheme="green"
                rotate={"20px"}
              >
                Shop Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;
