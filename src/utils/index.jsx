import { FaShoppingBag, FaUser } from "react-icons/fa";
import { MdDashboard, MdCategory } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";

export const DropDownOptions = [
  {
    id: 1,
    name: "Profile",
    path: "/profile",
    logo: <FaUser className="w-5 h-5 " />,
  },
  {
    id: 2,
    name: "Orders",
    path: "/orders",
    logo: <FaShoppingBag className="w-5 h-5 " />,
  },
  {
    id: 3,
    name: "Wishlist",
    path: "/wishlist",
    logo: <BsFillCartCheckFill className="w-5 h-5 " />,
  },
  {
    id: 4,
    name: "Feedback",
    path: "/feedback",
    logo: <VscFeedback className="w-5 h-5 " />,
  },
];

export const sortFilter = [
  { _id: 1, name: "Price: Low to High" },
  { _id: 2, name: "Price: High to Low" },
  { _id: 3, name: "Sort: A-Z" },
  { _id: 4, name: "Sort: Z-A" },
];

export const couponType = [{ id: 1, name: "FLAT" }];

export const states = [
  { id: 1, name: "Andhra Pradesh" },
  { id: 2, name: "Arunachal Pradesh" },
  { id: 3, name: "Assam" },
  { id: 4, name: "Bihar" },
  { id: 5, name: "Chhattisgarh" },
  { id: 6, name: "Goa" },
  { id: 7, name: "Gujarat" },
  { id: 8, name: "Haryana" },
  { id: 9, name: "Himachal Pradesh" },
  { id: 10, name: "Jammu and Kashmir" },
  { id: 11, name: "Jharkhand" },
  { id: 12, name: "Karnataka" },
  { id: 13, name: "Kerala" },
  { id: 14, name: "Ladakh" },
  { id: 15, name: "Madhya Pradesh" },
  { id: 16, name: "Maharashtra" },
  { id: 17, name: "Manipur" },
  { id: 18, name: "Meghalaya" },
  { id: 19, name: "Mizoram" },
  { id: 20, name: "Nagaland" },
  { id: 21, name: "Odisha" },
  { id: 22, name: "Punjab" },
  { id: 23, name: "Rajasthan" },
  { id: 24, name: "Sikkim" },
  { id: 25, name: "Tamil Nadu" },
  { id: 26, name: "Telangana" },
  { id: 27, name: "Tripura" },
  { id: 28, name: "Uttar Pradesh" },
  { id: 29, name: "Uttarakhand" },
  { id: 30, name: "West Bengal" },
];

export const OrderStatuses = [
  { id: 1, name: "DELIVERED" },
  { id: 2, name: "CANCELLED" },
];

export const adminNavOptions = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    logo: <MdDashboard className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Product",
    path: "/admin/products",
    logo: <FaShoppingBag className="w-5 h-5 " />,
  },
  {
    id: 5,
    name: "Order",
    path: "/admin/orders",
    logo: <FaMoneyBillTrendUp className="w-5 h-5 " />,
  },
  {
    id: 3,
    name: "Category",
    path: "/admin/categories",
    logo: <MdCategory className="w-5 h-5 " />,
  },
  {
    id: 4,
    name: "Coupon",
    path: "/admin/coupons",
    logo: <RiCoupon3Fill className="w-5 h-5 " />,
  },
];
