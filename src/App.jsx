import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetailsPage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import WishList from "./pages/WishListPage";
import Shipping from "./pages/Shipping";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <div className="mx-20 my-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/paymentSuccess" element={<SuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;
