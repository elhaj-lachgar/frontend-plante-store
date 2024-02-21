import { FormatPrice } from "../lib/utils";
type OrderItemProps = {
  id: string;
  address: any;
  isDelaiverd: boolean;
  cardItem: any;
  createdAt: string;
};

function OrderItem({
  id,
  address,
  isDelaiverd,
  createdAt,
  cardItem,
}: OrderItemProps) {
  return (
    <div className="flex border   w-[80%] md:w-[70%]  mx-auto flex-col px-3 py-2 md:py-4 mt-10 shadow-md h-fit rounded-lg gap-y-5">
      <div className="w-full   flex flex-col px-2 lg:px-5 py-4 gap-y-3">
        <div className="flex flex-col gap-y-1">
          <div className="flex lg:gap-x-4 items-center">
            <p className="text-lg font-bold text-gray-500">Order ID :</p>
            <p className="text-red-400 lg:text-lg">
              {id.substring(0, 15) + "..."}
            </p>
          </div>
          {isDelaiverd ? (
            <p className="text-green-500">Delaiverd</p>
          ) : (
            <p className="text-red-500">Proccecing...</p>
          )}

          <p className="lg:text-lg text-gray-400">
          
            {createdAt.split("T")[0]}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-x-2 lg:justify-between mb-2 ">
          <div className="flex flex-col">
            <h1 className="font-medium text-gray-400">Address</h1>
            <div className="flex flex-col">
              <p>{address.country}</p>
              <p>{address.city}</p>
              <p>{address.street}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-wrap gap-14 justify-center">
          {cardItem.map((item : any) => (
            <div key={item.plante.name} className="flex gap-x-2 items-center">
              <div className="relative w-[75px] h-[75px]">
                <img
                  src={item.plante.imageUrl || "/book.avif"}
                  alt="book"
                  className="border"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h1>{item.plante.name}</h1>
                <h1>{item.plante.category.name}</h1>
                <h1 className="font-medium">{FormatPrice({value : item.plante.price * item.quantity , currency : item.plante.currency })}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
