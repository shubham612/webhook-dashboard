import type { Delivery } from "../../types/delivery";

interface Props {
  delivery: Delivery;
}

export default function DeliveryTimeline({ delivery }: Props) {
  const attempts = Array.from({ length: delivery.attemptCount || 1 });

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-4">Delivery Timeline</h3>

      <div className="space-y-4">
        {attempts.map((_, index) => {
          const isLast =
            index + 1 === delivery.attemptCount &&
            delivery.status !== "PENDING";

          return (
            <div key={index} className="flex items-start gap-3">
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full mt-1 ${
                  isLast
                    ? delivery.status === "SUCCESS"
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-gray-300"
                }`}
              />

              {/* Content */}
              <div>
                <p className="text-sm font-medium">
                  Attempt #{index + 1}
                </p>

                <p className="text-xs text-gray-500">
                  {isLast
                    ? delivery.status
                    : "FAILED / RETRY SCHEDULED"}
                </p>

                {isLast && delivery.responseCode && (
                  <p className="text-xs text-gray-600">
                    HTTP {delivery.responseCode}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}