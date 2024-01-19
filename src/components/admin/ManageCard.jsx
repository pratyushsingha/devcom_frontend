import React, { forwardRef, useId } from "react";
import Button from "../Button";
import Input from "../Input";

const ManageCard = forwardRef(function manageCard(
  {
    heading,
    handleSubmit,
    buttonText,
    updatedProduct,
    handleFileChange,
    handleInputChange,
    setIsSaveDisabled,
    isSaveDisabled,
    classname = "",
    files = [],
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className={`${classname}`}>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl mb-3 uppercase">{heading}</h1>
        <Input
          label="Product Name"
          value={updatedProduct.name}
          onChange={(e) => handleInputChange(e, "name")}
          placeholder="Enter ur Product Name"
          {...props}
        />
        <Input
          label="Description"
          value={updatedProduct.description}
          onChange={(e) => handleInputChange(e, "description")}
          placeholder="Enter ur Last Name"
          {...props}
        />
        <Input
          label="Price"
          type="number"
          value={updatedProduct.price}
          onChange={(e) => handleInputChange(e, "price")}
          placeholder="enter product price"
          id={id}
          {...props}
        />
        <Input
          label="Stock"
          type="number"
          value={updatedProduct.stock}
          onChange={(e) => handleInputChange(e, "stock")}
          placeholder="Stock"
          id={id}
          {...props}
        />
        <Input
          label="Main Image"
          type="file"
          onChange={(e) => {
            handleFileChange(e);
            setIsSaveDisabled(false);
          }}
          {...props}
          id={id}
        />
        <Button className="mt-3 w-full" onClick={(e) => handleSubmit(e)}>
          Save
        </Button>
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
          id={id}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
});

export default ManageCard;
