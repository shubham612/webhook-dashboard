import type{ Webhook } from "../../types/webhook";
import StatusBadge from "../common/StatusBadge";

interface Props {
  webhooks: Webhook[];
}

export default function WebhookTable({
  webhooks,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">URL</th>
            <th className="text-left p-4">Description</th>
            <th className="text-left p-4">Events</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Created</th>
          </tr>
        </thead>

        <tbody>
          {webhooks.map((webhook) => (
            <tr
              key={webhook.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4 max-w-sm truncate">
                {webhook.url}
              </td>

              <td className="p-4">
                {webhook.description}
              </td>

              <td className="p-4">
                {webhook.events.join(", ")}
              </td>

              <td className="p-4">
                <StatusBadge status={webhook.status} />
              </td>

              <td className="p-4">
                {new Date(
                  webhook.createdAt
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}