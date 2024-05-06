import { API_URL } from "../utils/config";
export async function getMe() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function updateMe(data) {
  const form = new FormData();
  form.append("name", data.name);
  form.append("image", data.image[0]);
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/update-me`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  const res = await response.json();
  return res;
}

export async function getUsers(page) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function updateUser(id, data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}
