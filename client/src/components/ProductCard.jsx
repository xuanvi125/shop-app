import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

function ProductCard({ book }) {
  return (
    <div>
      <Card className="max-w-[300px] h-full overflow-hidden rounded-none">
        <Link to={`/user/product/${book._id}`}>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none p-2 hover:bg-[#f1f5f9] cursor-pointer"
          >
            <img
              src={book.image}
              className="object-contain h-[300px] mx-auto my-auto"
            />
          </CardHeader>
        </Link>
        <CardBody className="grow p-3 opacity-85 bg-[#ccc]">
          <Typography color="blue-gray" className="md:text-xl text-center">
            {book.name}
          </Typography>
          <Typography
            color="red"
            className="mt-1 md:text-xl font-normal text-center"
          >
            Price: {book.price}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-between p-2 opacity-85 bg-[#ccc]">
          <AddToCartButton bookId={book._id} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProductCard;
