import { createContext, useCallback, useContext, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export const AddressContext = createContext();

export default function AddressContextProvider({ children }) {
  const { toast } = useToast();
  const { setLoader, setProgress, progress } = useContext(AppContext);
  const [allAddress, setAllAddress] = useState([]);
  const [address, setAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: Number,
    country: "India",
  });

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
      // console.log(response);
      setAllAddress([...allAddress, response.data.data]);
      toast({
        title: "Address saved",
        description: `${response.data.message}`,
      });
    } catch (err) {
      console.log(err);
      toast({
        varinat: "destructive",
        title: "error",
        description: `${err.response?.data?.message}`,
      });
    }
  };

  const getAddress = useCallback(async () => {
    setLoader(true);
    setProgress(progress + 30);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/addresses`,
        { withCredentials: true }
      );
      setAllAddress(response.data.data);
      setLoader(false);
      setProgress(progress + 100);
    } catch (err) {
      console.log(err);
      toast({
        varinat: "destructive",
        title: "error",
        description: `${err.response?.data?.message}`,
      });
      setLoader(false);
      setProgress(progress + 100);
    }
  }, [setAddress, setAllAddress, saveAddress]);

  const values = {
    setAddress,
    setAllAddress,
    saveAddress,
    getAddress,
    address,
    allAddress,
  };

  return (
    <AddressContext.Provider value={values}>{children}</AddressContext.Provider>
  );
}
