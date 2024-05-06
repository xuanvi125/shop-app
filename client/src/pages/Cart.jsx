import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import CartItem from "../components/CartItem";
import Loading from "../pages/Loading";
import { useUser } from "../contexts/userContext";
import * as cartService from "../services/cartService";
import toast from "react-hot-toast";
export default function Cart() {
  const { cart, setCart } = useUser();

  if (!cart) {
    return <Loading />;
  }

  const handleEmptyCart = async () => {
    try {
      await cartService.emptyCart();
      setCart([]);
    } catch (err) {
      toast.error("Cannot empty cart, try again later!");
    }
  };

  const renderEmptyCart = () => (
    <Typography className="text-base">
      You have no items in your shopping cart,
      <Link to="/" className="text-[#007BFF]">
        {" "}
        start adding some
      </Link>
      !
    </Typography>
  );
  const renderCart = () => (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {cart.map((item) => {
          return (
            <CartItem
              key={item._id}
              product={item.product}
              quantity={item.quantity}
            />
          );
        })}
      </div>
      <div className="flex flex-row flex-nowrap justify-between mt-[40px]">
        <Typography className="text-2xl flex items-center">
          Total:&nbsp;
          <b className="text-[#F50057]">
            {cart.reduce(
              (acc, item) => acc + item.quantity * item.product.price,
              0
            )}
          </b>
        </Typography>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-row flex-wrap justify-between items-center">
            <Button
              className="text-white text-base bg-[#F50057] w-[160px] mb-1 mr-5"
              onClick={() => {
                handleEmptyCart();
              }}
            >
              EMPTY CART
            </Button>
          </div>
          <div className="flex flex-row flex-wrap justify-between items-center">
            <Link className="block w-full h-full" to="/user/cart/checkout">
              <Button className="text-white text-base bg-[#263238] w-[160px] mb-1 mr-5">
                CHECKOUT
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <main className="container mx-auto flex-grow-1 overflow-hidden p-8 min-h-[200px]">
      <Typography as="h5" className="text-2xl font-semibold">
        Your Shopping Cart
      </Typography>
      <hr className="my-2" />
      {cart.length == 0 ? renderEmptyCart() : renderCart()}
    </main>
  );
}
