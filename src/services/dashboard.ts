import { api } from "@/config/api";

import Cookies from "js-cookie";

export async function fetchDashboardData() {
  try {
    const token = Cookies.get("auth-token") || "";

    const response = await api.get("/nortus-v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}
