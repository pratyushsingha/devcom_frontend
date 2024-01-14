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
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContext.jsx";
import Error from "./components/Error.jsx";

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
        path: "/shipping",
        element: (
          <AuthLayout authentication>
            <Shipping />
          </AuthLayout>
        ),
      },
      {
        path: "/payment/success",
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <AppContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AppContextProvider>
  </AuthContextProvider>
);
