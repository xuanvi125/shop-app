import { API_URL } from "../utils/config";

export const getOrders = async (page = 1) => {
  const res = await fetch(`${API_URL}/orders?limit=10&page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const updateOrder = async (id, data) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getOrder = async (id) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};
