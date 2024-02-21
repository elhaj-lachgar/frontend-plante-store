import { Button, Input } from "@chakra-ui/react";
import { FormatPrice } from "../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/CardStore";
import { useState } from "react";
import SetCard, { TArr } from "../integration/set-card";
import toast from "react-hot-toast";
import GetCoupon from "../integration/get-coupon";
import { setCoupon } from "../context/CardFeatures";

function PerCheckout({
  totale,
  Subtotal,
  currency,
}: {
  totale: number;
  Subtotal: number;
  currency: "USD" | "EUR";
}) {
  const [loading, setLoading] = useState(false);
  const { cardItems, couponId } = useSelector((state: RootState) => state.card);
  const [coupon, setCoupons] = useState<null | string>(null);
  const [Cloading, setCLoading] = useState(false);
  const router = useNavigate();
  const dispatch = useDispatch();
  const CouponHandler = async () => {
    if (!coupon) {
      toast.error("please entre coupon", { duration: 2000 });
      return;
    }
    setCLoading(true);
    const res = await GetCoupon(coupon);
    setCLoading(false);
    if (!res) {
      toast.error("coupon not found", { duration: 2000 });
      return;
    }
    if (res.coupon[0]?.percentage != null) {
      toast.success("coupon saved", { duration: 2000 });
      dispatch(
        setCoupon({
          percentage: res.coupon[0]?.percentage as number,
          couponId: res.coupon[0]?.id as string,
        })
      );
      return;
    }
    toast.error("coupon not found", { duration: 2000 });
  };

  const SetCardHandler = async () => {
    const token = window.localStorage.getItem("token");
    if (!token) window.location.href = "/sign-in";
    const arr: TArr[] = cardItems.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    if (arr.length == 0) {
      toast.error("cart is empty", { duration: 3000 });
      return;
    }
    const res = await SetCard(arr, couponId);
    if (!res) {
      setLoading(false);
      return;
    }
    setLoading(false);
    router("/order");
  };
  return (
    <div className="border flex flex-col gap-y-3 lg:w-[300px] lg:h-[300px] h-fit rounded-lg ">
      <div className=" px-3 font-bold text-gray-700 flex items-center text-xl">
        Cart totale
      </div>
      <hr />
      <div className="flex px-5 justify-between">
        <p className="font-semibold">Subtotal:</p>
        <p>{FormatPrice({ currency: currency, value: Subtotal })}</p>
      </div>
      <hr />
      <div className="flex px-5 justify-between">
        <p className="font-semibold">total:</p>
        <p>{FormatPrice({ currency: currency, value: totale })}</p>
      </div>
      <hr />
      <div className="flex items-center justify-between px-3">
        <Input
          placeholder="Coupon code..."
          width={"45%"}
          onChange={(e) => setCoupons(e.currentTarget.value)}
        />
        <Button
          width={"45%"}
          onClick={() => {
            CouponHandler();
          }}
          isLoading={Cloading}
          cursor={Cloading ? "not-allowed" : "pointer"}
        >
          Apply Coupon
        </Button>
      </div>
      <hr />
      <div className="px-5">
        <Button
          color={"white"}
          backgroundColor={"rgb(34 197 94)"}
          _hover={{ backgroundColor: "rgb(74 222 128)" }}
          width={"100%"}
          isLoading={loading}
          cursor={loading ? "not-allowed" : "pointer"}
          onClick={SetCardHandler}
          size={"sm"}
        >
          Countinue
        </Button>
      </div>
      <div className="px-5">
        <Link to={"/shop"} className="w-full">
          <Button width={"100%"} size={"sm"}>
            Back to Shope
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PerCheckout;
