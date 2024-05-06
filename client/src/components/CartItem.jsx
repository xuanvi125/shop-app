import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import * as cartService from "../services/cartService";
import toast from "react-hot-toast";
export default function CartItem({ product, quantity }) {
  const { cart, setCart } = useUser();
  function handleRemoveFromCart() {
    cartService.removeFromCart(product._id).then(() => {
      setCart(cart.filter((item) => item.product._id !== product._id));
    });
  }
  async function handleUpdateCart(quantity) {
    if (quantity < 1) return;
    const data = await cartService.updateCart(product._id, quantity);
    if (data.status === "success") {
      setCart(data.data.cart);
    } else {
      toast.error(data.message);
    }
  }
  return (
    <Card className="max-w-[300px] p-3 rounded overflow-hidden">
      <Link to={`/product/${product?._id}`}>
        <CardHeader
          onClick={() => {}}
          floated={false}
          color="transparent"
          className="m-0 rounded-none p-2 hover:bg-[#f1f5f9] cursor-pointer"
        >
          <img
            src={product?.image}
            className="object-contain h-[300px] mx-auto my-auto"
          />
        </CardHeader>
      </Link>
      <CardBody className="grow opacity-85 flex flex-row p-3 justify-between">
        <Typography color="blue-gray" className="md:text-xl p-0 text-center">
          {product?.name}
        </Typography>
        <Typography color="red" className="md:text-xl font-normal text-center">
          {product?.price}
        </Typography>
      </CardBody>
      <CardFooter className="flex flex-row flex-wrap items-center justify-between p-2 opacity-85">
        <div className="grow flex flex-row justify-between items-center mb-1 mx-1">
          <Button
            className="bg-white text-black"
            onClick={() => {
              handleUpdateCart(quantity - 1);
            }}
          >
            -
          </Button>
          <div className="grow text-center min-w-[32px]">
            <Typography>&nbsp;{quantity}&nbsp;</Typography>
          </div>
          <Button
            className="bg-white text-black"
            onClick={() => {
              handleUpdateCart(quantity + 1);
            }}
          >
            +
          </Button>
        </div>
        <Button
          className="grow text-white bg-[#f50057] text-center text-sm h-[40px]"
          onClick={handleRemoveFromCart}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
