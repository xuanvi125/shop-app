import { Button } from "@material-tailwind/react";
import * as CartService from "../services/cartService";
import { useUser } from "../contexts/userContext";

function AddToCartButton({ bookId }) {
  const { setCart } = useUser();
  function handleAddToCart() {
    CartService.addToCart(bookId).then((data) => {
      setCart(data.data.cart);
    });
  }
  return (
    <Button
      size="lg"
      onClick={handleAddToCart}
      color="white"
      className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-[#263238] text-white"
      ripple={false}
      fullWidth={true}
    >
      <b>ADD TO CART</b>
    </Button>
  );
}

export default AddToCartButton;
