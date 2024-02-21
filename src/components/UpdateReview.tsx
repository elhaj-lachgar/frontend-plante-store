import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Pen } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Star from "react-star-ratings";
import UpdateReviewService from "../integration/update-review";

type TProps = {
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  currentRating: number;
  currentContent: string;
};

function UpdateReview({
  load,
  setLoad,
  id,
  currentRating,
  currentContent,
}: TProps) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState<null | string>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const UpdateReviewHandler = async () => {
    if (!content) {
      toast.error("content is required", { duration: 3000 });
      return;
    }
    if (content == currentContent && rating == currentRating) {
      toast.error("you don't change any thing", { duration: 3000 });
      return;
    }
    setLoading(true)
    const res = await UpdateReviewService(id, rating, content);
    setLoading(false);
    if (!res) {
      toast.error("internal error", { duration: 3000 });
      return;
    }
    setLoad(!load);
    onClose();
  };
  return (
    <>
      <Pen className="cursor-pointer" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="lg:px-5 px-2 justify-center w-full flex flex-col gap-y-4 mx-auto">
              <Star
                changeRating={(rating) => setRating(rating)}
                starDimension="25px"
                starSpacing="3px"
                starRatedColor="yellow"
                starHoverColor="yellow"
                rating={currentRating}
              />
              <Textarea
                defaultValue={currentContent}
                className="h-[50px]"
                placeholder="Entre your feed back..."
                onChange={(e) => setContent(e.currentTarget.value)}
              />

              <div className=" flex w-full justify-end gap-x-3  items-center relative">
                <Button
                  onClick={UpdateReviewHandler}
                  backgroundColor={"rgb(34 197 94 )"}
                  color={"white"}
                  isLoading={loading}
                  cursor={loading ? "not-allowed" : "pointer"}
                >
                  update
                </Button>
                <Button variant={"outline"} onClick={onClose}>
                  Back
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateReview;
