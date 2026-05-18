import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { getDeliveryById } from "../api/deliveries";

import StatusBadge from "../components/common/StatusBadge";

import PageContainer from "../components/layout/PageContainer";

import DeliveryTimeline from "../components/delivery/DeliveryTimeline";

import type { Delivery } from "../types/delivery";

export default function DeliveryDetailPage() {
  const { id } = useParams();

  const [delivery, setDelivery] =
    useState<Delivery | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const data =
          await getDeliveryById(id!);

        setDelivery(data);
      } catch (err) {
        console.error(err);

        toast.error(
          "Failed to load delivery"
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

  if (!delivery) {
    return (
      <div className="p-6">
        Delivery not found
      </div>
    );
  }

  const createdAt = delivery.createdAt
    ? new Date(delivery.createdAt)
    : null;

  const lastAttemptAt =
    delivery.lastAttemptAt
      ? new Date(
          delivery.lastAttemptAt
        )
      : null;

  const nextRetryAt =
    delivery.nextRetryAt
      ? new Date(
          delivery.nextRetryAt
        )
      : null;

  return (
    <PageContainer
      title="Delivery Details"
      subtitle={delivery.id}
    >
      {/* SUMMARY CARD */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Event Type
            </p>

            <h2 className="text-xl font-semibold">
              {delivery.eventType}
            </h2>
          </div>

          <StatusBadge
            status={delivery.status}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500 mb-1">
              Delivery ID
            </p>

            <p className="font-medium break-all">
              {delivery.id}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">
              Webhook ID
            </p>

            <p className="font-medium break-all">
              {delivery.webhookId}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">
              Attempts
            </p>

            <p className="font-medium">
              {delivery.attemptCount ?? 0}/
              {delivery.maxAttempts ?? 5}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">
              Response Code
            </p>

            <p className="font-medium">
              {delivery.responseCode ??
                "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">
              Created At
            </p>

            <p className="font-medium">
              {createdAt &&
              !isNaN(createdAt.getTime())
                ? createdAt.toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">
              Last Attempt
            </p>

            <p className="font-medium">
              {lastAttemptAt &&
              !isNaN(
                lastAttemptAt.getTime()
              )
                ? lastAttemptAt.toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">
              Next Retry
            </p>

            <p className="font-medium">
              {nextRetryAt &&
              !isNaN(
                nextRetryAt.getTime()
              )
                ? nextRetryAt.toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* DELIVERY TIMELINE */}
      <div className="mb-6">
        <DeliveryTimeline
          delivery={delivery}
        />
      </div>

      {/* PAYLOAD */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Payload
          </h3>
        </div>

        <pre className="bg-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
          {JSON.stringify(
            delivery.payload ?? {},
            null,
            2
          )}
        </pre>
      </div>

      {/* ERROR CARD */}
      {delivery.errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="text-red-600 font-semibold mb-2">
            Error Message
          </h3>

          <p className="text-red-700 text-sm">
            {delivery.errorMessage}
          </p>
        </div>
      )}
    </PageContainer>
  );
}