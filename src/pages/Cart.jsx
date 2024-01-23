import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { MdRemoveCircle } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { BsFillBagHeartFill } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import Coupon from "../components/Coupon";
import Container from "../components/Container";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const Cart = () => {
  const {
    getCart,
    cartProducts,
    cartTotal,
    clearCart,
    couponCode,
    setCouponCode,
    error,
    applyCoupon,
    disCountedTotal,
    removeCoupon,
    coupon,
    wishList,
    allCoupon,
  } = useContext(AppContext);

  useEffect(() => {
    getCart();
  }, []);
  return (
    <Container>
      {cartProducts.length > 0 ? (
        <>
          <div className="container mx-auto mt-10">
            <div className="flex space-x-4 shadow-md my-10">
              <Card className="w-3/4 bg-[#0E1629] px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <div className="flex space-x-5">
                    <div className="flex">
                      <Link to="/wishlist">
                        <button className="mt-2">
                          <BsFillBagHeartFill className="self-center text-2xl" />
                        </button>
                      </Link>
                      <p className="bg-red-500 w-4 h-4 pl-1 rounded-full text-xs text-white">
                        {wishList.length}
                      </p>
                    </div>
                    <h2 className="font-semibold text-4xl">
                      {cartProducts.length} Items
                    </h2>
                    <button onClick={() => clearCart()}>
                      <MdRemoveCircle className="self-center text-red-500 text-2xl" />
                    </button>
                  </div>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Price
                  </h3>
                </div>
                <ScrollArea className="h-72 w-full rounded-md border p-4">
                  {cartProducts.map((item, index) => (
                    <CartItem item={item} key={index} />
                  ))}
                </ScrollArea>
                <Link
                  to={"/products"}
                  className="flex font-semibold text-indigo-600 text-sm mt-10"
                >
                  <svg
                    className="fill-current mr-2 text-indigo-600 w-4"
                    viewBox="0 0 448 512"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </Link>
              </Card>
              <Card id="summary" className="w-1/4 px-8 py-10">
                <div className="flex justify-between">
                  <h1 className="font-semibold text-2xl pb-8">Order Summary</h1>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="pb-8 flex">
                        <BiSolidOffer className="text-3xl" />
                        <p className="bg-red-500 w-4 h-4 rounded-full text-xs text-white">
                          {allCoupon.length}
                        </p>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          available coupons
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-center gap-4">
                          {allCoupon.length > 0 ? (
                            allCoupon.map((item) => (
                              <Coupon key={item._id} item={item} />
                            ))
                          ) : (
                            <p className="mx-5 text-center my-3 font-semibold">
                              add more item to avail coupon
                            </p>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <hr />
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Items {cartProducts.length}
                  </span>
                  <span className="font-semibold text-sm">₹ {cartTotal}</span>
                </div>
                <div>
                  <Label
                    htmlFor="couponCode"
                    className="text-green-500 font-semibold inline-block mb-3 text-sm uppercase "
                  >
                    Have a Coupon Code??
                  </Label>
                  {coupon == true ? (
                    <div className="text-center p-2 rounded-md bg-green-300 text-green-800">
                      <span>Coupon applied successfully</span>
                      <button onClick={() => removeCoupon(couponCode)}>
                        <RxCross2 className="text-2xl self-center" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex space-x-2">
                        <Input
                          id="couponCode"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          type="text"
                          className="uppercase"
                          placeholder="enter your coupon"
                        />
                        {couponCode && (
                          <Button onClick={() => applyCoupon(couponCode)}>
                            Apply
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                  {error && (
                    <p className="text-center p-2 rounded-md bg-red-300 text-red-800">
                      Invalid Coupon
                    </p>
                  )}
                </div>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Cart Total</span>
                    <span>₹ {cartTotal}</span>
                  </div>
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>To Pay</span>
                    <span>
                      ₹ {disCountedTotal < 0 ? cartTotal : disCountedTotal}
                    </span>
                  </div>
                  <Link to="/shipping">
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl mb-4">cart is empty</h1>
            <Link to="/products">
              <Button>
                Buy now
              </Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
