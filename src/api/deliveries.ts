import apiClient from "./client";

import type {
  Delivery,
  PageableResponse,
} from "../types/delivery";

interface GetDeliveriesParams {
  pageNumber?: number;

  pageSize?: number;

  status?: string;
}

export async function getDeliveries({
  pageNumber = 1,
  pageSize = 5,
  status = "",
}: GetDeliveriesParams) {
  const response = await apiClient.get<
    PageableResponse<Delivery>
  >("/deliveries", {
    params: {
      pageNumber,
      pageSize,
      status: status || undefined,
    },
  });

  return response.data;
}

export async function getDeliveryById(
  id: string
) {
  const response =
    await apiClient.get<Delivery>(
      `/deliveries/${id}`
    );

  return response.data;
}