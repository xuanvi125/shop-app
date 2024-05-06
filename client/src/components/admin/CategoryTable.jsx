import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";

import * as CategoryService from "../../services/CategoryService";
import { Action } from "./Action";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["#", "Name", "Description", "Action"];

export function CategoryTable() {
  const [tableRows, setTableRows] = useState([]);
  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);
  const manualRerender = () => {
    setForceUpdateFlag((prevFlag) => !prevFlag);
  };

  useEffect(() => {
    const fetchTableRows = async () => {
      const data = await CategoryService.getAllCategories();
      setTableRows(data);
    };
    fetchTableRows();
  }, [forceUpdateFlag]);

  return (
    <Card className="h-full w-full mt-1">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Category
            </Typography>
          </div>

          <Link to="/admin/category/add">
            <Button color="green">Add Category</Button>
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
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ _id, name, description }, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast
                ? "p-3"
                : "p-3 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {index + 1}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Action
                      routeEdit={`/admin/category/`}
                      _id={_id}
                      manualRerender={manualRerender}
                      deleteRow={CategoryService.deleteCategory}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
