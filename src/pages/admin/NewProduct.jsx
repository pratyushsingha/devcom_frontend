import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import Input from "../../components/Input";
import axios from "axios";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import Select from "../../components/Select";
import { AppContext } from "../../context/AppContext";
import { CiCirclePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const NewProduct = () => {
  const dialogRef = useRef(null);
  const {
    categories,
    getCategory,
    newCategory,
    setNewCategory,
    createCategory,
  } = useContext(AppContext);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e, field) => {
    setProduct({
      ...product,
      [field]: e.target.value,
    });
    setIsDisabled(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage([file]);

      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  //   const handleSubImageChange = () => {
  //     setSubImages([...subImages, ...e.target.files]);
  //   };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("mainImage", mainImage[0]);
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      //   for (let i = 0; i < subImages.length; i++) {
      //     formData.append("subImages", subImages);
      //   }
      const data = await axios.post("/ecommerce/products", formData, {
        withCredentials: true,
      });
      toast.success("Product Created Successfully");

      //   console.log(data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 422) {
        toast.error("please fill all the fields");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container>
      <div className="flex-col justify-center items-center">
        <form onSubmit={createProduct}>
          <h1 className="text-3xl mb-3 uppercase">Manage Product</h1>
          <Input
            label="Product Name"
            value={product.name}
            onChange={(e) => handleInputChange(e, "name")}
            placeholder="Enter ur Product Name"
          />
          <Input
            label="Description"
            value={product.description}
            onChange={(e) => handleInputChange(e, "description")}
            placeholder="Enter product description"
          />
          <Input
            label="Price"
            type="number"
            value={product.price}
            onChange={(e) => handleInputChange(e, "price")}
            placeholder="enter product price"
            required
          />
          <div className="flex space-x-3 my-3 rounded">
            <Select
              label="select an category"
              options={categories}
              onChange={(e) => handleInputChange(e, "category")}
            />
            <dialog ref={dialogRef}>
              <div className="flex">
                <h1 className="uppercase text-gray-500 mx-20 my-5 font-semibold">
                  Create Category
                </h1>
                <button
                  className="text-3xl"
                  type="button"
                  onClick={() => dialogRef.current.close()}
                >
                  <RxCross2 />
                </button>
              </div>
              <Input
                label="category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button
                onClick={(e) => {
                  createCategory(e);
                  dialogRef.current.close();
                }}
                type="submit"
              >
                Create
              </Button>
            </dialog>
            <button
              type="button"
              className="text-3xl"
              onClick={() => dialogRef.current.showModal()}
            >
              <CiCirclePlus />
            </button>
          </div>
          <Input
            label="Stock"
            type="number"
            value={product.stock}
            onChange={(e) => handleInputChange(e, "stock")}
            placeholder="enter product stock"
          />
          <Input
            label="Main Image"
            type="file"
            onChange={(e) => {
              handleFileChange(e);
              setIsDisabled(false);
            }}
          />
          {/* <Input
            label="SubImages"
            type="file"
            onChange={handleSubImageChange}

          /> */}
          <img
            src={mainImage.length > 0 ? mainImage[0].preview : ""}
            alt={mainImage[0]?.name || "Selected Image"}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />{" "}
          <Button
            disabled={isDisabled}
            type="submit"
            classname="mt-3 w-full"
            onClick={createProduct}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default NewProduct;
