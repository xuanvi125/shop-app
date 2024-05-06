import { useSearchParams } from "react-router-dom";

export function SortSelection() {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <div className="w-72 my-3">
      <select
        className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
        label="Sort By Price"
        value={searchParam.get("sort") || "all"}
        onChange={(e) => {
          const searchParams = new URLSearchParams(searchParam);
          searchParams.delete("page");
          if (e.target.value === "all") {
            searchParams.delete("sort");
            setSearchParam(searchParams);
            return;
          }
          searchParams.set("sort", e.target.value);
          setSearchParam(searchParams);
        }}
      >
        <option value="all">Default</option>
        <optgroup label="Price">
          <option value="price">Price Low to High</option>
          <option value="-price">Price High to Low</option>
        </optgroup>
        <optgroup label="Name">
          <option value="name">Name A-Z</option>
          <option value="-name">Name Z-A</option>
        </optgroup>
        <optgroup label="Review">
          <option value="ratingAverage">Review Increasing</option>
          <option value="-ratingAverage">Review Decreasing</option>
        </optgroup>
      </select>
    </div>
  );
}
