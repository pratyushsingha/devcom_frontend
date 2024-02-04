import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { jwtDecode } from "jwt-decode";
// import { Spinner } from "../loader/Spinner";

const AdminAuthLayout = ({ children, adminAuth = true }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const { loader } = useContext(AppContext);

  useEffect(() => {
    if (adminAuth && !localStorage.getItem("accessToken")) {
      toast({
        title: "error",
        description: "u are not authorized user",
      });
      navigate("/login");
    } else if (
      adminAuth &&
      localStorage.getItem("accessToken") &&
      jwtDecode(JSON.stringify(localStorage.getItem("accessToken"))).role ===
        "ADMIN"
    ) {
      navigate("/admin/dashboard");
    }
  }, [navigate, adminAuth]);
  return loader ? "loading..." : <>{children}</>;
};

export default AdminAuthLayout;
