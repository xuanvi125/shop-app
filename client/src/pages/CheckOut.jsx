import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useUser } from "../contexts/userContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as accountService from "../services/accountService";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
function CheckOut() {
  const { cart, setCart } = useUser();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accounts = await accountService.getAccounts();
        setAccount(accounts.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAccount();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await accountService.payOrder(data);
      if (res.status === "success") {
        toast.success("Order placed successfully!");
        setCart([]);
        navigate("/user/profile/orders");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  if (!account) return <Loading />;
  if (account.length === 0)
    return (
      <div className="container mx-auto">
        <Card className="container mx-auto mt-3 p-3 flex justify-between flex-row min-h-96">
          <Typography variant="h4" className="text-base mx-auto mt-5">
            You have no bank account yet, please add your bank account first to
            place an order ,
            <Link to="/user/profile/account" className="text-[#007BFF]">
              {" "}
              Start add bank account now
            </Link>
            !
          </Typography>
        </Card>
      </div>
    );
  return (
    <div className="container mx-auto">
      <Typography variant="h4" className="m-3">
        PLACE YOUR ORDER
      </Typography>
      <Card className="container mx-auto mt-3 p-3 flex justify-between flex-row min-h-96">
        <form
          className="mx-auto min-w-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Shipping Address
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("shippingAddress", { required: true })}
                      type="text"
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your Bank Account
                  </label>
                  <div className="mt-2">
                    <select className="p-2" {...register("accountNumber")}>
                      <option>Select Your Bank Account</option>
                      {account.map((item) => (
                        <option key={item._id} value={item.accountNumber}>
                          {item.accountNumber} - {item.beneficiaryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ORDER NOW
            </button>
          </div>
        </form>

        <Card className="container relative w-1/3 p-3 mt-3">
          <Typography variant="h5" color="blue-gray" className="text-center">
            ORDERED PRODUCTS
          </Typography>
          <List>
            {!cart && null}
            {cart?.map((item) => (
              <ListItem key={item._id}>
                <ListItemPrefix>
                  <Avatar
                    variant="circular"
                    alt="candice"
                    src={item.product.image}
                  />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {item.product.name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {" "}
                    {item.quantity} x{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.product.price)}
                    ={" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.quantity * item.product.price)}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>
          <Typography
            variant="h6"
            color="red"
            className="text-center absolute left-5  bottom-5"
          >
            Total:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              cart?.reduce(
                (acc, item) => acc + item.product.price * item.quantity,
                0
              )
            )}
          </Typography>
        </Card>
      </Card>
    </div>
  );
}

export default CheckOut;
