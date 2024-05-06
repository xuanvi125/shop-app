import { API_URL } from "../utils/config";

export const getCart = async () => {
  const res = await fetch(`${API_URL}/users/cart/items`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const addToCart = async (bookId) => {
  const res = await fetch(`${API_URL}/users/cart/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productID: bookId, quantity: 1 }),
  });
  return res.json();
};

export const removeFromCart = async (bookId) => {
  const res = await fetch(`${API_URL}/users/cart/items/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res;
};

export const updateCart = async (bookId, quantity) => {
  const res = await fetch(`${API_URL}/users/cart/items/${bookId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  return res.json();
};

export const emptyCart = async () => {
  const res = await fetch(`${API_URL}/users/cart/items/all`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const checkout = async () => {
  const res = await fetch(`${API_URL}/users/cart/checkout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};
