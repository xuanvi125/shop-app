import { useSearchParams } from "react-router-dom";

export function PriceSelection() {
  const [searchParam, setSearchParam] = useSearchParams();
  const selectValue = () => {
    const gte = searchParam.get("price[gte]");
    const lte = searchParam.get("price[lte]");
    if (gte && lte) return `${gte}-${lte}`;
    if (gte) return `${gte}-`;
    if (lte) return `-${lte}`;
    return "all";
  };
  return (
    <div className="w-72 my-3">
      <select
        className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
        label="Select Price Range"
        value={selectValue()}
        onChange={(e) => {
          const searchParams = new URLSearchParams(searchParam);
          searchParams.delete("price[gte]");
          searchParams.delete("price[lte]");
          searchParams.delete("page");

          if (e.target.value === "all") {
            setSearchParam(searchParams);
            return;
          } else {
            const [min, max] = e.target.value.split("-");

            if (min) {
              searchParams.set("price[gte]", min);
              setSearchParam(searchParams);
            }
            if (max) {
              searchParams.set("price[lte]", max);
              setSearchParam(searchParams);
            }
          }
        }}
      >
        <option value="all">All</option>
        <option value="-100000">Under 100.000</option>
        <option value="100000-200000">100.000 - 200.000</option>
        <option value="200000-">Above 200.000</option>
      </select>
    </div>
  );
}
