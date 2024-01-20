import axios from "axios";
import Container from "../../../components/Container";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import Table from "../../../components/admin/Table";
import Button from "../../../components/Button";
import { RxCross2 } from "react-icons/rx";
import Input from "../../../components/Input";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Coupon Code",
    accessor: "couponCode",
  },
  {
    Header: "Discount",
    accessor: "discountValue",
  },
  {
    Header: "Expiry",
    accessor: "isActive" ? "expiryDate" : "Expired",
  },
  {
    Header: "Action",
    accessor: "_id",
    Cell: ({ row }) => {
      const dialogRef = useRef(null);
      const { progress, setProgress, setLoader, getCoupon } =
        useContext(AppContext);
      const [couponUpdate, setCouponUpdate] = useState({
        couponCode: "",
        discountValue: Number,
        name: "",
      });

      const updateCoupon = async (couponId, e) => {
        e.preventDefault();
        try {
          setProgress(progress + 10);
          setLoader(true);
          const data = await axios.patch(
            `/ecommerce/coupons/${couponId}`,
            couponUpdate,
            { withCredentials: true }
          );
          setProgress(progress + 100);
          setLoader(false);
          toast.success("coupon updated successfully");
          getCoupon();
        } catch (err) {
          console.log(err);
          toast.error("something went wrong");
        }
      };

      const deleteCoupon = async (couponId, e) => {
        try {
          setProgress(progress + 10);
          setLoader(true);
          await axios.delete(`/ecommerce/coupons/${couponId}`, {
            withCredentials: true,
          });
          setProgress(progress + 100);
          setLoader(false);
          toast.success("coupon deleted successfully");
          getCoupon();
        } catch (err) {
          console.log(err);
          toast.error("something went wrong");
          setProgress(progress + 100);
          setLoader(false);
        }
      };

      return (
        <div className="space-x-3">
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
            <form onSubmit={updateCoupon}>
              <Input
                placeholder={row.values.name}
                label="name"
                value={couponUpdate.name}
                onChange={(e) =>
                  setCouponUpdate({ ...couponUpdate, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder={row.values.discountValue}
                label="discount value"
                value={couponUpdate.discountValue}
                onChange={(e) =>
                  setCouponUpdate({
                    ...couponUpdate,
                    discountValue: e.target.value,
                  })
                }
              />
              <Input
                classname="uppercase"
                placeholder={row.values.couponCode}
                label="coupon code"
                value={couponUpdate.couponCode}
                onChange={(e) =>
                  setCouponUpdate({
                    ...couponUpdate,
                    couponCode: e.target.value,
                  })
                }
              />
              <Button
                onClick={(e) => {
                  updateCoupon(row.values._id, e);
                  dialogRef.current.close();
                }}
                type="submit"
              >
                update
              </Button>
            </form>
          </dialog>
          <Button onClick={() => dialogRef.current.showModal()}>update</Button>
          <Button onClick={(e) => deleteCoupon(row.values._id, e)}>
            delete
          </Button>
        </div>
      );
    },
  },
];

const Coupons = () => {
  const { getCoupon, allCoupons } = useContext(AppContext);

  useEffect(() => {
    getCoupon();
  }, []);
  return (
    <Container>
      <div className="flex space-x-3">
        <AdminSidebar />
        <div>
          <Table data={allCoupons} columns={columns} />
        </div>
        <Link to="/admin/coupon/new">
          <button className="text-4xl">
            <CiCirclePlus />
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default Coupons;
