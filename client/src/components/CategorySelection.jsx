import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as CategoryService from "../services/CategoryService";
export function CategorySelection() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    CategoryService.getAllCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  return (
    <div className="w-72 my-3">
      <select
        className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
        label="Select Category"
        value={searchParam.get("category") || "all"}
        onChange={(e) => {
          const searchParams = new URLSearchParams(searchParam);
          searchParams.delete("page");
          if (e.target.value === "all") {
            searchParams.delete("category");
            setSearchParam(searchParams);
            return;
          }

          searchParams.set("category", e.target.value);
          setSearchParam(searchParams);
        }}
      >
        <option value="all">All</option>
        {categories.map((category) => {
          return (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
