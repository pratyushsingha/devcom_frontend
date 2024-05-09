import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { CiHeart } from "react-icons/ci";
import { IoHeartSharp } from "react-icons/io5";
import Container from "../components/Container";
import useCart from "../hooks/useCart";
import { Spinner } from "../components";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import StarRatting from "@/components/StarRatting";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import InputDiv from "@/components/InputDiv";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { WishContext } from "@/context/WishContext";
import { CartContext } from "@/context/CartContext";

const ProductDetails = () => {
  const { toast } = useToast();
  const { addToCart, cartProducts } = useContext(CartContext);
  const { id } = useParams();
  const { setProgress, progress, setWishlist, setLoader, loader } =
    useContext(AppContext);

  const { getWishlist, addToWish, removeFromWish, wishList } =
    useContext(WishContext);

  const [productDetails, setProductDetails] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [productCategory, setProductCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [userReviews, setUserReviews] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      starRatting: 0,
      product: id,
      reviewDescription: "",
      productImage: [],
    },
  });

  const getProductDetails = async (id) => {
    try {
      setProgress(progress + 10);
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`
      );
      setProductDetails(response.data.data);
      setCategoryId(response.data.data.category);
      setProgress(progress + 100);
      setLoader(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "error",
        description: `${err.response?.data?.message}`,
      });
      setProgress(progress + 100);
      setLoader(false);
    }
  };

  const similarProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/products/category/${categoryId}?page=1&limit=5`,
        { withCredentials: true }
      );
      setProductCategory(response.data.data);
      setCategory(response.data.data.name);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.response.data.message}`,
      });
    }
  };

  const getProductReviews = useCallback(
    async (productId) => {
      setReviewLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/${productId}`,
          { withCredentials: true }
        );
        setUserRating(response.data.data.avgStarRating.toFixed(2));
        setUserReviews(response.data.data.reviews);
        setReviewLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "error",
          description: `${error.response.data.message}`,
        });
      }
    },
    [setUserRating, setUserReviews]
  );

  const postReview = async (data) => {
    try {
      const formData = new FormData();
      formData.append("product", data.product);
      formData.append("starRatting", data.starRatting);
      formData.append("reviewDescription", data.reviewDescription);
      if (data.productImage?.length > 0) {
        for (let i = 0; i < data.productImage.length; i++) {
          formData.append("productImage", data.productImage[i]);
        }
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      getProductReviews(id);
      toast({
        title: "success",
        description: `${response.data.message}`,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "success",
        description: error.response?.data.message || "some error occcured",
      });
    }
  };

  useEffect(() => {
    getProductDetails(id);
    if (categoryId) {
      similarProducts(categoryId);
    }
    getProductReviews(id);
  }, [id, categoryId]);

  useEffect(() => {
    getWishlist();
  }, [setWishlist]);

  return (
    <>
      <Container>
        <div>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={productDetails.mainImage}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {category}
                  </h2>
                  <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl text-white font-semibold tracking-tight transition-colors first:mt-0">
                    {productDetails.name}
                  </h1>
                  <StarRatting rating={userRating} fontSize="25px" />
                  <p className="leading-7 [&:not(:first-child)]:mt-6 text-slate-200">
                    {productDetails.description}
                  </p>
                  <div className="flex mt-10">
                    <span className="leading-7 text-2xl [&:not(:first-child)]:mt-6 text-white">
                      &#8377;{productDetails.price}
                    </span>
                    {cartProducts.some((item) => item.product._id === id) ? (
                      <Button className="flex ml-auto">
                        <Link to="/cart">Go to cart</Link>
                      </Button>
                    ) : (
                      <Button
                        className="flex ml-auto"
                        onClick={() => addToCart(id)}
                      >
                        {loader ? (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Add to cart"
                        )}
                      </Button>
                    )}
                    {wishList.length > 0 &&
                    wishList.some((item) => item.product._id === id) ? (
                      <button
                        onClick={() => removeFromWish(id)}
                        className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center ml-4"
                      >
                        <IoHeartSharp className="text-2xl text-gray-600" />
                      </button>
                    ) : (
                      <button
                        onClick={() => addToWish(id)}
                        className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                      >
                        <CiHeart className="text-2xl text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <h1 className="text-2xl -mt-16 mb-5">SIMILAR PRODUCTS</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productCategory.length > 0 ? (
              productCategory.map((item) => (
                <ProductItem
                  key={item._id}
                  _id={item._id}
                  mainImage={item.mainImage}
                  price={item.price}
                  name={item.name}
                />
              ))
            ) : (
              <h3 className="h3">No products available</h3>
            )}
          </div>
        </div>
        <br />
        <div className="grid sm:grid-cols-12 gap-2">
          <Card className="sm:col-span-4 h-fit bg-[#0E1629]">
            <CardHeader>
              <CardTitle className="h3">Customer review</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-3">
              <StarRatting rating={userRating} />
              <span className="self-center">({userRating})</span>
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>Review this products</CardTitle>
              <CardDescription>
                Share your thoughts with other customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger>
                  <Button variant="outline">Write a product review</Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit(postReview)}>
                    <DialogHeader className="my-2">
                      <DialogTitle>Rate this product</DialogTitle>
                      <StarRatting
                        editable
                        rating={rating}
                        setRating={setRating}
                        onClick={(star) => setValue("starRatting", star)}
                      />
                    </DialogHeader>
                    <DialogHeader className="my-2">
                      <DialogTitle>Review this product</DialogTitle>
                      <DialogDescription>
                        <Textarea
                          placeholder="Description..."
                          {...register("reviewDescription", {
                            validate: {
                              minWords: (value) =>
                                value.trim().split(/\s+/).length >= 10 ||
                                "Minimum of 10 words are required",
                            },
                          })}
                        />
                        {errors.reviewDescription && (
                          <p className="text-red-500 font-xs">
                            {errors.reviewDescription.message}
                          </p>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogHeader className="my-2">
                      <InputDiv
                        type="file"
                        label="Review Image"
                        accept="image/png, image/jpg, image/jpeg"
                        multiple
                        {...register("productImage")}
                      />
                    </DialogHeader>
                    <DialogFooter>
                      <Button disabled={isSubmitting} type="submit">
                        {isLoading && (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          <Card className="sm:col-span-7 bg-[#0E1629]">
            <CardHeader>
              <CardHeader>
                <CardTitle className="h3">Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {reviewLoading && <Spinner />}
                {userReviews.length > 0 ? (
                  userReviews.map((review) => (
                    <section key={review._id} className="my-5 ">
                      <div className="flex space-x-3">
                        <img
                          className="rounded-full h-8 w-8"
                          src={review.customer.avatar}
                          alt={review.customer.username}
                        />
                        <span className="font-semibold">
                          {review.customer.username}
                        </span>
                      </div>
                      <div>
                        <StarRatting
                          rating={review.starRatting}
                          fontSize="20px"
                        />
                        {review.reviewDescription.length > 80 && !readMore ? (
                          <>
                            <p className="leading-7 my-2 border-l-2 pl-6 italic">
                              {review.reviewDescription.slice(0, 80)}
                            </p>
                            <button
                              onClick={() => setReadMore(true)}
                              className="text-purple-500"
                            >
                              read more
                            </button>
                          </>
                        ) : review.reviewDescription.length > 80 ? (
                          <>
                            <p className="border-l-2 pl-6 italic">
                              {review.reviewDescription}
                            </p>
                            <button
                              onClick={() => setReadMore(false)}
                              className="text-purple-500"
                            >
                              read less
                            </button>
                          </>
                        ) : (
                          <p className="border-l-2 pl-6 italic my-2">
                            {review.reviewDescription}
                          </p>
                        )}
                        {review.productImage.length > 0 && (
                          <div className="flex space-x-2 h-20 w-20 rounded">
                            {review.productImage.map((image, index) => (
                              <img key={index} src={image} alt={image} />
                            ))}
                          </div>
                        )}
                      </div>
                      <Separator />
                    </section>
                  ))
                ) : (
                  <p className="border-l-2 pl-6 italic">
                    Be the first to review the product
                  </p>
                )}
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default ProductDetails;
