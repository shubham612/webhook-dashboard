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
}: GetWebhooksParams = {}): Promise<PageableResponse<Webhook>> {
  const response = await client.get<Webhook[] | PageableResponse<Webhook>>("/webhooks", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  // Handle both array response (from webhook_service) and pageable response
  if (Array.isArray(response.data)) {
    const all = response.data;
    const start = (pageNumber - 1) * pageSize;
    const paged = all.slice(start, start + pageSize);
    return {
      content: paged,
      totalElements: all.length,
      totalPages: Math.ceil(all.length / pageSize),
      size: pageSize,
      number: pageNumber,
      first: pageNumber === 1,
      last: start + pageSize >= all.length,
    };
  }

  return response.data;
}

export async function getWebhookById(id: string): Promise<Webhook> {
  const response = await client.get<Webhook>(`/webhooks/${id}`);
  return response.data;
}

export async function createWebhook(payload: {
  url: string;
  description: string;
  events: string[];
}): Promise<Webhook> {
  const response = await client.post<Webhook>("/webhooks", payload);
  return response.data;
}

export async function updateWebhook(
  id: string,
  payload: {
    url: string;
    events: string[];
  }
): Promise<Webhook> {
  const response = await client.put<Webhook>(`/webhooks/${id}`, payload);
  return response.data;
}

export async function disableWebhook(id: string): Promise<void> {
  await client.delete(`/webhooks/${id}`);
}
