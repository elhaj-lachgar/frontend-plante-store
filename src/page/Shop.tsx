import { useContext } from "react";
import Banner from "../components/Banner";
import FeatureComponent from "../components/FeatureComponent";
import Footer from "../components/Footer";
import { PlanteContext } from "../context/PlanteContext";
function Shop() {
  const { plantes} = useContext(PlanteContext);
  return (
    <div className="absolute top-0 w-full bg-gray-50">
      <Banner text="Store" search={"not"} />
      <div className="my-10 flex flex-col gap-y-5 w-full lg:w-9/12 mx-auto px-5">
        <h1 className="text-2xl font-bold text-gray-700">Featured Plants</h1>
        <div className="flex flex-wrap  justify-center gap-[30px] ">
          {plantes.map((data) => (
            <FeatureComponent
              id = {data.id}
              category={data.categoryId}
              image={data.imageUrl}
              price={data.price}
              rating={data.rating}
              title={data.name}
              discountPrice={data.discountPrice}
              currency={data.currency}
              key={data.id}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
