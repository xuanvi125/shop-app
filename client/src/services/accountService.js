import { API_URL } from "../utils/config";

export const addAccount = async (account) => {
  const res = await fetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });
  return res.json();
};

export const getAccounts = async () => {
  const res = await fetch(`${API_URL}/accounts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const deleteAccount = async (id) => {
  await fetch(`${API_URL}/accounts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const payOrder = async (order) => {
  const res = await fetch(`${API_URL}/accounts/payment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const getAccount = async (id) => {
  const res = await fetch(`${API_URL}/accounts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.json();
};

export const updateAccount = async (account) => {
  const res = await fetch(`${API_URL}/accounts/${account._id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });
  return res.json();
};
