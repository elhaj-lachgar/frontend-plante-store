import { useEffect, useState } from "react";
import OrderItem from "../components/OrderItem";
import GetUserOrders from "../integration/get-user-orders";

function MyOrder() {
  const [orders, setOrders] = useState<any>(null);
  const featcher = async () => {
    const res = await GetUserOrders();
    if (!res) return;
    setOrders(res.data);
  };
  useEffect(() => {
    featcher();
  }, []);
  return (
    <div className="w-full flex flex-col gap-y-5">
      {orders ? (
        <>
          {orders.map((order: any) => (
            <OrderItem
              key={order.id}
              id={order.id}
              address={order.address}
              cardItem={order.card.cardItem}
              createdAt={order.createdAt}
              isDelaiverd={order.isDelaiverd}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}

export default MyOrder;
