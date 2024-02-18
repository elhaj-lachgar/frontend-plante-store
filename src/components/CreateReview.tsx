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
import { PenBox } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Star from "react-star-ratings";
import CreateReviewHandler from "../integration/create-review";

function CreateReview({ id }: { id: string }) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState<null | string>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const CreateHandler = async () => {
    if (!content) {
      toast.error("content required", { duration: 2000 });
      return;
    }
    const res = await CreateReviewHandler(id, rating, content);
    if (!res) {
      toast.error("same thing wrong", { duration: 2000 });
      return;
    }

    window.location.reload();
  };
  return (
    <>
      <Button onClick={onOpen}>
        <PenBox />
      </Button>
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
                rating={rating}
              />
              <Textarea
                className="h-[50px]"
                placeholder="Entre your feed back..."
                onChange={(e) => setContent(e.currentTarget.value)}
              />

              <div className=" flex w-full justify-end gap-x-3 items-center relative">
                <Button
                  onClick={CreateHandler}
                  backgroundColor={"rgb(59 130 246)"}
                  color={"white"}
                >
                  Save
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

/**  */

export default CreateReview;
