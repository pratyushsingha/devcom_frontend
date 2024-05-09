import { Outlet } from "react-router-dom";
import { Navbar } from "./components/index";
import "./index.css";
import LoadingBar from "react-top-loading-bar";
import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import CartContextProvider, { CartContext } from "./context/CartContext";

function App() {
  const { progress, setProgress } = useContext(AppContext);
  return (
    <>
      <LoadingBar
        color="#3F51B5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        shadow="true"
        className="pb-1"
      />
      <div className="mx-20 my-4">
        <CartContextProvider>
          <Navbar />
        </CartContextProvider>
        <Outlet />
      </div>
    </>
  );
}

export default App;
