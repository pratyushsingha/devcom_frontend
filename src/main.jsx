import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import {
  Home,
  LoginPage,
  SignUpPage,
  ProductPage,
  ProductDetails,
  Cart,
  WishListPage,
  Shipping,
  SuccessPage,
  Profile,
  EditProfile,
  ForgotPassword,
  ResetPass,
  AuthLayout,
} from "./components/index";
import { Toaster } from "@/components/ui/toaster";
import AuthContextProvider from "./context/AuthContext.jsx";
import Error from "./components/Error.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import Products from "./pages/admin/product/Products.jsx";
import ManageProduct from "./pages/admin/product/ManageProduct.jsx";
import NewProduct from "./pages/admin/product/NewProduct.jsx";
import Categories from "./pages/admin/category/Categories.jsx";
import Coupons from "./pages/admin/coupon/Coupons.jsx";
import NewCoupon from "./pages/admin/coupon/NewCoupon.jsx";
import { ThemeProvider } from "./context/theme-provider.jsx";
import Orders from "./pages/admin/order/Orders.jsx";
import ManageOrder from "./pages/admin/order/ManageOrder.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminAuthLayout from "./components/admin/AdminAuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <SignUpPage />
          </AuthLayout>
        ),
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: (
          <AuthLayout authentication>
            {" "}
            <Cart />
          </AuthLayout>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <AuthLayout authentication>
            <WishListPage />
          </AuthLayout>
        ),
      },
      {
        path: "/orders",
        element: (
          <AuthLayout authentication>
            <OrderPage />
          </AuthLayout>
        ),
      },
      {
        path: "/shipping",
        element: (
          <AuthLayout authentication>
            <Shipping />
          </AuthLayout>
        ),
      },
      {
        path: "/paymentSuccess",
        element: (
          <AuthLayout authentication>
            <SuccessPage />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/profile/edit",
        element: (
          <AuthLayout authentication>
            <EditProfile />
          </AuthLayout>
        ),
      },
      {
        path: "/forget-password",
        element: (
          <AuthLayout authentication={false}>
            <ForgotPassword />
          </AuthLayout>
        ),
      },
      {
        path: "/reset-password/:resetToken",
        element: (
          <AuthLayout authentication={false}>
            <ResetPass />
          </AuthLayout>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "dashboard",
        element: (
          <AdminAuthLayout authentication adminAuth>
            <Dashboard />
          </AdminAuthLayout>
        ),
      },
      {
        path: "products",
        element: (
          <AdminAuthLayout adminAuth>
            <Products />
          </AdminAuthLayout>
        ),
      },
      {
        path: "product/:id",
        element: (
          <AdminAuthLayout adminAuth>
            <ManageProduct />
          </AdminAuthLayout>
        ),
      },
      {
        path: "product/new",
        element: (
          <AdminAuthLayout adminAuth>
            <NewProduct />
          </AdminAuthLayout>
        ),
      },
      {
        path: "categories",
        element: (
          <AdminAuthLayout adminAuth>
            <Categories />
          </AdminAuthLayout>
        ),
      },
      {
        path: "coupons",
        element: (
          <AdminAuthLayout adminAuth>
            <Coupons />
          </AdminAuthLayout>
        ),
      },
      {
        path: "coupon/new",
        element: (
          <AdminAuthLayout adminAuth>
            <NewCoupon />
          </AdminAuthLayout>
        ),
      },
      {
        path: "orders",
        element: (
          <AdminAuthLayout adminAuth>
            <Orders />
          </AdminAuthLayout>
        ),
      },
      {
        path: "order/:id",
        element: (
          <AdminAuthLayout adminAuth>
            <ManageOrder />
          </AdminAuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <AppContextProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AppContextProvider>
  </AuthContextProvider>
);
