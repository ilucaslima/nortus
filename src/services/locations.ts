import { api } from "@/config/api";

import Cookies from "js-cookie";

interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  category: string;
  address: string;
  icon: string;
  color: string;
}

export const locations = async () => {
  try {
    const token = Cookies.get("auth-token") || "";
    const response = await api.get("/map/locations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.locations as Location[];
  } catch (error) {
    throw new Error("Failed to fetch locations");
  }
};
