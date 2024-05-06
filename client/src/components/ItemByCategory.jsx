import { Typography } from "@material-tailwind/react";
import Pagination from "./Pagination";
import { CategorySelection } from "./CategorySelection";
import { useSearchParams } from "react-router-dom";
import * as ProductService from "../services/ProductService";
import { useEffect, useState } from "react";
import BookList from "./BookList";

function ItemByCategory() {
  const [searchParam] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    ProductService.getBooksByCategory(
      searchParam.get("category"),
      searchParam.get("page")
    ).then((data) => {
      setBooks(data.data);
      setTotalPages(data.totalPages);
    });
  }, [searchParam]);
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50">
      <Typography className="text-2xl md:text-4xl font-bold mt-[40px]">
        Discover <span className="text-red-900">Books</span>
      </Typography>
      <Typography className="mb-4 text-sm md:text-2xl text-[#455A64]">
        Explore our comprehensive collection of books.
      </Typography>
      <CategorySelection />
      <BookList books={books} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default ItemByCategory;
