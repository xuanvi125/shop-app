import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Avatar,
  CardFooter,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";

import * as UserService from "../../services/userService";
import { Pagination } from "../../components/admin/Pagination";
import toast from "react-hot-toast";
const TABLE_HEAD = [
  "Avatar",
  "Name",
  "Email",
  "Role",
  "Status",
  "Social Account",
  "Actions",
];

export function User() {
  const [tableRows, setTableRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLimit, setPageLimit] = useState(0);
  const page = +searchParams.get("page") || 1;

  const handleUpdate = async (id, data) => {
    const res = await UserService.updateUser(id, data);
    if (res.status === "success") {
      setTableRows((prev) =>
        prev.map((row) => (row._id === id ? res.data : row))
      );
      toast.success("User updated successfully!");
    } else {
      toast.error(res.message);
    }
  };
  useEffect(() => {
    const fetchTableRows = async () => {
      if (page < 1) setSearchParams({ ...searchParams, page: 1 });

      const data = await UserService.getUsers(page);
      if (page > data.totalPages)
        setSearchParams({ ...searchParams, page: data.totalPages });
      setPageLimit(data.totalPages);
      setTableRows(data.data);
    };

    fetchTableRows();
  }, [page, pageLimit]);

  return (
    <Card className="h-full w-full mt-1">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Typography variant="h5" color="blue-gray">
            User
          </Typography>
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
                  image,
                  name,
                  email,
                  isActive,
                  googleId,
                  facebookId,
                  role,
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
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {role.toUpperCase() || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {isActive ? (
                          <Chip color="teal" value={"Active"} />
                        ) : (
                          <Chip color="red" value={"Banned"} />
                        )}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {googleId ? (
                            <Chip color="green" value={"Google"} />
                          ) : (
                            facebookId && (
                              <Chip color="blue" value={"Facebook"} />
                            )
                          )}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      {isActive ? (
                        <Button
                          color="red"
                          onClick={() => handleUpdate(_id, { isActive: false })}
                        >
                          Ban
                        </Button>
                      ) : (
                        <Button
                          color="green"
                          onClick={() => handleUpdate(_id, { isActive: true })}
                        >
                          Unban
                        </Button>
                      )}
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
