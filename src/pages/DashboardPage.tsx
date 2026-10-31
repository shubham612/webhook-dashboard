import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWebhooks } from "../api/webhooks";
import { getDeliveries } from "../api/deliveries";
import Loader from "../components/common/Loader";

interface Stats {
  totalWebhooks: number;
  totalDeliveries: number;
  pendingRetries: number;
  deadLetters: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalWebhooks: 0,
    totalDeliveries: 0,
    pendingRetries: 0,
    deadLetters: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);

        const [webhooksRes, deliveriesRes, pendingRes, deadRes] =
          await Promise.allSettled([
            getWebhooks({ pageNumber: 1, pageSize: 1 }),
            getDeliveries({ pageNumber: 1, pageSize: 1 }),
            getDeliveries({ pageNumber: 1, pageSize: 1, status: "PENDING" }),
            getDeliveries({ pageNumber: 1, pageSize: 1, status: "DEAD" }),
          ]);

        setStats({
          totalWebhooks:
            webhooksRes.status === "fulfilled"
              ? webhooksRes.value.totalElements
              : 0,
          totalDeliveries:
            deliveriesRes.status === "fulfilled"
              ? deliveriesRes.value.totalElements
              : 0,
          pendingRetries:
            pendingRes.status === "fulfilled"
              ? pendingRes.value.totalElements
              : 0,
          deadLetters:
            deadRes.status === "fulfilled"
              ? deadRes.value.totalElements
              : 0,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Overview of distributed webhook event delivery platform
          </p>
        </div>
        <Link
          to="/webhooks/new"
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Create Webhook
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/webhooks"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition block"
          >
            <p className="text-gray-500 font-medium text-sm">Total Webhooks</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">
              {stats.totalWebhooks}
            </h2>
            <p className="text-xs text-blue-600 mt-2 font-medium">
              View active endpoints &rarr;
            </p>
          </Link>

          <Link
            to="/deliveries"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition block"
          >
            <p className="text-gray-500 font-medium text-sm">Deliveries</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">
              {stats.totalDeliveries}
            </h2>
            <p className="text-xs text-blue-600 mt-2 font-medium">
              View all attempts &rarr;
            </p>
          </Link>

          <Link
            to="/retries"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition block"
          >
            <p className="text-gray-500 font-medium text-sm">Pending / Retrying</p>
            <h2 className="text-3xl font-bold mt-2 text-amber-600">
              {stats.pendingRetries}
            </h2>
            <p className="text-xs text-amber-600 mt-2 font-medium">
              View queued retries &rarr;
            </p>
          </Link>

          <Link
            to="/dead-letter"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition block"
          >
            <p className="text-gray-500 font-medium text-sm">Dead Letters</p>
            <h2 className="text-3xl font-bold mt-2 text-red-600">
              {stats.deadLetters}
            </h2>
            <p className="text-xs text-red-600 mt-2 font-medium">
              View failed deliveries &rarr;
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
