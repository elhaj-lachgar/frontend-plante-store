import Banner from "../components/Banner";
import CollectionComponents, {
  TProps,
} from "../components/CollectionComponents";
import FeatureComponent from "../components/FeatureComponent";
import Footer from "../components/Footer";
import { SectionItems, TPLante } from "../lib/utils";
import { Suspense, useContext, useEffect, useState } from "react";
import { PlanteContext } from "../context/PlanteContext";
import GetPlantes from "../integration/get-plantes";
import GetCategorys from "../integration/get-category";
import Loading from "../components/Loading";

function Home() {
  const { plantes, setPlantes } = useContext(PlanteContext);
  const [categorys, setCategorys] = useState<TProps>([]);
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

    setPlantes(arr);
  };

  const fetchCategory = async () => {
    const res = await GetCategorys();
    if (!res) return;
    setCategorys(res.data.data as TProps);
  };

  useEffect(() => {
    fetching();
    fetchCategory();
  }, []);

  return (
    <div className="absolute top-0 w-full bg-gray-50">
      <Banner />
      <div className="relative flex flex-col lg:flex-row lg:justify-center lg:gap-x-[150px] items-center w-full gap-y-5 my-10">
        {SectionItems.map((section) => (
          <div className="flex flex-col lg:flex-row  items-center gap-y-4 lg:gap-x-5">
            <section.icon className="text-green-400" />
            <div className="flex flex-col items-center lg:items-start gap-y-2">
              <h3 className="font-semibold">{section.title}</h3>
              <p className="text-gray-500">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Suspense fallback={<Loading />}>
        <CollectionComponents arr={categorys} />
      </Suspense>
      <div className="flex flex-col items-center mt-20 mb-10">
        <h1 className="text-center w-full font-bold text-xl lg:text-2xl">
          Featured Plants
        </h1>
        <p className="text-center  mb-20 mt-5 w-[300px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <Suspense fallback={<Loading />}>
          <div className="mt-5 flex flex-wrap gap-8 lg:w-11/12 justify-center mx-auto">
            {plantes.length > 0 ? (
              <>
                {plantes.map((data) => {
                  return (
                    <FeatureComponent
                      id={data.id}
                      category={data.categoryId}
                      image={data.imageUrl}
                      price={data.price}
                      currency={data.currency}
                      rating={data.rating}
                      title={data.name}
                      discountPrice={data.discountPrice}
                      key={data.id}
                    />
                  );
                })}
              </>
            ) : null}
          </div>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
