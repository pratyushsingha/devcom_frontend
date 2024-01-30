import { useEffect, useRef, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import Container from "../../../components/Container";
import axios from "axios";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { CiCirclePlus } from "react-icons/ci";
import { useSortBy, useTable } from "react-table";
import usePagination from "@/hooks/usePagination";

import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useCategory from "@/hooks/useCategory";

export const columns = [
  {
    Header: "Category Name",
    accessor: "name",
  },
  {
    Header: "Action",
    accessor: "_id",
    Cell: ({ row }) => {
      const [aOpen, setAopen] = useState(false);
      const [dOpen, setDopen] = useState(false);
      const { toast } = useToast();
      const updatedCategoryRef = useRef("");
      const { progress, setProgress, setLoader, getCategory } =
        useContext(AppContext);
      const updateCategory = async (e) => {
        e.preventDefault();
        try {
          setProgress(progress + 10);
          setLoader(true);
          const data = await axios.patch(
            `/ecommerce/categories/${row.values._id}`,
            { name: updatedCategoryRef.current },
            { withCredentials: true }
          );
          setProgress(progress + 100);
          setLoader(false);
          toast({
            title: "success",
            description: data.data.message,
          });
          getCategory();
          setDopen(false);
        } catch (err) {
          // console.log(err);
          toast({
            title: "error",
            description: err.response.data.message,
          });
          setLoader(false);
          setProgress(progress + 10);
        }
      };

      const deleteCategory = async (e) => {
        e.preventDefault();
        try {
          setProgress(progress + 10);
          setLoader(true);
          const data = await axios.delete(
            `/ecommerce/categories/${row.values._id}`,
            { name: updatedCategoryRef.current },
            { withCredentials: true }
          );
          setProgress(progress + 100);
          setLoader(false);
          toast({
            title: "success",
            description: data.data.message,
          });
          getCategory();
          setAopen(false);
        } catch (err) {
          toast({
            title: "error",
            description: err.response.data.message,
          });
          console.log(err);
          setProgress(progress + 100);
          setLoader(false);
        }
      };

      return (
        <div className="flex space-x-3">
          <Dialog open={dOpen} onOpenChange={setDopen}>
            <DialogTrigger asChild>
              <Button>update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Update Category
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={updateCategory}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-right">
                      Coupon name
                    </Label>
                    <Input
                      placeholder={row.values.name}
                      id="name"
                      onChange={(e) =>
                        (updatedCategoryRef.current = e.target.value)
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">update</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <AlertDialog open={aOpen} onOpenChange={setAopen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this category and can throw error if u don't delete the
                  corresponding products
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteCategory}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

const Categories = () => {
  const dialogRef = useRef(null);
  const { categories, getCategory, page, hastNextPage, dOpen, setDopen } =
    useContext(AppContext);
  const { createCategory, newCategory, setNewCategory } = useCategory();

  const { handlePrevClick, handleNextClick } = usePagination();

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    prepareRow,
    getRowProps,
  } = useTable(
    {
      columns,
      data: categories,
    },
    useSortBy
  );

  useEffect(() => {
    getCategory();
  }, [page]);

  return (
    <Container className="flex">
      <AdminSidebar />
      <div className="mx-auto w-full">
        <Table {...getTableProps()} className="">
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHead
                    className="px-10"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>{column.isSortedDesc ? " ↓" : " ↑"}</span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell className="px-10" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="flex space-x-3 justify-center my-4">
          <Button disabled={page <= 1} onClick={handlePrevClick}>
            &laquo; Previous
          </Button>
          <Button disabled={hastNextPage == false} onClick={handleNextClick}>
            Next &raquo;
          </Button>
        </div>
      </div>
      <Dialog open={dOpen} onOpenChange={setDopen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-4xl">
            <CiCirclePlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Update Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => createCategory(e)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right">
                  Coupon name
                </Label>
                <Input
                  placeholder="enter category name"
                  id="name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
    // <Container>
    //   <div className="flex space-x-3">
    //     <AdminSidebar />
    //     <Table columns={columns} data={categories}/>
    //     <dialog ref={dialogRef}>
    //       <div className="flex">
    //         <h1 className="uppercase text-gray-500 mx-20 my-5 font-semibold">
    //           Create Category
    //         </h1>
    //         <button
    //           className="text-3xl"
    //           type="button"
    //           onClick={() => dialogRef.current.close()}
    //         >
    //           <RxCross2 />
    //         </button>
    //       </div>
    //       <Input
    //         placeholder="enter category"
    //         label="Category name"
    //         value={newCategory}
    //         onChange={(e) => setNewCategory(e.target.value)}
    //       />{" "}
    //       <Button
    //         onClick={(e) => {
    //           createCategory(e);
    //           dialogRef.current.close();
    //         }}
    //         type="submit"
    //       >
    //         update
    //       </Button>
    //     </dialog>
    //     <button
    //       onClick={() => dialogRef.current.showModal()}
    //       className="text-4xl"
    //     >
    //       <CiCirclePlus />
    //     </button>
    //   </div>
    // </Container>
  );
};

export default Categories;
