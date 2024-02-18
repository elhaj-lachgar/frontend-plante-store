import { Suspense } from "react";
import CheckoutItems from "../components/CheckoutItems";
import ValidateCheckout from "../components/ValidateCheckout";
import Loading from "../components/Loading";

function Order() {
  return (
    <div className="flex flex-col gap-y-5 items-center w-11/12 lg:w-9/12 mt-10 mx-auto lg:flex-row lg:justify-between lg:items-start lg:gap-x-5">
      <Suspense fallback={<Loading/>}>
        <ValidateCheckout />
        <CheckoutItems />
      </Suspense>
    </div>
  );
}

export default Order;
