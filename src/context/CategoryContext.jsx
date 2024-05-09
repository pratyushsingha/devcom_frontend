import { createContext, useContext, useState, useCallback } from "react";
import { AppContext } from "./AppContext";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

export const CategoryContext = createContext();

export default function CategoryContextProvider({ children }) {
  const { setProgress, progress, setLoader, setDopen, page, dOpen } =
    useContext(AppContext);
  const { toast } = useToast();
  const [newCategory, setNewCategory] = useState("");
  const [aOpen, setAopen] = useState(false);
  const [categories, setCategorries] = useState([]);

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
      const updatedCategories = categories.filter(
        (category) => category._id !== categoryId
      );
      setCategorries(updatedCategories);
      setProgress(progress + 100);
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

  const updateCategory = async (e, categoryId, name) => {
    e.preventDefault();
    try {
      setProgress(progress + 10);
      setLoader(true);
      const data = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/categories/${categoryId}`,

        { name: name },
        { withCredentials: true }
      );
      console.log(categories);
      const categoryIndex = categories.findIndex(
        (category) => category._id == categoryId
      );
      const updatedCategory = [...categories];
      updatedCategory[categoryIndex] = data.data.data;
      setCategorries(updatedCategory);
      console.log(data.data.data);
      console.log(categories);
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
        description: err.response.data.message || "something went wrong",
      });
      setLoader(false);
      setProgress(progress + 10);
    }
  };

  const getCategory = useCallback(async () => {
    setProgress(progress + 10);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/categories?page=${page}&limit=10`,
        { withCredentials: true }
      );
      console.log(response);
      setCategorries(response.data.data.categories);
      setProgress(progress + 100);
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: error.response?.data?.message,
      });
      setProgress(progress + 100);
    }
  }, [setCategorries, deleteCategory, updateCategory]);
  const values = {
    createCategory,
    newCategory,
    setNewCategory,
    getCategory,
    categories,
    setCategorries,
    deleteCategory,
    aOpen,
    setAopen,
    updateCategory,
    setDopen,
    dOpen,
  };

  return (
    <CategoryContext.Provider value={values}>
      {children}
    </CategoryContext.Provider>
  );
}
