import client from "./client";

import type {
  PageableResponse,
  Webhook,
} from "../types/webhook";

interface GetWebhooksParams {
  pageNumber?: number;

  pageSize?: number;
}

export async function getWebhooks({
  pageNumber = 1,
  pageSize = 5,
}: GetWebhooksParams = {}) {
  const response = await client.get<
    PageableResponse<Webhook>
  >("/webhooks", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
}

export async function getWebhookById(
  id: string
) {
  const response = await client.get<Webhook>(
    `/webhooks/${id}`
  );

  return response.data;
}

export async function createWebhook(
  payload: {
    url: string;

    description: string;

    events: string[];
  }
) {
  const response = await client.post(
    "/webhooks",
    payload
  );

  return response.data;
}