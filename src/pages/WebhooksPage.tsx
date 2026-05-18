import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getWebhooks } from "../api/webhooks";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";
import DataTable from "../components/table/DataTable";
import StatusBadge from "../components/common/StatusBadge";

import type {
  PageableResponse,
  Webhook,
} from "../types/webhook";

export default function WebhooksPage() {
  const [data, setData] =
    useState<PageableResponse<Webhook>>();

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const navigate = useNavigate();

  async function fetchWebhooks() {
    try {
      setLoading(true);

      const response =
     await getWebhooks({
         pageNumber: page,
         pageSize: 5,
      });

      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWebhooks();
  }, [page]);

  const columns = [
    {
      header: "URL",

      render: (w: Webhook) => (
        <span className="truncate block max-w-sm">
          {w.url}
        </span>
      ),
    },

    {
      header: "Description",

      render: (w: Webhook) =>
        w.description,
    },

    {
      header: "Status",

      render: (w: Webhook) => (
        <StatusBadge
          status={w.status}
        />
      ),
    },

    {
      header: "Created",

      render: (w: Webhook) =>
        new Date(
          w.createdAt
        ).toLocaleString(),
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Webhooks
        </h1>

        <button
          onClick={() =>
            navigate("/webhooks/new")
          }
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Create Webhook
        </button>
      </div>

      {/* CONTENT */}
      {loading ? (
        <Loader />
      ) : data?.content.length === 0 ? (
        <EmptyState message="No webhooks found" />
      ) : (
        <>
          <DataTable
            data={data?.content || []}
            columns={columns}
            onRowClick={(row) =>
              navigate(
                `/webhooks/${row.id}`
              )
            }
          />

<Pagination
  currentPage={page}
  totalPages={data?.totalPages || 0}
  onPageChange={setPage}
/>
        </>
      )}
    </div>
  );
}