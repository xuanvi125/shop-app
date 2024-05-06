import { API_URL } from "../utils/config";

export async function getAllCategories() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data;
}

export async function createCategory(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

export async function getCategory(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data;
}

export async function updateCategory(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/categories/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

export async function deleteCategory(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
