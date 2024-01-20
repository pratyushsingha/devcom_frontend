import { useEffect, useRef, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import Container from "../../../components/Container";
import axios from "axios";
import Button from "../../../components/Button";
import { RxCross2 } from "react-icons/rx";
import Input from "../../../components/Input";
import toast from "react-hot-toast";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { CiCirclePlus } from "react-icons/ci";
import Table from "../../../components/admin/Table";

export const columns = [
  {
    Header: "Category Name",
    accessor: "name",
  },
  {
    Header: "Action",
    accessor: "_id",
    Cell: ({ row }) => {
      const updatedCategoryRef = useRef("");
      const dialogRef = useRef(null);
      const { progress, setProgress, setLoader, getCategory } =
        useContext(AppContext);
      return (
        <div className="flex space-x-3">
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
              placeholder={row.values.name}
              label="Update Category"
              onChange={(e) => (updatedCategoryRef.current = e.target.value)}
            />{" "}
            <Button
              onClick={async () => {
                try {
                  setProgress(progress + 10);
                  setLoader(true);
                  await axios.patch(
                    `/ecommerce/categories/${row.values._id}`,
                    { name: updatedCategoryRef.current },
                    { withCredentials: true }
                  );
                  setProgress(progress + 100);
                  setLoader(false);
                  getCategory();
                  dialogRef.current.close();
                  // window.location.reload(false);
                } catch (err) {
                  console.log(err);
                  setLoader(false);
                  setProgress(progress + 10);
                  dialogRef.current.close();
                }
              }}
              type="submit"
            >
              update
            </Button>
          </dialog>
          <Button onClick={() => dialogRef.current.showModal()}>update</Button>

          <button
            onClick={async () => {
              try {
                setProgress(progress + 10);
                setLoader(true);
                await axios.delete(
                  `/ecommerce/categories/${row.values._id}`,
                  { name: updatedCategoryRef.current },
                  { withCredentials: true }
                );
                setProgress(progress + 100);

                setLoader(false);
                toast.success("category updated Successfully");
                getCategory();
              } catch (err) {
                setProgress(progress + 100);
                setLoader(false);
                console.log(err);
                toast.success("something went wrong");
              }
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            delete
          </button>
        </div>
      );
    },
  },
];

const Categories = () => {
  const dialogRef = useRef(null);
  const {
    categories,
    getCategory,
    newCategory,
    setNewCategory,
    createCategory,
  } = useContext(AppContext);


  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container>
      <div className="flex space-x-3">
        <AdminSidebar />
        <Table columns={columns} data={categories}/>
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
            placeholder="enter category"
            label="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />{" "}
          <Button
            onClick={(e) => {
              createCategory(e);
              dialogRef.current.close();
            }}
            type="submit"
          >
            update
          </Button>
        </dialog>
        <button
          onClick={() => dialogRef.current.showModal()}
          className="text-4xl"
        >
          <CiCirclePlus />
        </button>
      </div>
    </Container>
  );
};

export default Categories;
