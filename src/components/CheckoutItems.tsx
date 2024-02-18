import { useSelector } from "react-redux";
import { RootState } from "../context/CardStore";
import { FormatPrice } from "../lib/utils";

function CheckoutItems() {
  const { totalePrice, cardItems , discountPrice } = useSelector(
    (state: RootState) => state.card
  );
  
  return (
    <div className="w-full lg:w-[450px] border flex-col text-gray-600 px-5 py-4 flex gap-y-4 rounded-lg">
      <h1 className="text-xl font-medium">Summary</h1>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          Amount :{" "}
          <p>
            {FormatPrice({
              value: discountPrice || totalePrice,
              currency: cardItems[0]?.price.currency || "USD",
            })}
          </p>
        </div>
        <div className="flex justify-between items-center">
          Est Tax :{" "}
          <p>
            {FormatPrice({
              value: 0,
              currency: cardItems[0]?.price.currency || "USD",
            })}
          </p>
        </div>
      </div>

      <hr />
      <div className="flex justify-between items-center">
        Totale Price :{" "}
        <p className="text-black font-semibold text-lg">
          {" "}
          {FormatPrice({
            value:  discountPrice || totalePrice,
            currency: cardItems[0]?.price.currency || "USD",
          })}
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-y-3 ">
        <h1 className="text-xl font-semibold">Cart Items</h1>
        <div className="flex flex-col gap-y-3">
          {cardItems?.map((item) => (
            <div className="flex gap-x-3">
              <div className="relative w-[75px] h-[75px]">
                <img src={item.image} alt="image of plant" />
                <p className="absolute top-[-10px] right-[-10px] w-[25px] h-[25px] rounded-full text-white bg-gray-400 flex justify-center items-center">
                  {item.quantity}
                </p>
              </div>
              <div className="flex flex-col gap-y-3">
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-lg font-bold text-black">
                  {FormatPrice(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CheckoutItems;
