import { Link } from "react-router-dom";

const ProductItem = ({ name, _id, price,mainImage }) => {
  return (
    <Link to={`/product/${_id}`}>
      <section className="flex flex-col justify-center items-center">
        <img
          className="rounded-xl w-3/4 items-center"
          src={mainImage}
          alt={name}
        />
        <p className="text-xs md:text-base text-center font-semibold">
          {name}
        </p>
        <p className="text-center font-bold text-lg">&#8377;{price}</p>
      </section>
    </Link>
  );
};

export default ProductItem;
