import { useNavigate, useParams } from "react-router-dom";
import Container from "../../../components/Container";
import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { MdDelete } from "react-icons/md";

const ManageProduct = () => {
  const navigate = useNavigate();
  const { setLoader, progress, setProgress } =
    useContext(AppContext);
  const { id } = useParams();

  const [files, setFiles] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({});

  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const getProductDetails = async (id) => {
    try {
      setProgress(progress + 10);
      setLoader(true);
      const response = await axios.get(`/ecommerce/products/${id}`);
      setProductDetails([response.data.data]);
      setUpdatedProduct(response.data.data);
      setProgress(progress + 100);
      setLoader(false);
    } catch (err) {
      toast.error(err.message);
      setProgress(progress + 100);
      setLoader(false);
    }
  };
  const handleInputChange = (e, field) => {
    setUpdatedProduct({
      ...updatedProduct,
      [field]: e.target.value,
    });
    setIsSaveDisabled(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFiles([file]);

      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("category", updatedProduct.category);
      formData.append("description", updatedProduct.description);
      formData.append("mainImage", files[0]);
      formData.append("name", updatedProduct.name);
      formData.append("price", updatedProduct.price);
      formData.append("stock", updatedProduct.stock);

      const response = await axios.patch(
        `/ecommerce/products/${id}`,
        formData,
        { withCredentials: true }
      );

      // Handle the response as needed
      // console.log(response.data);
      toast.success("Product updated Successfully");
      getProductDetails(id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getProductDetails(id);
  }, []);
  return (
    <Container>
      {productDetails.map((product) => (
        <div key={id} className="flex justify-center space-x-5">
          <div className="flex">
            <div className="flex justify-between">
              <p>ID: {product._id}</p>
              <p className="text-green-500">stock: {product.stock}</p>
            </div>
            <div className="flex-col space-y-3">
              <img
                className="w-fit h-full"
                src={product.mainImage.url}
                alt={product.name}
              />
              <p className="text-center text-xl">&#8377; {product.price}</p>
              <Button
                classname="bg-red-500 hover:bg-red-700"
                onClick={async () => {
                  try {
                    await axios.delete(`/ecommerce/products/${id}
                `);
                    toast.success("Product deleted Successfully");
                    navigate("/admin/product");
                  } catch (err) {
                    console.log(err);
                    toast.error("something went wrong");
                  }
                }}
              >
                <MdDelete />
              </Button>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <h1 className="text-3xl mb-3 uppercase">Manage Product</h1>
                <Input
                  label="Product Name"
                  value={updatedProduct.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  placeholder="Enter ur Product Name"
                />
                <Input
                  label="Description"
                  value={updatedProduct.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  placeholder="Enter ur Last Name"
                />
                <Input
                  label="Price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) => handleInputChange(e, "price")}
                  placeholder="enter product price"
                />
                <Input
                  label="Stock"
                  type="number"
                  value={updatedProduct.stock}
                  onChange={(e) => handleInputChange(e, "stock")}
                  placeholder="Stock"
                />
                <Input
                  label="Main Image"
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e);
                    setIsSaveDisabled(false);
                  }}
                />
                <img
                  src={files.length > 0 ? files[0].preview : ""}
                  alt={files[0]?.name || "Selected Image"}
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />{" "}
                <Button
                  type="submit"
                  classname="mt-3 w-full"
                  onClick={handleSubmit}
                  disabled={isSaveDisabled}
                >
                  update
                </Button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default ManageProduct;
