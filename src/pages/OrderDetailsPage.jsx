import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderContext } from "@/context/OrderContext";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const OrderStatusBar = ({ item }) => {
  const [status, setStatus] = useState(null);
  let barWidth = 0;

  setTimeout(() => {
    setStatus(item.status);
  }, 1000);

  switch (status) {
    case "PENDING":
      barWidth = 10;
      break;
    case "DELIVERED":
      barWidth = 100;
      break;
    case "CANCELLED":
      barWidth = 100;
      break;
    default:
      break;
  }

  const barColor = () => {
    switch (status) {
      case "PENDING":
        return "yellow";
      case "DELIVERED":
        return "green";
      case "CANCELLED":
        return "red";
      default:
        return "none";
    }
  };

  const changeColor = () => ({
    width: `${barWidth}%`,
    background: barColor(),
    height: "7px",
    borderRadius: "20px",
    transition: "width 0.5s",
    marginBottom: "3px",
  });

  return (
    <div className="bg-slate-800 rounded-xl h-2">
      <div style={changeColor()}>
        <span className="pt-2 text-xs text-slate-400">PENDING </span>
        <span className="transition-opacity duration-500 ease-in-out opacity-0">
          ⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼⎼
        </span>
        <span className="pt-2 text-xs text-slate-400">
          {status !== "PENDING" && status}
        </span>
      </div>
    </div>
  );
};

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { orderedProducts, order, orderDetails } = useContext(OrderContext);
  useEffect(() => {
    orderDetails(orderId);
  }, []);

  return (
    <Container>
      {order.map((item, index) => (
        <>
          <Card key={index} className="my-3 bg-[#0E1629]">
            <CardHeader>
              <CardTitle className="h3">Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold my-2">
                {item.customer.username.toUpperCase()}
              </p>
              <span className="text-slate-400 text-xs">
                {item.address.addressLine1}
              </span>
              {", "}
              <span className="text-slate-400 text-xs">
                {item.address.addressLine2}
              </span>
              <p className="text-slate-400 text-xs">
                {item.address.city},{item.address.state},{item.address.pincode}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#0E1629]">
            <CardHeader>
              <CardTitle className="h3">Ordered Items</CardTitle>
            </CardHeader>
            <CardContent>
              {orderedProducts.map((product) => (
                <>
                  <section
                    key={product.product._id}
                    className="flex justify-between my-5"
                  >
                    <Link to={`/product/${product.product._id}`}>
                      <div className="flex space-x-3">
                        <img
                          className="w-20 h-20 rounded"
                          src={product.product.mainImage}
                          alt={product.product.name}
                        />
                        <div className="w-full">
                          <p className="font-bold w-10/12">
                            {product.product.name.length > 15
                              ? `${product.product.name.slice(0, 15)} ...`
                              : product.product.name}
                          </p>
                          <Badge>{product.quantity}</Badge>
                        </div>
                      </div>
                    </Link>
                    <OrderStatusBar item={item} />
                  </section>
                  {orderedProducts.length > 1 && <Separator />}
                </>
              ))}
            </CardContent>
          </Card>
        </>
      ))}
    </Container>
  );
};

export default OrderDetailsPage;
