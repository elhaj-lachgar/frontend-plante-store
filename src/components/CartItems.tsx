import { FormatPrice } from "../lib/utils";
import { XCircle } from "lucide-react";
import { Button, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/CardStore";
import { SetQuantity, DeleteItem } from "../context/CardFeatures";

function CartItems() {
  const { cardItems } = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-y-4">
      {cardItems.map((item) => (
        <div className="flex flex-col border py-4  gap-y-3 lg:hidden">
          <div className="flex justify-end items-center px-3">
            <XCircle
              color="gray"
              onClick={() => dispatch(DeleteItem({ id: item.id }))}
            />
          </div>
          <hr />
          <div className="flex justify-center w-full px-3 ">
            <img
              src={item.image}
              className="object-cover w-[100px] h-[100px]"
            />
          </div>
          <hr />
          <div className="px-3 flex items-center justify-between">
            <p className="font-medium text-lg text-gray-600">Product:</p>
            {item.title}
          </div>
          <hr />
          <div className="px-3 flex items-center justify-between font-bold">
            <p className="font-medium text-lg text-gray-600">Price:</p>
            {FormatPrice(item.price)}
          </div>
          <hr />
          <div className="px-3 flex items-center justify-between">
            <p className="font-medium text-lg text-gray-600">Quantity:</p>
            <Input value={item.quantity} width={"60px"} />
            <div className="items-center flex">
              <Button
                onClick={() => {
                  dispatch(
                    SetQuantity({
                      id: item.id,
                      quantity: item.quantity + 1,
                    })
                  );
                }}
              >
                +
              </Button>
              <Button
                onClick={() => {
                  if (item.quantity == 1) return;
                  dispatch(
                    SetQuantity({
                      id: item.id,
                      quantity: item.quantity - 1,
                    })
                  );
                }}
              >
                -
              </Button>
            </div>
          </div>
          <hr />
          <div className="px-3 flex items-center justify-between font-bold">
            <p className="font-medium text-lg text-gray-600">Subtotal:</p>
            {FormatPrice({
              value: item.price.value * item.quantity,
              currency: item.price.currency,
            })}
          </div>
          <hr />
          <div className="px-3">
            <Button width={"100%"}>Update Card</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartItems;
