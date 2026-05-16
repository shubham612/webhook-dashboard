import apiClient from "./client";

export async function getQueueStats() {
  const response = await apiClient.get("/queues/stats");

  return response.data;
}