import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Button,
} from "@material-tailwind/react";

import * as OrderService from "../../services/orderService";

import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

const TABLE_HEAD = [
  "ID",
  "User",
  "OrderedProducts",
  "Shipping Address",
  "Order Date",
  "Total",
  "Status",
  "Actions",
];
function isYesterdayOrToday(date) {
  const today = new Date();
  const orderDate = new Date(date);

  return new Date(today.getTime() - orderDate.getTime()).getDate() <= 2;
}

export default function Order() {
  const [tableRows, setTableRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchTableRows = async () => {
      const data = await OrderService.getOrders(searchParams.get("page"));
      setTotalPages(data.totalPages);
      setTableRows(data.data);
    };
    fetchTableRows();
  }, [searchParams]);

  if (!tableRows.length) return null;
  return (
    <Card className="h-full w-full mt-1">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Category
            </Typography>
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-0 -mt-2 ">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
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
            {tableRows.map(
              (
                {
                  _id,
                  user: { name },
                  orderedProducts,
                  orderDate,
                  shippingAddress,
                  status,
                  total,
                },
                index
              ) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? "p-5"
                  : "p-5 border-b border-blue-gray-50";

                return (
                  <tr key={_id} className="relative">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography color="blue-gray" className="font-bold">
                          {isYesterdayOrToday(orderDate) && (
                            <Chip size="sm" color="red" value={"New"} />
                          )}
                          {index + 1}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography color="blue-gray" className="font-bold">
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray" className="font-normal">
                        {orderedProducts.map((product) => {
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
                      <Typography color="blue-gray" className="font-normal">
                        {shippingAddress}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography color="blue-gray" className="font-normal">
                        {new Date(orderDate).toLocaleDateString()}
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
                        }).format(total) || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={status}
                        color={
                          status === "processing"
                            ? "green"
                            : status === "pending"
                            ? "amber"
                            : status === "shipped"
                            ? "teal"
                            : "red"
                        }
                      />
                    </td>
                    <td className={classes}>
                      <Link to={`/admin/order/${_id}`}>
                        <Button>Edit</Button>
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <div className="mx-auto">
        <Pagination totalPages={totalPages} />
      </div>
    </Card>
  );
}
