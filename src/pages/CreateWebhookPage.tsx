import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createWebhook } from "../api/webhooks";

import PageContainer from "../components/layout/PageContainer";

const AVAILABLE_EVENTS = [
  "ORDER_CREATED",
  "PAYMENT_FAILED",
  "PAYMENT_SUCCESS",
  "USER_CREATED",
];

export default function CreateWebhookPage() {
  const navigate = useNavigate();

  const [url, setUrl] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /**
   * USER_CREATED pre-selected
   */
  const [events, setEvents] =
    useState<string[]>([
      "USER_CREATED",
    ]);

  function toggleEvent(event: string) {
    setEvents((prev) => {
      /**
       * remove if already selected
       */
      if (prev.includes(event)) {
        /**
         * prevent removing last event
         */
        if (prev.length === 1) {
          return prev;
        }

        return prev.filter(
          (e) => e !== event
        );
      }

      /**
       * add new
       */
      return [...prev, event];
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await createWebhook({
        url,
        description,
        events,
      });

      toast.success(
        "Webhook created successfully"
      );

      navigate("/webhooks");
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to create webhook"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer
      title="Create Webhook"
      subtitle="Register a new webhook endpoint"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6"
      >
        {/* URL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Webhook URL
          </label>

          <input
            type="url"
            required
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
            placeholder="https://example.com/webhook"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Optional description"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* EVENTS */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Event Subscriptions
          </label>

          <div className="grid grid-cols-2 gap-3">
            {AVAILABLE_EVENTS.map(
              (event) => (
                <label
                  key={event}
                  className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={events.includes(
                      event
                    )}
                    onChange={() =>
                      toggleEvent(event)
                    }
                    className="h-4 w-4"
                  />

                  <span className="text-sm font-medium">
                    {event}
                  </span>
                </label>
              )
            )}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Select one or more events
          </p>
        </div>

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Webhook"}
          </button>
        </div>
      </form>
    </PageContainer>
  );
}