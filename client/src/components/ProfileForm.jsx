import { useAuth } from "../contexts/authContext";
import { Avatar, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as userService from "../services/userService";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const { user, dispatch } = useAuth();
  const [preview, setPreview] = useState(user?.image);
  function handlePreview(e) {
    if (e.target.files && e.target.files[0]) {
      let img = URL.createObjectURL(e.target.files[0]);
      setPreview(img);
    }
  }
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      image: user?.image,
    },
  });
  async function onSubmit(data) {
    await toast.promise(
      userService.updateMe(data).then((data) => {
        dispatch({ type: "UPDATE_USER", payload: { user: data.data.user } });
        return data;
      }),
      {
        loading: "Saving...",
        success: <p>Profile saved!</p>,
        error: <p>Could not save.</p>,
      }
    );
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  }
  return (
    <div className="container mx-auto mt-4 flex flex-col">
      <Typography variant="h4" className="m-3">
        MY PROFILE
      </Typography>
      <form className="mx-auto min-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 ">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Avatar className="h-12 w-12" src={preview} />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      Upload image
                    </label>
                    <input
                      onInput={handlePreview}
                      id="file-upload"
                      name="image"
                      {...register("image")}
                      type="file"
                      className="sr-only"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

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
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    {...register("name")}
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
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    disabled
                    value={user?.email}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                  />
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
