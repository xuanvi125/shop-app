import { API_URL } from "../utils/config";

export async function login({ email, password }) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

export async function changePassword(data) {
  const response = await fetch(`${API_URL}/users/update-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}

export async function signUp(data) {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function forgotPassword(data) {
  const response = await fetch(`${API_URL}/users/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function resetPassword(data) {
  console.log(data.token);
  const response = await fetch(
    `${API_URL}/users/reset-password/${data.token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    }
  );
  return response.json();
}
