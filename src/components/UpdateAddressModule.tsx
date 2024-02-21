import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  resolvers,
  TUpateAddressCredentials,
} from "../validator/update-address-validator";
import cn from "classnames";
import toast from "react-hot-toast";
import UpdateAddressHandler from "../integration/update-address";

type TProps = {
  currentCity: string;
  currentStreet: string;
  currentCountry: string;
  currentCodePostal: number;
  id: string;
  load: boolean;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};

function UpdateAddressModule({
  currentCity,
  currentCodePostal,
  currentCountry,
  currentStreet,
  id,
  load,
  setLoad,
}: TProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TUpateAddressCredentials>({
    resolver: resolvers,
  });

  const SubmitHandler = async (params: TUpateAddressCredentials) => {
    if (
      params.city == currentCity &&
      params.street == currentStreet &&
      params.country == currentCountry &&
      parseInt(params.codePostal) == currentCodePostal
    ) {
      toast.error("you change nothing", { duration: 3000 });
      return;
    }
    setLoading(true);
    const res = await UpdateAddressHandler(
      id,
      params.city,
      params.street,
      params.country,
      parseInt(params.codePostal)
    );
    setLoading(false);
    if(!res){
        toast.error('internal error please wait to fix probleme' ,{duration: 3000});
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
          <ModalHeader>Add Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              className="lg:px-5 px-2"
              onSubmit={handleSubmit(SubmitHandler)}
            >
              <div className=" flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-1  w-full">
                  <label>Country</label>
                  <Input
                    defaultValue={currentCountry}
                    placeholder="entre your country..."
                    {...register("country")}
                    className={cn(
                      errors.country
                        ? "focus:border-red-400 border"
                        : "focus:border-green-400"
                    )}
                  />
                  {errors.country ? (
                    <p className="text-xs italic text-red-500">
                      {errors.country.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-y-1  w-full">
                  <label>City</label>
                  <Input
                    defaultValue={currentCity}
                    placeholder="entre your country..."
                    {...register("city")}
                    className={cn(
                      errors.city
                        ? "focus:border-red-400 border"
                        : "focus:border-green-400"
                    )}
                  />
                  {errors.city ? (
                    <p className="text-xs italic text-red-500">
                      {errors.city.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-y-1  w-full">
                  <label>Streat</label>
                  <Input
                    defaultValue={currentStreet}
                    placeholder="entre your country..."
                    {...register("street")}
                    className={cn(
                      errors.street
                        ? "focus:border-red-400 border"
                        : "focus:border-green-400"
                    )}
                  />
                  {errors.street ? (
                    <p className="text-xs italic text-red-500">
                      {errors.street.message}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-y-1  w-full">
                  <label>Code Postal</label>
                  <Input
                    defaultValue={currentCodePostal}
                    type="number"
                    placeholder="entre your country..."
                    {...register("codePostal")}
                    className={cn(
                      errors.codePostal
                        ? "focus:border-red-400 border"
                        : "focus:border-green-400"
                    )}
                  />
                  {errors.codePostal ? (
                    <p className="text-xs italic text-red-500">
                      {errors.codePostal.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-5 flex justify-between items-center">
                <Button
                  variant="ghost"
                  mr={3}
                  onClick={onClose}
                  border={"2px solid gray"}
                >
                  Close
                </Button>
                <Button
                  colorScheme="blue"
                  type="submit"
                  isLoading={loading}
                  cursor={loading ? "not-allowed" : "pointer"}
                >
                  Save
                </Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateAddressModule;
