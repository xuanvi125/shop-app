import React from "react";
import { Input, Button, Typography, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

import * as AccountService from "../../services/accountService";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AccountForm({ accountID }) {
  const navigate = useNavigate();
  const [acccount, setAcccount] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: acccount,
  });

  const onSubmit = async (data) => {
    if (!accountID) {
      setIsUpdate(true);
      toast.promise(AccountService.createAccount(data), {
        loading: "Loading...",
        success: <span>Account saved!</span>,
        error: (error) => (
          <span>
            Could not save
            <br />
            <span className="capitalize">{error.message}</span>
          </span>
        ),
      });
      setIsUpdate(false);
    } else {
      console.log(data);
      setIsUpdate(true);
      toast.promise(AccountService.updateAccount(data), {
        loading: "Loading...",
        success: <span>Account saved!</span>,
        error: (error) => (
          <span>
            Could not save
            <br />
            <span className="capitalize">{error.message}</span>
          </span>
        ),
      });
      setIsUpdate(false);
    }
    navigate("/admin/account");
  };

  useEffect(() => {
    const fetchProduct = async (id) => {
      const data = await AccountService.getAccount(id);
      if (!data) navigate("/page-not-found");
      setAcccount(data.data);
      reset({ ...data.data });
    };

    if (accountID) {
      fetchProduct(accountID);
    }
  }, [accountID, reset]);

  return (
    <div className="min-h-[400px]">
      <Typography variant="h4">
        {accountID ? "Edit Account" : "Add Account"}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="mt-4 mb-2 mx-auto w-2/5"
      >
        <div className="grid grid-cols gap-6">
          <div>
            {/* User ID */}
            <div className="mb-3 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Owner Name
              </Typography>
              <Input
                value={acccount?.user?.name}
                disabled
                placeholder="Category Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-3 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Beneficiary Name
              </Typography>
              <Input
                value={acccount?.beneficiaryName}
                disabled
                placeholder="Category Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mb-3 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Account Number
              </Typography>
              <Input
                value={acccount?.accountNumber}
                disabled
                placeholder="Category Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Balance
              </Typography>
              <Input
                {...register("balance", {
                  required: "Balance is required",
                  min: { value: 0, message: "Balance must be greater than 0" },
                })}
                type="number"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.balance && (
                <Typography color="red" variant="small" className="mt-1">
                  {errors.balance.message}
                </Typography>
              )}
            </div>
          </div>
        </div>

        <Button
          className="mt-6 w-fit ml-auto"
          fullWidth
          type="submit"
          disabled={isUpdate}
        >
          {accountID ? "Update Account" : "Add Account"}
        </Button>
      </form>
    </div>
  );
}
