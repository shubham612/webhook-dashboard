import client from "./client";

import type {
    PageableResponse,
    Webhook,
  } from "../types/webhook";

export async function getWebhooks(page = 0) {
  const response = await client.get<
    PageableResponse<Webhook>
  >("/webhooks", {
    params: {
      page,
      pageSize: 5,
    },
  });

  return response.data;
}