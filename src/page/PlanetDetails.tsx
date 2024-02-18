import { useParams } from "react-router-dom";
import { FormatPrice } from "../lib/utils";
import { Button } from "@chakra-ui/react";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { AddToCard } from "../context/CardFeatures";
import { TCardItem } from "../context/CardFeatures";
import GetDetailsPlante from "../integration/get-details-plante";
import { useEffect, useLayoutEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import ReviewItem from "../components/ReviewItem";
import CreateReview from "../components/CreateReview";

function PlanetDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState<any>(null);
  const [istoken, setIsToken] = useState(false);

  const fetcher = async () => {
    if (!id) return;
    const res = await GetDetailsPlante(id);
    if (!res) return;
    setData(res.data);
  };
  if (!id) return null;
  // const data = DamyData[parseInt(id)];
  const cardInfo: TCardItem = {
    category: data?.categoryId || "unkwon",
    image: data?.imageUrl,
    id: data?.id,
    price: {
      value: data?.discountPrice || data?.price,
      currency: data?.currency,
    },
    quantity: 1,
    title: data?.name,
  };
  useEffect(() => {
    fetcher();
  }, []);

  useLayoutEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) setIsToken(true);
  }, []);

  return (
    <>
      {data ? (
        <>
          {" "}
          <div className="relative flex flex-col bg-white mt-10  gap-y-3 w-11/12 mx-auto items-center lg:flex-row lg:gap-x-5 lg:justify-center lg:items-start mb-5">
            <div className="relative w-11/12 h-[350px] md:h-[500px] lg:w-[350px]">
              <img
                src={data?.imageUrl || "/plante/plante.avif"}
                alt="image of plant"
                className="object-cover w-11/12 md:h-[500px] h-[350px]  lg:h-[350px] lg:w-[350px] "
              />
            </div>
            <div className="flex flex-col gap-y-3 items-center lg:items-start lg:w-[50%]">
              {/* <h1 className="w-11/12 text-gray-700 font-medium">
      {data.category.name}
    </h1> */}
              <h1 className="w-11/12 text-2xl font-medium">
                {data?.name || "unkwon"}
              </h1>
              <div className="flex gap-x-2 w-11/12 font-bold">
                {data.discountPrice ? (
                  <del className="text-gray-500">
                    {FormatPrice({
                      currency: data.currency,
                      value: data.discountPrice,
                    })}
                  </del>
                ) : null}
                <p>
                  {FormatPrice({ currency: data.currency, value: data.price })}
                </p>
                <p className="text-green-500 font-medium">+ Free Shipping</p>
              </div>
              <div className="flex items-center w-11/12">
                <StarRatings
                  rating={data.rating}
                  starDimension="20px"
                  starSpacing="0px"
                  starRatedColor="yellow"
                  numberOfStars={5}
                />
              </div>
              <div className="w-11/12 text-gray-400">{data.description}</div>
              <div className="w-11/12">
                <Button
                  color={"white"}
                  backgroundColor={"rgb(34 197 94)"}
                  _hover={{ backgroundColor: "rgb(74 222 128)" }}
                  onClick={() => dispatch(AddToCard(cardInfo))}
                >
                  Add Card
                </Button>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col bg-gray-50 mt-10  gap-y-3 w-11/12 mx-auto items-center lg:gap-x-5 lg:justify-center lg:items-start mb-5 rounded-md px-5 min-h-20 py-5">
            <div className="w-full flex justify-between px-5">
              <h1 className="text-2xl font-bold text-gray-600">Reviews</h1>
              {istoken && <CreateReview id={data.id} />}
            </div>
            {data.Review && data.Review?.length > 0 ? (
              <>
                {data.Review.map((review: any) => (
                  <ReviewItem
                    planteId={data.id}
                    id={review.id}
                    key={review.id}
                    content={review.content}
                    image={review.user.profile}
                    name={review.user.name}
                    rating={review.rating}
                    userId={review.user.id}
                  />
                ))}
              </>
            ) : null}
          </div>
        </>
      ) : null}

      <hr />
      <Footer />
    </>
  );
}

export default PlanetDetails;
