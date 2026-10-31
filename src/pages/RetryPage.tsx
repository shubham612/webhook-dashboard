import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getDeliveries } from "../api/deliveries";
import PageContainer from "../components/layout/PageContainer";
import PageState from "../components/common/PageState";
import Pagination from "../components/common/Pagination";
import DataTable from "../components/table/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import type { Delivery, PageableResponse } from "../types/delivery";

export default function RetryPage() {
  const [data, setData] = useState<PageableResponse<Delivery>>();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await getDeliveries({
        pageNumber: page,
        pageSize: 10,
        status: "PENDING",
      });
      setData(response);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch retry deliveries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  const columns = [
    {
      header: "Delivery ID",
      render: (delivery: Delivery) => (
        <button
          onClick={() => navigate(`/deliveries/${delivery.id}`)}
          className="text-blue-600 hover:text-blue-800 hover:underline font-mono text-sm text-left"
        >
          {delivery.id}
        </button>
      ),
    },
    {
      header: "Event",
      render: (delivery: Delivery) => delivery.eventType,
    },
    {
      header: "Status",
      render: (delivery: Delivery) => <StatusBadge status={delivery.status} />,
    },
    {
      header: "Attempt",
      render: (delivery: Delivery) => `${delivery.attemptCount} / ${delivery.maxAttempts}`,
    },
    {
      header: "Next Retry",
      render: (delivery: Delivery) =>
        delivery.nextRetryAt ? new Date(delivery.nextRetryAt).toLocaleString() : "Pending",
    },
    {
      header: "Created At",
      render: (delivery: Delivery) =>
        delivery.createdAt ? new Date(delivery.createdAt).toLocaleString() : "N/A",
    },
  ];

  return (
    <PageContainer
      title="Retrying Deliveries"
      subtitle="Deliveries queued or scheduled for retry"
    >
      <PageState
        loading={loading}
        isEmpty={!data?.content?.length}
        emptyMessage="No pending retries found"
      >
        <DataTable data={data?.content || []} columns={columns} />
        <Pagination
          currentPage={page}
          totalPages={data?.totalPages || 0}
          onPageChange={setPage}
        />
      </PageState>
    </PageContainer>
  );
}
