import { FormatPrice } from "../lib/utils";
import { XCircle } from "lucide-react";
import { Button, Input } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../context/CardStore";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { DeleteItem, SetQuantity } from "../context/CardFeatures";

function LargeCartItem() {
  const { cardItems } = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch();
  return (
    <div className="hidden lg:flex flex-col border pb-4 h-fit">
      {cardItems.length != 0 ? (
        <>
          <TableContainer className="relative">
            <Table variant="simple">
              <Thead className="bg-gray-200">
                <Tr>
                  <Th></Th>
                  <Th>Product</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>SubTotal</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cardItems.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <div className="flex justify-end items-center px-3 gap-x-5">
                        <XCircle
                          color="gray"
                          className="cursor-pointer"
                          onClick={() => dispatch(DeleteItem({ id: item.id }))}
                        />
                        <img
                          src={item.image}
                          className="object-cover w-[100px] h-[100px]"
                        />
                      </div>
                    </Td>
                    <Td> {item.title.substring(0,5) + "..."}</Td>
                    <Td>{FormatPrice(item.price)}</Td>
                    <Td>
                      <div className="flex gap-x-1 items-center">
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
                        <Input
                          type="number"
                          value={item.quantity}
                          width={"50px"}
                        />
                        <Button
                          onClick={() => {
                            if (item.quantity == 1) return;
                            dispatch(
                              SetQuantity({
                                id: item.id,
                                quantity: item.quantity -1 ,
                              })
                            );
                          }}
                        >
                          -
                        </Button>
                      </div>
                    </Td>
                    <Td>
                      {" "}
                      {FormatPrice({
                        value: item.price.value * item.quantity,
                        currency: item.price.currency,
                      })}
                    </Td>
                    <Td></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </div>
  );
}

export default LargeCartItem;
