import { Card, Chip, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as orderService from "../services/orderService";
import Pagination from "../components/Pagination";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
const TABLE_HEAD = [
  "ID",
  "OrderedProducts",
  "Shipping Address",
  "Order Date",
  "Total",
  "Status",
];

export default function Order() {
  const [orders, setOrders] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await orderService.getOrders(searchParams.get("page"));
        setOrders(orders.data);
        setTotalPages(orders.totalPages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [searchParams]);
  if (!orders) {
    return <Loading />;
  }
  if (orders?.length === 0) {
    return (
      <div className="container mx-auto mt-4 flex flex-col">
        <Typography variant="h4" className="m-3">
          MY ORDERS
        </Typography>
        <Card className="container mx-auto mt-3 min-h-96">
          <Typography variant="h6" color="blue-gray" className="text-center">
            You have no orders yet.
            <Typography className="text-base">
              You have not placed any orders yet,
              <Link to="/" className="text-[#007BFF]">
                {" "}
                start adding some
              </Link>
              !
            </Typography>
          </Typography>
        </Card>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-4 flex flex-col">
      <Typography variant="h4" className="m-3">
        MY ORDERS
      </Typography>
      <Card className="container mx-auto mt-3">
        <table className="w-full  table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const isLast = index === orders.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={order._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.orderedProducts.map((product) => {
                        return (
                          <div key={product._id}>
                            <span className="font-bold me-5">
                              {product.product.name}
                            </span>{" "}
                            x{product.quantity}{" "}
                          </div>
                        );
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.shippingAddress}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(order.orderDate).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.total)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={order.status}
                      color={
                        order.status === "processing"
                          ? "green"
                          : order.status === "pending"
                          ? "amber"
                          : order.status === "shipped"
                          ? "teal"
                          : "red"
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <div className="mx-auto">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
