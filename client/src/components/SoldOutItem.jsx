import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as ProductService from "../services/ProductService";
import ProductCard from "./ProductCard";
function SoldOutItem() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    ProductService.getLowerStock().then((data) => {
      setBooks(data.data);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-[#263238] p-[40px]">
      <Typography className="text-white text-2xl md:text-4xl font-bold mb-[40px]">
        Almost <span className="text-red-900">Sold Out</span>
      </Typography>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {books.map((book) => {
          return <ProductCard key={book._id} book={book} />;
        })}
      </div>
    </div>
  );
}

export default SoldOutItem;
