import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Container from "@/components/Container";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatuses } from "@/utils";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import useOrder from "@/hooks/useOrder";
import { OrderContext } from "@/context/OrderContext";

const ManageOrder = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const {
    orderedProducts,
    order,
    orderDetails,
    updateStatus,
    orderStatus,
    setOrderStatus,
  } = useContext(OrderContext);

  useEffect(() => {
    orderDetails(id);
  }, [id]);


  return (
    <Container className="flex flex-col md:flex-row space-y-3 justify-center items-center h-screen md:space-x-3">
      <>
        <Card className="h-[650px] w-[500px]">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="scroll-m-20 text-3xl font-semibold tracking-tight">
              Ordered Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="my-2">
              <div className="flex-col space-y-2">
                {orderedProducts.map((product) => (
                  <div key={product._id} className="space-y-2">
                    {product.product && (
                      <div className="flex justify-between">
                        <div className="flex space-x-3">
                          <img
                            className="w-20 h-20 rounded"
                            src={product.product.mainImage}
                            alt={product.product.name}
                          />
                          <p className="self-center">{product.product.name}</p>
                        </div>
                        <p className="self-center">
                          ₹ {product.product.price} X {product.quantity}= ₹{" "}
                          {product.product.price * product.quantity}
                        </p>
                      </div>
                    )}
                    <Separator />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {order.map((item) => (
          <Card className="w-[380px] h--[550px] ">
            <CardHeader>
              <CardTitle className="scroll-m-20 text-3xl font-semibold tracking-tight">
                Order Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight my-2">
                Customer Details
              </h3>
              <p>
                <span className="text-purple-500 font-semibold">Name</span>:{" "}
                {item.customer.username}
              </p>
              <p>
                <span className="text-purple-500 font-semibold">Contact</span>:{" "}
                {item.customer.email}
              </p>
              <p>
                <span className="text-purple-500 font-semibold">Address</span>:
                {item.address.addressLine1},{item.address.addressLine2},{" "}
                {item.address.city},{item.address.state},{item.address.country}
                ,pin-
                {item.address.pincode}
              </p>
              <Separator />
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight my-2">
                order Info:
              </h3>
              <p>
                <span className="text-purple-500 font-semibold">paymentId</span>
                : <code>{item.paymentId}</code>
              </p>
              <p>
                <span className="text-purple-500 font-semibold">Subtotal</span>:
                ₹ {item.orderPrice}
              </p>
              <p>
                <span className="text-purple-500 font-semibold">Discount</span>:
                ₹ {item.disCountedOrderPrice - item.orderPrice}
              </p>
              <p>
                <span className="text-purple-500 font-semibold">
                  Coupon Code
                </span>
                :
                {order.coupon == null ? (
                  <span className="text-red-500 font-semibold">none</span>
                ) : (
                  <span className="text-green-500 font-semibold">
                    {item.coupon.couponCode}
                  </span>
                )}
              </p>

              <p>Total: ₹ {item.disCountedOrderPrice}</p>
              <Separator />
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight my-2">
                Shipping info
              </h3>
              <p>
                <span className="text-purple-500 font-semibold">Status</span>:
                {item.status === "CANCELLED" ? (
                  <span className="text-red-500"> CANCELLED</span>
                ) : item.status === "DELIVERED" ? (
                  <span className="text-green-500"> DELIVERED</span>
                ) : (
                  <span className="text-yellow-500"> PENDING</span>
                )}
              </p>
            </CardContent>
            <CardFooter className="justify-center w-full">
              {item.status === "DELIVERED" ? (
                <p className="text-red-500">Order is already delivered</p>
              ) : (
                <div className="flex-col  space-y-3">
                  <Select
                    className="flex justify-center"
                    value={orderStatus.status}
                    defaultValue={orderStatus.status}
                    onValueChange={(value) => setOrderStatus(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>none </SelectLabel>
                        {OrderStatuses.map((status) => (
                          <SelectItem key={status.id} value={status.name}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button
                    className="ml-6"
                    onClick={(e) => {
                      updateStatus(e, id);
                    }}
                  >
                    Process Status
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </>
    </Container>
  );
};

export default ManageOrder;
