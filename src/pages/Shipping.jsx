import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import AddressForm from "../components/AddressForm";
import axios from "axios";
import Container from "../components/Container";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Shipping = () => {
  const { setLoader, getAddress } = useContext(AppContext);
  const dialogRef = useRef(null);
  const { allAddress, profileInfo } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState();
  const [generatedOrder, setGeneratedOrder] = useState([]);

  const razorpayPayment = async (selectedAddress) => {
    try {
      setLoader(true);
      const response = await axios.post(
        "/ecommerce/orders/provider/razorpay",
        { addressId: selectedAddress },
        { withCredentials: true }
      );
      console.log(response.data.data.amount);
      setGeneratedOrder(response.data.data);

      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
        amount: generatedOrder.amount,
        currency: generatedOrder.currency,
        name: "devcom",
        description: "payment integration with razorpay",
        image: "https://i.postimg.cc/9FLrHVRz/image-removebg-preview.png",
        order_id: generatedOrder.id,
        callback_url: "/ecommerce/orders/provider/razorpay/verify-payment",
        prefill: {
          name: profileInfo.username,
          email: profileInfo.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#6366F1",
        },
      };
      const paymentObj = new window.Razorpay(options);
      paymentObj.open();
      setLoader(false);
    } catch (err) {
      console.error("Razorpay payment error:", err);
      setLoader(false);
    }
  };
  useEffect(() => {
    getAddress();
  }, []);

  return (
    <Container className="my-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl uppercase">Delivery address</h1>
      {allAddress.length > 0 ? (
        allAddress.map((item) => (
          <RadioGroup
            key={item._id}
            defaultValue={selectedAddress}
            onValueChange={(value) => setSelectedAddress(value)}
          >
            <div className="flex my-2 space-x-2">
              <RadioGroupItem
                checked={selectedAddress == item._id}
                value={item._id}
                id={item._id}
              />
              <Label htmlFor={item._id}>
                {item.addressLine1},{item.addressLine2},{item.city},{item.state}
                ,{item.country},pin-
                {item.pincode}
              </Label>
            </div>
          </RadioGroup>
        ))
      ) : (
        <p>no address found...</p>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="my-2">Add New Address</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>
              add a new address,where u want to ship
            </DialogDescription>
          </DialogHeader>
          <AddressForm />
        </DialogContent>
      </Dialog>
      {selectedAddress && (
        <div>
          <Button onClick={() => razorpayPayment(selectedAddress)}>
            Pay Now
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Shipping;
