import CheckoutItems from "../components/CheckoutItems"
import ValidateCheckout from "../components/ValidateCheckout"

function Order() {
  return (
    <div className="flex flex-col gap-y-5 items-center w-11/12 lg:w-9/12 mt-10 mx-auto lg:flex-row lg:justify-between lg:items-start lg:gap-x-5">
      <ValidateCheckout/>
      <CheckoutItems/>
    </div>
  )
}

export default Order
