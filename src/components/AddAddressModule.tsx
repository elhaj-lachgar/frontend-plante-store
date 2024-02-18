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
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import {
  TAddAddressCredentials,
  resolver,
} from "../validator/add-address-validator";
import AddAddresse from "../integration/add-address";
import toast from "react-hot-toast";

function AddAddressModule() {
  const [ loading , setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TAddAddressCredentials>({
    resolver,
  });

  const SubmitHandler = async (params: TAddAddressCredentials) => {
    const res = await AddAddresse(params.country , params.city , params.street , parseInt(params.codePostal))
    if(!res){
      setLoading(false);
      toast.error("same thing gose wrong",{
        className : "bg-red-300"
      })
      return;
    }
    else{
      setLoading(false);
      toast.success("add address successful");
      window.location.reload();
      return;
    }
  };
  return (
    <>
      <Button
        width={"100%"}
        leftIcon={<Plus className="text-blue-700" />}
        color={"rgb(29 78 216)"}
        onClick={onOpen}
      >
        Add Address
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
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
                <Button variant="ghost" mr={3} onClick={onClose} border={"2px solid gray"}>
                  Close
                </Button>
                <Button colorScheme="blue" type="submit" isLoading={loading}>
                  Secondary Action
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

export default AddAddressModule;
