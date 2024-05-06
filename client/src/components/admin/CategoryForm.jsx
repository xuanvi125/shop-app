import { Input, Button, Typography, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

import * as CategoryService from "../../services/CategoryService";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function CategoryForm({ categoryID }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: category,
  });

  const onSubmit = async (data) => {
    if (!categoryID) {
      setIsUpdate(true);
      await toast.promise(CategoryService.createCategory(data), {
        loading: "Loading...",
        success: <span>Category saved!</span>,
        error: (error) => (
          <span>
            Could not save
            <br />
            <span className="capitalize">{error.message}</span>
          </span>
        ),
      });
      setIsUpdate(false);
      navigate("/admin/category");
    } else {
      setIsUpdate(true);
      await toast.promise(CategoryService.updateCategory(data), {
        loading: "Loading...",
        success: <span>Category saved!</span>,
        error: (error) => (
          <span>
            Could not save
            <br />
            <span className="capitalize">{error.message}</span>
          </span>
        ),
      });
      setIsUpdate(false);
      navigate("/admin/category");
    }
  };

  useEffect(() => {
    const fetchProduct = async (id) => {
      const data = await CategoryService.getCategory(id);
      if (!data) navigate("/page-not-found");
      setCategory(data);
      reset({ ...data });
    };

    if (categoryID) {
      fetchProduct(categoryID);
    }
  }, [categoryID, reset]);

  return (
    <div className="min-h-[400px]">
      <Typography variant="h4">
        {categoryID ? "Edit Category" : "Add Category"}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="mt-4 mb-2 mx-auto w-1/2"
      >
        <div className="gap-6">
          <div>
            {/* Name */}
            <div className="mb-3 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Name
              </Typography>
              <Input
                {...register("name", {
                  required: "Please enter category name",
                })}
                autoFocus
                placeholder="Category Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.name && <ErrorMessage mess={errors.name.message} />}
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Description
              </Typography>
              <Textarea
                {...register("description")}
                type="text"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
        </div>

        <Button
          className="mt-6 w-fit ml-auto"
          fullWidth
          type="submit"
          disabled={isUpdate}
        >
          {categoryID ? "Update Category" : "Add Category"}
        </Button>
      </form>
    </div>
  );
}
