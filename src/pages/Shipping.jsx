import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import AddressForm from "../components/AddressForm";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import Container from "../components/Container";

const Shipping = () => {
  const dialogRef = useRef(null);
  const { allAddress } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState();
  const [generatedOrder, setGeneratedOrder] = useState([]);
  const [paymentCredentials, setPaymentCredentials] = useState({
    razorpay_order_id: "",
    razorpay_payment_id: "",
    razorpay_signature: "",
  });

  const razorpayPayment = async (selectedAddress) => {
    try {
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
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "98303556374",
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
    } catch (err) {
      console.error("Razorpay payment error:", err);
    }
  };

  const verifyPayment = async (paymentCredentials) => {
    try {
      const response = await axios.post(
        "/ecommerce/orders/provider/razorpay/verify-payment",
        paymentCredentials,
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="my-10">
      <h1 className="text-2xl uppercase">Delivery address</h1>
      {allAddress.length > 0 ? (
        allAddress.map((item) => (
          <div key={item._id}>
            <label>
              <input
                className="mx-3"
                type="radio"
                name="addressSelection"
                value={item._id}
                checked={selectedAddress === item._id}
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              {item.addressLine1},{item.addressLine2},{item.city},{item.state},
              {item.country},pin-
              {item.pincode}
            </label>
          </div>
        ))
      ) : (
        <p>no address found...</p>
      )}

      <dialog ref={dialogRef}>
        <div className="mx-10 my-5">
          <div className="flex">
            <h1 className="uppercase text-gray-500 mx-20 my-5 font-semibold">
              add address
            </h1>
            <button className="mx-3" onClick={() => dialogRef.current.close()}>
              <RxCross2 className="text-2xl self-center" />
            </button>
          </div>
          <AddressForm />
        </div>
      </dialog>
      <button
        className="bg-indigo-500 font-semibold hover:bg-indigo-600 rounded-md py-3 text-sm text-white uppercase p-3 my-3"
        onClick={() => dialogRef.current.showModal()}
      >
        Add New Address
      </button>

      {selectedAddress && (
        <div>
          <button
            onClick={() => razorpayPayment(selectedAddress)}
            className="bg-indigo-500 font-semibold hover:bg-indigo-600 rounded-md py-3 text-sm text-white uppercase p-3 my-3"
          >
            Pay Now
          </button>
        </div>
      )}
    </Container>
  );
};

export default Shipping;
