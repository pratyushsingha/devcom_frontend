import Container from "../../../components/Container";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

import moment from "moment";
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
import AdminTable from "@/components/admin/AdminTable";
import { CouponContext } from "@/context/CouponContext";

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
    Cell: ({ row }) => <span> &#8377; {row.values.discountValue}</span>,
  },
  {
    Header: "Expiry",
    accessor: (row) =>
      "isActive" ? (
        <span className="w-full">{moment(row.expiryDate).format("LL")}</span>
      ) : (
        "Expired"
      ),
  },
  {
    Header: "Action",
    accessor: "_id",
    Cell: ({ row }) => {
      const {
        deleteCoupon,
        updateCoupon,
        couponUpdate,
        setCouponUpdate,
        coupons,
        setCoupons,
      } = useContext(CouponContext);

      return (
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center">Update Coupon</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <form onSubmit={updateCoupon}>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-right">
                      Coupon name
                    </Label>
                    <Input
                      placeholder={row.values.name}
                      id="name"
                      value={couponUpdate.name}
                      onChange={(e) =>
                        setCouponUpdate({
                          ...couponUpdate,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountValue" className="text-right">
                      Discount value
                    </Label>
                    <Input
                      type="number"
                      placeholder={row.values.discountValue}
                      id="discountValue"
                      value={couponUpdate.discountValue}
                      onChange={(e) =>
                        setCouponUpdate({
                          ...couponUpdate,
                          discountValue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="couponCode" className="text-right">
                      Coupon Code
                    </Label>
                    <Input
                      placeholder={row.values.couponCode}
                      id="couponCode"
                      value={couponUpdate.couponCode}
                      onChange={(e) =>
                        setCouponUpdate({
                          ...couponUpdate,
                          couponCode: e.target.value,
                        })
                      }
                      className="uppercase"
                    />
                  </div>
                </form>
              </div>
              <DialogFooter>
                <Button
                  onClick={(e) => updateCoupon(row.values._id, e)}
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            onClick={(e) => deleteCoupon(row.values._id, e)}
          >
            delete
          </Button>
        </div>
      );
    },
  },
];

const Coupons = () => {
  const { page, getAdminCoupon, coupons } = useContext(CouponContext);
  useEffect(() => {
    getAdminCoupon();
  }, [page]);

  return (
    <Container className="flex space-x-5">
      <AdminSidebar />
      <AdminTable
        columns={columns}
        data={coupons}
        cardLabel="Coupons"
        inputPlaceholder="Filter coupons..."
      />
      <Link to="/admin/coupon/new">
        <Button variant="ghost" className="text-4xl">
          <CiCirclePlus />
        </Button>
      </Link>
    </Container>
  );
};

export default Coupons;
