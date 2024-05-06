import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as ProductService from "../services/ProductService";
import Review from "../components/Review";
import AddToCartButton from "../components/AddToCartButton";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    async function fetchBook() {
      const data = await ProductService.getProduct(id);
      setProduct(() => data.data);
      ProductService.getBooksByCategory(product?.category._id, 1, 5).then(
        (data) => {
          setSimilarProducts(() => data.data);
        }
      );
    }
    fetchBook();
  }, [id]);

  return (
    <div className="container bg-gray-50 mx-auto mt-5 min-h-96">
      <div className="relative flex flex-col flex-wrap md:flex-nowrap justify-center bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[100%]  p-8">
        <div className="flex ">
          {" "}
          <div className="relative w-1/5 min-w-[300px] m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
            <img
              src={product?.image}
              alt="card-image"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="p-6 grow">
            <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {product?.name}
            </h4>
            <p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Author: {product?.author}
            </p>
            <p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Description: {product?.description}
            </p>
            <p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Inventory: {product?.inventory}
            </p>
            <p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Price: <b>{product?.price}</b>
            </p>
            <p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Publishing Year: <b>{product?.publishedYear}</b>
            </p>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-yellow-700 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                {product?.ratingAverage || 4}
              </div>

              <span className="font-bold">
                {product?.ratingQuantity} ratings
              </span>
            </div>
            <p className="block mb-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Similar product:
            </p>
            <div className="mb-8 grid grid-cols-5 gap-4">
              {similarProducts?.map((book) => (
                <Link key={book._id} to={`/user/product/${book._id}`}>
                  <div className="flex flex-col justify-center cursor-pointer">
                    <img
                      src={book.image}
                      className=" object-center object-contain h-20 rounded-lg cursor-pointer"
                      alt="gallery-image"
                    />
                    <Typography className="text-xs text-center">
                      {book.name}
                    </Typography>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/">
              <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                type="button"
              >
                Continue shopping
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="rounded"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </button>
            </Link>

            <AddToCartButton bookId={product?._id} />
          </div>
        </div>
        <div>
          <Review bookId={product?._id} />
        </div>
      </div>
    </div>
  );
}

export default Product;
