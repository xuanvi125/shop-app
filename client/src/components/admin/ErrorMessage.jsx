import React from "react";

export default function ErrorMessage({ mess }) {
  return (
    <p className="-mt-5 text-red-600 text-sm text-opacity-80 -mb-1 capitalize">
      {mess}
    </p>
  );
}
