import { useSelector } from "react-redux";
import CartItems from "../components/CartItems";
import LargeCartItem from "../components/LargeCartItem";
import PerCheckout from "../components/PerCheckout";
import { RootState } from "../context/CardStore";
import { Suspense } from "react";
import Loading from "../components/Loading";

function Cart() {
  const { totalePrice, cardItems, discountPrice } = useSelector(
    (state: RootState) => state.card
  );

  return (
    <div className="w-11/12 mx-auto flex flex-col mt-10 gap-y-5 lg:flex-row gap-x-6  lg:justify-center">
      <Suspense fallback={<Loading/>}>
        <CartItems />
        <LargeCartItem />
        <PerCheckout
          Subtotal={discountPrice || totalePrice}
          currency={cardItems[0]?.price?.currency || "USD"}
          totale={totalePrice}
        />
      </Suspense>
    </div>
  );
}

export default Cart;
