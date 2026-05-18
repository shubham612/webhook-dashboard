import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { getWebhookById } from "../api/webhooks";

import StatusBadge from "../components/common/StatusBadge";

import PageContainer from "../components/layout/PageContainer";

import type { Webhook } from "../types/webhook";

export default function WebhookDetailPage() {
  const { id } = useParams();

  const [webhook, setWebhook] =
    useState<Webhook | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const data =
          await getWebhookById(id!);

        setWebhook(data);
      } catch (err) {
        console.error(err);

        toast.error(
          "Failed to load webhook"
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!webhook) {
    return (
      <div className="p-6">
        Webhook not found
      </div>
    );
  }

  return (
    <PageContainer
      title="Webhook Details"
      subtitle={webhook.id}
    >
      {/* MAIN CARD */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Webhook Information
          </h2>

          <StatusBadge
            status={webhook.status}
          />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            URL
          </p>

          <p className="break-all">
            {webhook.url}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Description
          </p>

          <p>
            {webhook.description}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Created At
          </p>

          <p>
            {new Date(
              webhook.createdAt
            ).toLocaleString()}
          </p>
        </div>
      </div>

      {/* EVENTS SECTION */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Subscribed Events
        </h2>

        <div className="flex flex-wrap gap-2">
          {webhook.events.map(
            (event) => (
              <span
                key={event}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {event}
              </span>
            )
          )}
        </div>
      </div>
    </PageContainer>
  );
}