import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <section className="flex flex-col justify-center items-center">
        <img
          className="rounded-xl w-3/4 items-center"
          src={product.mainImage.url}
          alt={product.name}
        />
        <p className="text-xs md:text-base text-center font-semibold">
          {product.name}
        </p>
        <p className="text-center font-bold text-lg">&#8377;{product.price}</p>
      </section>
    </Link>
  );
};

export default ProductItem;
