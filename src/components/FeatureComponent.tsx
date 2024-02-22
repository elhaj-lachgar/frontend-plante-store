import StarRatings from "react-star-ratings";
import { FormatPrice } from "../lib/utils";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { AddToCard } from "../context/CardFeatures";
import { TCardItem } from "../context/CardFeatures";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { useState } from "react";
type TProps = {
  id: string;
  image: string;
  price: number;
  currency: "USD" | "EUR";
  discountPrice?: number;
  rating: number;
  title: string;
  category: string;
  load?: boolean;
  setLaod?: React.Dispatch<React.SetStateAction<boolean>>;
};

function FeatureComponent({
  id,
  image,
  price,
  discountPrice,
  rating,
  currency,
  title,
  category,
  load,
  setLaod,
}: TProps) {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const cardInfo: TCardItem = {
    category: category || "unkwon",
    image: image,
    id: id,
    price: { value: discountPrice || price, currency: currency },
    quantity: 1,
    title: title,
  };

  return (
    <div className="flex flex-col  justify-between gap-x-4  h-[300px]  lg:h-[400px]">
      <div className="relative w-full h-[200px]  lg:h-[300px] group">
        <Link
          to={`/shop/${id}`}
          onClick={() => {
            if (typeof load != "undefined" && typeof setLaod != "undefined") {
              setLaod(!load);
            }
          }}
        >
          <img
            src={image || "/plant5-free-img.jpg"}
            alt="image of plante"
            className="object-cover w-full h-full cursor-pointer"
          />
        </Link>
        <ShoppingBag
          className={cn(
            "absolute top-[5px] right-[5px] hidden group-hover:block  cursor-pointer",
            clicked ? "animate-ping text-green-400" : "animate-none text-white"
          )}
          onClick={() => {
            setClicked(!clicked);
            setTimeout(() => {
              setClicked(false);
            }, 1000);
            dispatch(AddToCard(cardInfo));
          }}
        />
      </div>
      <p className="font-medium text-gray-500">{category && category}</p>
      <p className="mt-2 font-medium">{title.substring(0, 15) + "..."}</p>
      <StarRatings
        rating={rating}
        starDimension="20px"
        starSpacing="0px"
        starRatedColor="yellow"
        numberOfStars={5}
      />
      <div className="flex gap-x-3 font-bold">
        {discountPrice ? (
          <p>{FormatPrice({ currency, value: discountPrice })}</p>
        ) : null}
        <del className="text-gray-500">
          {FormatPrice({ currency, value: price })}
        </del>
      </div>
    </div>
  );
}

export default FeatureComponent;
