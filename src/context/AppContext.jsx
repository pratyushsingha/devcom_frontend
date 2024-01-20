import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import ProductItem from "../components/ProductItem";

export const AppContext = createContext();

function getLocalWish() {
  let wishes = localStorage.getItem("wish");
  if (wishes) {
    return JSON.parse(wishes);
  } else {
    return [];
  }
}

export default function AppContextProvider({ children }) {
  const { auth } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [hastNextPage, setHasNextPage] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState();
  const [wishList, setWishList] = useState(getLocalWish());
  const [couponCode, setCouponCode] = useState("");
  const [disCountedTotal, setDisCountedTotal] = useState();
  const [error, setError] = useState(false);
  const [coupon, setCoupon] = useState(false);
  const [allCoupon, setAllCoupon] = useState([]);
  const [progress, setProgress] = useState(0);
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: Number,
    country: "India",
  });
  const [profileInfo, setProfileInfo] = useState({
    avatar: "",
    email: "",
    username: "",
    role: "",
  });

  const [allAddress, setAllAddress] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(Number);
  const [selectedPrice, setSelectedPrice] = useState(1000);
  const [newCategory, setNewCategory] = useState("");
  const [allCoupons, setAllCoupons] = useState([]);

  const getProducts = async () => {
    try {
      setProgress(progress + 10);
      setLoader(true);
      const response = await axios.get(
        `/ecommerce/products?page=${page}&limit=12`
      );
      setProducts(response.data.data.products);
      // console.log(response)
      setHasNextPage(response.data.data.hasNextPage);
      setProgress(progress + 100);
      setLoader(false);
    } catch (err) {
      // alert(err);
      toast.error("Something went wrong while fetching products", err.message);
      setProgress(progress + 100);
      setLoader(false);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get("/ecommerce/categories?page=1&limit=50");
      setCategories(response.data.data.categories);
      // console.log(response.data.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (productId) => {
    try {
      if (localStorage.getItem("accessToken")) {
        const cartItems = await axios.get("/ecommerce/cart", {
          withCredentials: true,
        });

        const cartProductIds = cartItems.data.data.items.map(
          (item) => item.product._id
        );

        if (cartProductIds.includes(productId)) {
          toast.success("already added to cart");
        } else {
          const response = await axios.post(
            `/ecommerce/cart/item/${productId}`,
            {
              withCredentials: true,
            }
          );
          toast.success("Item added to cart");
        }
      } else {
        toast.error("please login to add item in cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("something went wrong");
    }
  };

  const cartItemUpdate = async (id, qty) => {
    try {
      const response = await axios.post(
        `/ecommerce/cart/item/${id}`,
        {
          quantity: qty,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const getCart = async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get("ecommerce/cart", {
        withCredentials: true,
      });
      console.log(response.data.data.items);
      setCartProducts(response.data.data.items);
      setCartTotal(response.data.data.cartTotal);
      setDisCountedTotal(response.data.data.discountedTotal);
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      console.error(err);
      setLoader(false);
      setProgress(progress + 100);
    }
  };

  const cartItemIncrement = async (id, quantity) => {
    try {
      await cartItemUpdate(id, quantity);
      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteFromCart = async (id) => {
    try {
      setLoader(true);
      const response = await axios.delete(`/ecommerce/cart/item/${id}`, {
        withCredentials: true,
      });
      console.log(response);
      getCart();
      setLoader(false);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoader(true);
      const response = await axios.delete("ecommerce/cart/clear");
      console.log(response);
      getCart();
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  function addToWish(id) {
    if (localStorage.getItem("accessToken")) {
      const updatedWish = products.find((item) => item._id === id);
      console.log(updatedWish);
      setWishList([...wishList, updatedWish]);
      toast.success("Item added to wishlist");
    } else {
      toast.error("please login add in wishlist");
      setLoader(false);
    }
  }

  function removeFromWish(id) {
    const removeWish = wishList.filter((item) => item._id !== id);
    setWishList(removeWish);
    toast.success("Item removed from wishlist");
  }

  useEffect(() => {
    localStorage.setItem("wish", JSON.stringify(wishList));
  }, [wishList]);

  const getCoupon = async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get("/ecommerce/coupons");
      setAllCoupons(response.data.data.coupons);
      console.log(response.data.data.coupons);
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      toast.error("something went wrong");
      setProgress(progress + 100);
    }
  };

  const availableCoupons = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "/ecommerce/coupons/customer/available?page=1&limit=10",
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data.coupons);
      setAllCoupon(response.data.data.coupons);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const applyCoupon = async (couponCode) => {
    try {
      const response = await axios.post(
        "/ecommerce/coupons/c/apply",
        {
          couponCode: couponCode,
        },
        {
          withCredentials: true,
        }
      );
      setCoupon(true);
      getCart();
      setCouponCode("");
      setError(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setError(true);
    }
  };

  const removeCoupon = async (couponCode) => {
    try {
      const response = await axios.post(
        "/ecommerce/coupons/c/remove",
        { couponCode: couponCode },
        { withCredentials: true }
      );
      // console.log(response);
      getCart();
      setCoupon(false);
      setError(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const getAddress = async () => {
    try {
      const response = await axios.get("/ecommerce/addresses");
      // console.log(response);
      setAllAddress(response.data.data.addresses);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("ecommerce/addresses", address, {
        withCredentials: true,
      });
      console.log(response);
      getAddress();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    availableCoupons();
  }, [cartProducts]);

  const getProfile = async () => {
    try {
      setLoader(true);
      const response = await axios.get("/users/current-user");
      // console.log(response.data.data.avatar.url);
      setProfileInfo({
        avatar: response.data.data.avatar.url,
        email: response.data.data.email,
        username: response.data.data.username,
        role: response.data.data.role,
      });
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  function handleCategory(e) {
    setSelectedCategory(e.target.value);
    // console.log(e.target.value);
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  function filteredItems(product) {
    return product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  }

  function handlePrice(e) {
    setSelectedPrice(e.target.value);
  }

  function filterData(products, selectedPrice, query) {
    let filteredProducts = products;
    if (query) {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.price <= selectedPrice;
      });
    }

    // if (selectedCategory) {
    //  console.log(selectedCategory)
    // }

    return filteredProducts.map(function (product) {
      return (
        <ProductItem
          key={product._id}
          _id={product._id}
          name={product.name}
          mainImage={product.mainImage.url}
          price={product.price}
        />
      );
    });
  }

  const result = filterData(products, selectedPrice, query);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      setProgress(progress + 10);
      setLoader(true);
      const data = await axios.post(
        "/ecommerce/categories",
        { name: newCategory },
        { withCredentials: true }
      );
      getCategory();
      toast.success("Category Created Successfully");
      setProgress(progress + 100);
      setLoader(false);
    } catch (err) {
      toast.error("something went wrong while adding category");
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    getProfile();
    getCart();
  }, []);
  const value = {
    getProducts,
    products,
    addToCart,
    quantity,
    setQuantity,
    cartItemUpdate,
    categories,
    getCategory,
    getCart,
    cartItemIncrement,
    DeleteFromCart,
    cartProducts,
    cartTotal,
    clearCart,
    wishList,
    addToWish,
    removeFromWish,
    applyCoupon,
    couponCode,
    setCouponCode,
    disCountedTotal,
    setDisCountedTotal,
    error,
    removeCoupon,
    coupon,
    allCoupon,
    address,
    setAddress,
    saveAddress,
    getAddress,
    allAddress,
    profileInfo,
    setProfileInfo,
    getProfile,
    loader,
    setLoader,
    selectedCategory,
    handleCategory,
    handleInputChange,
    selectedPrice,
    handlePrice,
    query,
    result,
    filteredItems,
    page,
    setPage,
    progress,
    setProgress,
    hastNextPage,
    newCategory,
    setNewCategory,
    createCategory,
    getCoupon,
    allCoupons
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
