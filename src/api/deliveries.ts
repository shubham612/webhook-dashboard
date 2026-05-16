import apiClient from "./client";

export async function getAllDeliveries() {
  const response = await apiClient.get("/deliveries");

  return response.data;
}