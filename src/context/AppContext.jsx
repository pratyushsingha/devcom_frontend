import { createContext, useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useToast } from "@/components/ui/use-toast";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [page, setPage] = useState(1);
  const [hastNextPage, setHasNextPage] = useState();
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aOpen, setAopen] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(1000);
  const [selectedSort, setSelectedSort] = useState("");
  const [cHasNextPage, setChasNextPage] = useState();
  const [dOpen, setDopen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  const { toast } = useToast();

  const getProducts = async () => {
    try {
      setProgress(progress + 10);
      setLoader(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products?page=${page}&limit=20`
      );
      setProducts(response.data.data.Products);
      setHasNextPage(response.data.data.hasNextPage);
      setProgress(progress + 100);
      setLoader(false);
    } catch (err) {
      toast.error("Something went wrong while fetching products", err.message);
      setProgress(progress + 100);
      setLoader(false);
    }
  };

  function handleSort(value) {
    setSelectedSort(value);
  }

  function handleCategory(value) {
    setSelectedCategory(value);
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  function filteredItems(product) {
    return product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  }

  function handlePrice(value) {
    setSelectedPrice(value);
  }

  function filterData(products, selectedPrice, selectedCategory, query) {
    let filteredProducts = products;
    if (query) {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.category == selectedCategory;
      });
    }
    if (selectedSort === "Sort: Z-A") {
      filteredProducts = filteredProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else if (selectedSort === "Sort: A-Z") {
      filteredProducts = filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (selectedSort === "Price: Low to High") {
      filteredProducts = filteredProducts.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (selectedSort === "Price: High to Low") {
      filteredProducts = filteredProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    }

    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(function (product) {
        return product.price <= selectedPrice;
      });
    }

    return filteredProducts.map(function (product) {
      return (
        <ProductItem
          key={product._id}
          _id={product._id}
          name={product.name}
          mainImage={product.mainImage}
          price={product.price}
        />
      );
    });
  }

  const result = filterData(products, selectedPrice, selectedCategory, query);
 

 

  useEffect(() => {
    getProducts();
  }, []);

  const value = {
    getProducts,
    products,
    quantity,
    setQuantity,
    error,
    loader,
    setLoader,
    selectedCategory,
    handleCategory,
    handleInputChange,
    selectedPrice,
    handlePrice,
    query,
    result,
    filteredItems,
    page,
    setPage,
    progress,
    setProgress,
    hastNextPage,
    selectedSort,
    handleSort,
    cHasNextPage,
    dOpen,
    setDopen,
    statusFilter,
    setStatusFilter,
    setSelectedCategory,
    setSelectedPrice,
    setSelectedSort,
    setQuery,
    aOpen,
    setAopen,
    setHasNextPage,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
