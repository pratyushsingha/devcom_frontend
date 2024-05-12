import { Link } from "react-router-dom";

const ProductItem = ({ name, _id, price, mainImage }) => {
  return (
    <Link to={`/product/${_id}`}>
      <section className="flex flex-col justify-center items-center">
        <img className="rounded w-6/12 h-auto " src={mainImage} alt={name} />
        <p className="text-xs my-2 md:text-base text-center font-semibold">
          {name.slice(0, 20)}...
        </p>
        <p className="text-center font-bold text-lg">&#8377;{price}</p>
      </section>
    </Link>
  );
};

export default ProductItem;
