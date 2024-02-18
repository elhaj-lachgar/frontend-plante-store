import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import DeleteReview from "../integration/delete-review";

function ReviewItem({
  planteId,
  id,
  image,
  name,
  content,
  userId,
  rating,
}: {
  planteId: string;
  id: string;
  image: string;
  name: string;
  content: string;
  userId: string;
  rating: number;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user") as string);
    setUser(user);
  }, []);

  const DeleteHandler = async () => {
    const res = await DeleteReview(id , planteId);
    if (!res) return;
    window.location.reload();
  };
  return (
    <>
      <div className="flex border p-4 rounded-lg justify-between items-center w-full">
        <div className="flex gap-x-2 lg:gap-x-4">
          <div className="w-[75px] h-[75px] relative">
            <img
              src={image || "/user/avatar.jpg"}
              alt="avatar"
              className="rounded-full border"
            />
          </div>
          <div className="flex flex-col  text-muted-foreground ">
            <p>{name}</p>
            <StarRatings
              rating={rating}
              starSpacing="2px"
              starDimension="20px"
              starRatedColor="yellow"
            />
            <p>{(content as string).substring(0, 10) + "..."}</p>
          </div>
        </div>
        {user?.id == userId ? (
          <div className=" flex items-center gap-x-1 md:gap-x-3">
            <Trash2
              className="cursor-pointer"
              onClick={() => {
                DeleteHandler();
              }}
            />
          </div>
        ) : null}
      </div>
      {/* <Separator/> */}
    </>
  );
}

export default ReviewItem;
