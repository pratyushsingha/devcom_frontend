import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
// import toast from "react-hot-toast";
import ProductItem from "../components/ProductItem";
import { useToast } from "@/components/ui/use-toast";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const { auth } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [hastNextPage, setHasNextPage] = useState();
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState();
  const [wishList, setWishList] = useState([]);
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(1000);
  const [selectedSort, setSelectedSort] = useState("");
  const [allCoupons, setAllCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cHasNextPage, setChasNextPage] = useState();
  const [dOpen, setDopen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const { toast } = useToast();

  const getProducts = async () => {
    try {
      setProgress(progress + 10);
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products?page=${page}&limit=12`
      );
      setProducts(response.data.data.Products);
      console.log(response.data.data.Products);
      setHasNextPage(response.data.data.hasNextPage);
      setProgress(progress + 100);
      setLoader(false);
    } catch (err) {
      toast.error("Something went wrong while fetching products", err.message);
      setProgress(progress + 100);
      setLoader(false);
    }
  };

  const getCategory = async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/categories?page=${page}&limit=15`
      );
      setCategories(response.data.data.Categories);
      console.log(response);
      setHasNextPage(response.data.data.hasNextPage);
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setProgress(progress + 10);
    }
  };

  const cartItemUpdate = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/item/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getCart = async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart`,

        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data.items);
      setCartProducts(response.data.data.items);
      setCartTotal(response.data.data.cartTotal);
      setDisCountedTotal(response.data.data.discountCartValue);
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
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/item/${id}`,

        {
          withCredentials: true,
        }
      );
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
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/clear`,

        {
          withCredentials: true,
        }
      );

      console.log(response);
      toast({
        title: "Success",
        description: `${response.data.message}`,
      });
      getCart();
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  // function addToWish(id) {
  //   if (localStorage.getItem("accessToken")) {
  //     const updatedWish = products.find((item) => item._id === id);
  //     setWishList([...wishList, updatedWish]);
  //     toast({
  //       title: "Success",
  //       description: "Item added to wishlist",
  //     });
  //   } else {
  //     toast.error("please login add in wishlist");
  //     setLoader(false);
  //   }
  // }

  // function removeFromWish(id) {
  //   const removeWish = wishList.filter((item) => item._id !== id);
  //   setWishList(removeWish);
  //   toast.success("Item removed from wishlist");
  // }

  // useEffect(() => {
  //   localStorage.setItem("wish", JSON.stringify(wishList));
  // }, [wishList]);

  const getCoupon = async () => {
    try {
      setLoader(true);
      setProgress(progress + 10);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/coupons?page=${page}&limit=15`,
        { withCredentials: true }
      );
      console.log(response);
      setAllCoupons(response.data.data.coupons);
      setChasNextPage(response.data.data.hasNextPage);
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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/coupons/customer/available?page=1&limit=10`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setAllCoupon(response.data.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const applyCoupon = async (couponCode) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/coupons/c/apply`,

        {
          couponCode: couponCode,
        },
        {
          withCredentials: true,
        }
      );
      setCoupon(true);
      console.log(couponCode);
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
      // const response = await axios.post(
      //   `${import.meta.env.VITE_BACKEND_URL}/coupons/c/remove`,
      //   { couponCode: couponCode },
      //   { withCredentials: true }
      // );
      console.log(couponCode);
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
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/addresses`,
        { withCredentials: true }
      );
      console.log(response);
      setAllAddress(response.data.data);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/addresses`,

        address,
        {
          withCredentials: true,
        }
      );
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
      setProgress(progress + 10);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/current-user`,
        { withCredentials: true }
      );
      // console.log(response.data.data.avatar.url);

      console.log(response.data.data);

      setProfileInfo({
        avatar: response.data.data.avatar,
        email: response.data.data.email,
        username: response.data.data.username,
        role: response.data.data.role,
      });
      console.log(response);
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      console.log(err);
      setLoader(false);
      setProgress(progress + 100);
    }
  };

  function handleSort(value) {
    setSelectedSort(value);
  }

  function handleCategory(value) {
    setSelectedCategory(value);
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  function filteredItems(product) {
    return product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  }

  function handlePrice(value) {
    setSelectedPrice(value);
  }

  function filterData(products, selectedPrice, selectedCategory, query) {
    let filteredProducts = products;
    if (query) {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.category == selectedCategory;
      });
    }
    if (selectedSort === "Sort: Z-A") {
      filteredProducts = filteredProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else if (selectedSort === "Sort: A-Z") {
      filteredProducts = filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (selectedSort === "Price: Low to High") {
      filteredProducts = filteredProducts.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (selectedSort === "Price: High to Low") {
      filteredProducts = filteredProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.price <= selectedPrice;
      });
    }

    return filteredProducts.map(function (product) {
      return (
        <ProductItem
          key={product._id}
          _id={product._id}
          name={product.name}
          mainImage={product.mainImage}
          price={product.price}
        />
      );
    });
  }

  const result = filterData(products, selectedPrice, selectedCategory, query);
  const handleStatus = (value) => {
    setStatusFilter(value);
  };

  const getOrders = async () => {
    try {
      setProgress(progress + 10);
      setLoader(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/orders/list/admin?status=${statusFilter}&page=${page}&limit=15
      `,
        { withCredentials: true }
      );
      setOrders(response.data.data.orders);
      setHasNextPage(response.data.data.hasNextPage);
      setProgress(progress + 100);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setProgress(progress + 100);
      setLoader(false);
    }
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist`,
        { withCredentials: true }
      );
      console.log(response.data.data.items);
      if (response.data.data.items.length > 0) {
        setWishList(response.data.data.items);
      } else {
        setWishList([]);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      throw err;
    }
  };

  const addToWish = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/${productId}`,
        {},
        { withCredentials: true }
      );
      const product = products.find((item) => item._id == productId);
      setWishList(...wishList, product);
      toast({
        title: "success",
        description: `${response.data.message}`,
      });
    } catch (err) {
      console.log("error in adding to wishlist", err);
      toast({
        variant: "destructive",
        title: "success",
        description: `${err.response.data.message}`,
      });
    }
  };

  const removeFromWish = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/${productId}`,
        { withCredentials: true }
      );

      setWishList(wishList.filter((item) => item.product._id !== productId));
      toast({
        title: "success",
        description: `${response.data.message}`,
      });
    } catch (error) {
      console.log("error in deleting item from wishlist", err);
      toast({
        variant: "destructive",
        title: "success",
        description: `${err.response.data.message}`,
      });
    }
  };

  const [newCategory, setNewCategory] = useState("");
  const [aOpen, setAopen] = useState(false);
  const [adminCategories, setAdminCategorries] = useState([]);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      setProgress(progress + 10);
      setLoader(true);
      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/categories`,

        { name: newCategory },
        { withCredentials: true }
      );
      getCategory();
      toast({
        title: "success",
        description: data.data.message,
      });
      setProgress(progress + 100);
      setLoader(false);
      setDopen(false);
    } catch (err) {
      console.log(err);
      toast({
        title: "error",
        description: err.response.data.message,
      });
      setLoader(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      setProgress(progress + 10);
      setLoader(true);
      const data = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/categories/${categoryId}`,
        { withCredentials: true }
      );
      console.log(categories);
      const updatedCategories = adminCategories.filter(
        (category) => category._id !== categoryId
      );
      console.log(updatedCategories);
      setAdminCategorries(updatedCategories);
      setProgress(progress + 100);
      console.log(categories);

      setLoader(false);
      toast({
        title: "success",
        description: data.data.message,
      });
      setAopen(false);
    } catch (err) {
      toast({
        title: "error",
        description: err.response?.data?.message,
      });
      console.log(err);
      setProgress(progress + 100);
      setLoader(false);
    }
  };

  const getAdminCategory = useCallback(async () => {
    setProgress(progress + 10);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/categories?page=1&limit=10`,
        { withCredentials: true }
      );
      console.log(response);
      setAdminCategorries(response.data.data.categories);
      setProgress(progress + 100);
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: err.response.data.message,
      });
      setProgress(progress + 100);
    }
  }, [setAdminCategorries, deleteCategory]);

  useEffect(() => {
    getProfile();
    getProducts();
  }, []);
  
  const value = {
    getProducts,
    products,
    // addToCart,
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
    getCoupon,
    allCoupons,
    selectedSort,
    handleSort,
    getOrders,
    orders,
    setOrders,
    cHasNextPage,
    dOpen,
    setDopen,
    statusFilter,
    setStatusFilter,
    handleStatus,
    setSelectedCategory,
    setSelectedPrice,
    setSelectedSort,
    setQuery,
    getWishlist,
    setWishList,
    getAdminCategory,
    deleteCategory,
    createCategory,
    aOpen,
    setAopen,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
