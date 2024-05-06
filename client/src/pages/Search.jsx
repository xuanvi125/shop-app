import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as ProductService from "../services/ProductService";
import Pagination from "../components/Pagination";
import BookList from "../components/BookList";
import { Typography } from "@material-tailwind/react";
import { CategorySelection } from "../components/CategorySelection";
import { PriceSelection } from "../components/PriceSelection";
import { SortSelection } from "../components/SortSelection";
function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [result, setResult] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  useEffect(() => {
    const query = new URLSearchParams(searchParams);

    ProductService.searchBook(query).then((data) => {
      setResult(data.data);
      setTotalPage(data.totalPages);
    });
  }, [searchParams]);
  return (
    <div className="container flex  flex-col bg-gray-50 mx-auto rounded my-3 min-h-96">
      <div className="flex gap-5 mx-auto">
        <div className="flex gap-2 items-center">
          <Typography variant="h6">Category</Typography>
          <CategorySelection />
        </div>
        <div className="flex gap-2 items-center">
          <Typography variant="h6">Price</Typography>
          <PriceSelection />
        </div>

        <div className="flex gap-2 items-center">
          <Typography variant="h6">Sort</Typography>
          <SortSelection />
        </div>
      </div>
      {result.length > 0 ? (
        <>
          <Typography className="m-3" variant="h4">
            Result for &quot;<span className="font-bold">{keyword}</span>&quot;
          </Typography>

          <BookList books={result} />
          <div className="mx-auto">
            <Pagination totalPages={totalPage} />
          </div>
        </>
      ) : (
        <Typography variant="h4" className="my-3 text-center">
          No result for this query 🥲
        </Typography>
      )}
    </div>
  );
}

export default Search;
