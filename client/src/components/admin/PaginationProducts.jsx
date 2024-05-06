import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Avatar,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { Link, useSearchParams } from "react-router-dom";

import * as ProductService from "../../services/ProductService";
import { Pagination } from "./Pagination";
const TABLE_HEAD = [
  "Book",
  "Author",
  "Inventory",
  "Price",
  "Genre",
  "Description",
  "Actions",
];
import { Action } from "./Action";

export function PaginationProducts() {
  const [tableRows, setTableRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLimit, setPageLimit] = useState(0);
  const page = +searchParams.get("page") || 1;

  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);
  const manualRerender = () => {
    setForceUpdateFlag((prevFlag) => !prevFlag);
  };

  useEffect(() => {
    const fetchTableRows = async () => {
      if (page < 1) setSearchParams({ ...searchParams, page: 1 });

      const data = await ProductService.getProducts(page);
      if (page > data.totalPages)
        setSearchParams({ ...searchParams, page: data.totalPages });
      setPageLimit(data.totalPages);
      setTableRows(data.data);
    };

    fetchTableRows();
  }, [page, forceUpdateFlag, pageLimit]);

  return (
    <Card className="h-full w-full mt-1">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Typography variant="h5" color="blue-gray">
            Product
          </Typography>
          <Link to="/admin/product/add">
            <Button color="green">Add Product</Button>
          </Link>
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
                    {head || ""}
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
                  author,
                  name,
                  category,
                  image,
                  price,
                  inventory,
                  description,
                },
                index
              ) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? "p-3"
                  : "p-3 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={image}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name || ""}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {author}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {inventory || ""}
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
                        }).format(price) || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category?.name || "Null"}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {description || ""}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Action
                        routeEdit={`/admin/product/`}
                        _id={_id}
                        manualRerender={manualRerender}
                        deleteRow={ProductService.deleteProduct}
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="mx-auto -mt-4">
        <Pagination pageLimit={pageLimit} />
      </CardFooter>
    </Card>
  );
}
