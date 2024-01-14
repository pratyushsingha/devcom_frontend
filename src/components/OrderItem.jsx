const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <p>{item._id}</p>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <p className="mx-2 border text-center w-8">{item.totalOrderItems}</p>
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
      <span className="text-center w-1/5 font-semibold text-sm bg-red-500 rounded-lg p-2 text-white">
        {item.status}
      </span>
    </div>
  );
};

export default OrderItem;
