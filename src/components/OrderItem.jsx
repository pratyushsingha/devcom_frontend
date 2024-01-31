import moment from "moment";
import { Badge } from "./ui/badge";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useOrder from "@/hooks/useOrder";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

const OrderItem = ({ item }) => {
  const {
    orderedProducts,
    customer,
    address,
    order,
    couponCode,
    orderDetails,
  } = useOrder();

  return (
    <div className="flex items-center hover:bg-[#00001e] -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <p>{moment(item.createdAt).format("LL")}</p>
      </div>
      <div className="flex justify-center w-1/5">
        <Badge className="mx-2 border text-center w-8">
          {item.totalOrderItems}
        </Badge>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ₹ {item.discountedOrderPrice}
      </span>
      <div className="text-center w-1/5 font-semibold text-sm">
        {item.orderPrice - item.discountedOrderPrice === 0 ? (
          <span className="text-red-500">none</span>
        ) : (
          <span className="text-green-800">
            - ₹ {item.orderPrice - item.discountedOrderPrice}
          </span>
        )}
      </div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            onMouseEnter={() => orderDetails(item._id)}
            variant="destructive"
            size="sm"
          >
            {item.status}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          {orderedProducts.map((product) => (
            <Link to={`/product/${product.product._id}`} key={product._id}>
              <div className="flex justify-between space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={product.product.mainImage.url}
                  alt={product.product.name}
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {product.product.name}
                  </h4>
                  <p className="text-sm">
                    {product.product.description.slice(0, 54)}...
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-muted-foreground">
                      ₹ {product.product.price}
                    </span>
                  </div>
                </div>
              </div>
              <Separator className="my-2" />
            </Link>
          ))}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default OrderItem;
