import { useCallback, useContext, useState, createContext } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { CartContext } from "./CartContext";

export const CouponContext = createContext();

export default function CouponContextProvider({ children }) {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState([]);
  const [couponUpdate, setCouponUpdate] = useState({
    couponCode: "",
    discountValue: Number,
    name: "",
  });
  const [allCoupon, setAllCoupon] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState(false);
  const { progress, setProgress, page, setLoader } = useContext(AppContext);
  const { setCartProducts, getCart, cartProducts } = useContext(CartContext);

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
      setCouponCode(couponCode);
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
        `${import.meta.env.VITE_BACKEND_URL}/coupons/c/remove`,
        { couponCode: couponCode },
        { withCredentials: true }
      );
      getCart();
      // setCartProducts([...cartProducts, { coupon: null }]);
      setCouponCode("");
      setCoupon(false);
      setError(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const availableCoupons = useCallback(async () => {
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
      toast({
        title: "error",
        description: err.response.data.message,
      });
      setLoader(false);
    }
  }, [applyCoupon, removeCoupon, setCartProducts, getCart]);

  const updateCoupon = async (couponId, e) => {
    e.preventDefault();
    try {
      setProgress(progress + 10);
      setLoader(true);
      const data = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/coupons/${couponId}`,
        couponUpdate,
        { withCredentials: true }
      );
      console.log(coupons);
      const couponIndex = coupons.findIndex((coupon) => coupon._id == couponId);
      const updatedCoupons = [...coupons];
      updatedCoupons[couponIndex] = data.data.data;
      setCoupons(updatedCoupons);
      toast({
        title: "success",
        description: data.data.message,
      });
      setProgress(progress + 100);
      setLoader(false);
    } catch (err) {
      console.log(err);
      toast({
        title: "error",
        description: err.response.data?.message,
      });
      setProgress(progress + 100);
      setLoader(false);
    }
  };

  const deleteCoupon = async (couponId, e) => {
    try {
      setProgress(progress + 10);
      setLoader(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/coupons/${couponId}`,
        {
          withCredentials: true,
        }
      );
      setProgress(progress + 100);
      setLoader(false);
      toast({
        title: "success",
        description: response.data.message,
      });
      setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
    } catch (err) {
      console.log(err);
      toast({
        title: "error",
        description: err.response.data.message,
      });
      setProgress(progress + 100);
      setLoader(false);
    }
  };

  const getAdminCoupon = useCallback(async () => {
    setProgress(progress + 30);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/coupons?page=${page}&limit=12`,
        { withCredentials: true }
      );
      //   console.log(response);
      setCoupons(response.data.data.coupons);
      setProgress(progress + 100);
    } catch (error) {
      console.log(error);
      setProgress(progress + 100);
      toast({
        variant: "destructive",
        title: "error",
        description: `${error.response.data.message}`,
      });
      setProgress(progress + 100);
    }
  }, [updateCoupon, deleteCoupon]);

  const values = {
    getAdminCoupon,
    deleteCoupon,
    updateCoupon,
    couponUpdate,
    setCouponUpdate,
    coupons,
    page,
    setCoupons,
    allCoupon,
    coupon,
    couponCode,
    getCoupon,
    availableCoupons,
    applyCoupon,
    removeCoupon,
    setAllCoupon,
    allCoupon,
    error,
    allCoupons,
  };
  return (
    <CouponContext.Provider value={values}>{children}</CouponContext.Provider>
  );
}
