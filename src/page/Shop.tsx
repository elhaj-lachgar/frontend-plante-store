import { Suspense, useContext, useEffect } from "react";
import Banner from "../components/Banner";
import FeatureComponent from "../components/FeatureComponent";
import Footer from "../components/Footer";
import { PlanteContext } from "../context/PlanteContext";
import Loading from "../components/Loading";
import { TPLante, TPagination } from "../lib/utils";
import GetPlantes from "../integration/get-plantes";
import Pagination from "../components/Pagination";




function Shop() {
  const { plantes, setPlantes, search  , changePagination } = useContext(PlanteContext);
  const fetching = async () => {
    const res = await GetPlantes(0);
    if (!res) return;
    const arr: TPLante[] = res.data.data.map((plante: any) => {
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
    });
    
    changePagination(res.data.pagination as TPagination);
    setPlantes(arr);
  };
  useEffect(() => {
    if (plantes.length == 0 && !search) {
      fetching();
    }
  });
  return (
    <div className="absolute top-0 w-full bg-gray-50">
      <Banner text="Store" search={"not"} />
      <div className="my-10 flex flex-col gap-y-5 w-full lg:w-9/12 mx-auto px-5">
        <h1 className="text-2xl font-bold text-gray-700">Featured Plants</h1>
        <Suspense fallback={<Loading />}>
          <div className="flex flex-wrap  justify-center gap-[30px] ">
            {plantes.length > 0 ? (
              plantes.map((data) => (
                <FeatureComponent
                  id={data.id}
                  category={data.categoryId}
                  image={data.imageUrl}
                  price={data.price}
                  rating={data.rating}
                  title={data.name}
                  discountPrice={data.discountPrice}
                  currency={data.currency}
                  key={data.id}
                />
              ))
            ) : search ? (
              <div>Items not fond</div>
            ) : null}
          </div>
        <Pagination/>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
