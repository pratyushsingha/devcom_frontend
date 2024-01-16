import toast from "react-hot-toast";
import Container from "../components/Container";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import OrderItem from "../components/OrderItem";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import LoadingBar from "react-top-loading-bar";

const OrderPage = () => {
  const { setLoader } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [progress, setProgress] = useState(0);

  const getOrders = async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get("/ecommerce/profile/my-orders", {
        withCredentials: true,
      });
      setOrders(response.data.data.orders);
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      toast.error("Something went wrong while fetching orders");
      setLoader(false);
      setProgress(progress + 100);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <LoadingBar
        color="#3F51B5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow="true"
        className="pb-1"
      />

      <Container>
        {orders.length > 0 ? (
          <div className="container justify-center items-center mx-auto mt-10">
            <div className="flex shadow-md my-10">
              <div className="mx-auto w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Order List</h1>
                  <div className="flex space-x-5">
                    <h2 className="font-semibold text-4xl">
                      {orders.length} Items
                    </h2>
                  </div>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                    Order ID
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Price
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Discount
                  </h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Status
                  </h3>
                </div>
                {orders.map((order) => (
                  <OrderItem key={order._id} item={order} />
                ))}
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
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl mb-4">Cart is empty</h1>
            <Link to="/products">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
                Buy now
              </button>
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default OrderPage;
