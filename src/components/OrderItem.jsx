import { Badge } from "./ui/badge";

const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center hover:bg-[#00001e] -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <p>{item._id}</p>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <Badge className="mx-2 border text-center w-8">{item.totalOrderItems}</Badge>
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
      <Badge className="bg-red-500 hover:bg-red-800">
        {item.status}
      </Badge>
    </div>
  );
};

export default OrderItem;
