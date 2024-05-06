import { API_URL } from "../utils/config";

export async function getLowerStock() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/books/top-lower?limit=4`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getBooksByCategory(
  category = "all",
  page = 1,
  limit = 8
) {
  const token = localStorage.getItem("token");
  category = category || "all";
  if (category === "all") {
    const response = await fetch(
      `${API_URL}/books?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
  const response = await fetch(
    `${API_URL}/categories/${category}/books?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function searchBook(query) {
  query.set("search", query.get("keyword"));
  query.delete("keyword");
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/books?${query.toString()}&limit=8`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
export async function getProduct(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getReviews(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/books/${id}/reviews`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function createReview(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/books/${data.bookId}/reviews/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review: data.review, rating: data.rating }),
  });
  const res = await response.json();
  return res;
}

export async function deleteReview(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProducts(page = 1) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/books?page=${page}&limit=8`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function addProduct(product) {
  const token = localStorage.getItem("token");
  console.log(product);
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("author", product.author);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("publisher", product.publisher);
  formData.append("publishedYear", product.publishedYear);

  if (product.image) formData.append("image", product.image);
  formData.append("category", product.categoryID);
  formData.append("inventory", product.inventory);

  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
}

export async function updateProduct(product) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("author", product.author);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("publisher", product.publisher);
  formData.append("publishedYear", product.publishedYear);

  if (product.image) formData.append("image", product.image);
  formData.append("category", product.categoryID);
  formData.append("inventory", product.inventory);

  const response = await fetch(`${API_URL}/books/${product._id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response.json();
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
