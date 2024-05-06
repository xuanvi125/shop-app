import { Input, Button, Typography, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

import * as CategoryService from "../../services/CategoryService";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as ProductService from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

const imageDefault =
  "https://res.cloudinary.com/dv79err1w/image/upload/v1705988154/product/efwphbwmbnlwqbhau7pz.png?fbclid=IwAR1_hw5PdkO6EAzxOfDGh0-5uf1RlCceCpjAbC1fOW_x2J9wb70ZH-IsV-g";

export function ProductForm({ productId }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const imageInput = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  const onSubmit = async (data) => {
    data.image = imageInput.current.files[0];
    if (!data.categoryID) data.categoryID = categories[0]._id;
    if (!productId) {
      setIsUpdate(true);
      await toast.promise(ProductService.addProduct(data), {
        loading: "Loading...",
        success: <span>Product saved!</span>,
        error: <span>Could not save.</span>,
      });
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
      await toast.promise(ProductService.updateProduct(data), {
        loading: "Loading...",
        success: <span>Product saved!</span>,
        error: <span>Could not save.</span>,
      });
      setIsUpdate(false);
    }
    navigate("/admin/product");
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const link = URL.createObjectURL(file);
      setPreview(link);
      setFileName(file.name);
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async (productId) => {
      const data = await ProductService.getProduct(productId);
      if (!data) navigate("/page-not-found");
      setProduct(data.data);
      reset({ ...data.data, categoryID: data.category, image: null });
    };

    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <Typography variant="h4">
        {productId ? "Edit Product" : "Add Product"}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="mt-4 mb-2 mx-auto w-full"
      >
        <div className="grid grid-cols-2 gap-8">
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
                  required: "Please enter book name",
                })}
                autoFocus
                placeholder="Book Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {errors.name && <ErrorMessage mess={errors.name.message} />}
            </div>

            {/* Author */}
            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Author
              </Typography>
              <Input
                {...register("author", {
                  required: "Please enter author",
                })}
                placeholder="Harper Lee"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.author && <ErrorMessage mess={errors.author.message} />}
            </div>

            {/* Category */}
            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Category
              </Typography>
              <select
                className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
                defaultValue={product?.categoryID?._id}
                {...register("categoryID")}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/*  Price */}
            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Price
              </Typography>
              <Input
                {...register("price", {
                  required: "Please enter price",
                })}
                type="number"
                placeholder="10 000"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.price && <ErrorMessage mess={errors.price.message} />}
            </div>

            {/* Pulisher */}
            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Publisher
              </Typography>
              <Input
                {...register("publisher", {
                  required: "Please enter Publish Year",
                })}
                placeholder="Charles Scribner's Sons"
                type="text"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.publisher && (
                <ErrorMessage mess={errors.publisher.message} />
              )}
            </div>

            {/* Published Year */}
            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Published Year
              </Typography>
              <Input
                {...register("publishedYear", {
                  required: "Please enter Publish Year",
                })}
                placeholder="1960"
                type="number"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.publishedYear && (
                <ErrorMessage mess={errors.publishedYear.message} />
              )}
            </div>

            {/* Inventory */}
            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Inventory
              </Typography>
              <Input
                {...register("inventory", {
                  required: "Please enter Inventory",
                })}
                placeholder="100"
                type="number"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.inventory && (
                <ErrorMessage mess={errors.inventory.message} />
              )}
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

          <div>
            <label
              className="mb-2 mr-2 text-sm font-medium text-gray-900 border border-gray-300 
                      rounded-lg p-2 cursor-pointer w-fit hover:bg-gray-100 "
              htmlFor="file_input"
            >
              Upload image:
            </label>
            {<span className="mt-2">{fileName}</span>}
            <input
              className="block w-full text-sm text-gray-900 border 
                          border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden 
                          focus:outline-none"
              ref={imageInput}
              name="image"
              onChange={handleChangeImage}
              id="file_input"
              type="file"
            />

            {errors.image && <ErrorMessage mess={errors.image.message} />}
            <img
              src={preview || product?.image || imageDefault}
              alt=""
              className="w-80 mt-4"
            />
          </div>
        </div>

        <Button
          className="mt-6 w-1/6 ml-auto"
          fullWidth
          type="submit"
          disabled={isUpdate}
        >
          {productId ? "Update product" : "Add Product"}
        </Button>
      </form>
    </div>
  );
}
