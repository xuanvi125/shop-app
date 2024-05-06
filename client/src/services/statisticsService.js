import { API_URL } from "../utils/config";
export const StatisticsService = {
  getTotalRevenue: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/statistics/total-revenue`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTotalOrders: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/statistics/total-orders`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  },

  getTotalProducts: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/books/total-product`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTotalUsers: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/users/total-users`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTopProducts: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/statistics/top-best-selling`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    return data.data;
  },

  getMonthlyRevenue: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/statistics/monthly-revenue`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },

  getTopLowerBooks: async () => {
    const token = localStorage.getItem("token");
    const link = `${API_URL}/books/top-lower?limit=5&sort=inventory`;
    const response = await fetch(link, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.data;
  },
};
