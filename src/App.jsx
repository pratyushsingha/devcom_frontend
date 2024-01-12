import { Outlet } from "react-router-dom";
import { Navbar } from "./components/index";
import "./index.css";

function App() {
  return (
    <div className="mx-20 my-4">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
