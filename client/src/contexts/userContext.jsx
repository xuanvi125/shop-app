import { createContext, useContext, useEffect, useState } from "react";
import * as cartService from "../services/cartService";
const userContext = createContext();

export function UserProvider({ children }) {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await cartService.getCart();
      setCart(() => data.data);
      console.log("cahy");
    };

    fetchCart();
  }, []);
  return (
    <userContext.Provider value={{ cart, setCart }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  return useContext(userContext);
}
