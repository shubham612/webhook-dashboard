import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { getDeliveries } from "../api/deliveries";

import PageContainer from "../components/layout/PageContainer";

import PageState from "../components/common/PageState";

import Pagination from "../components/common/Pagination";

import DataTable from "../components/table/DataTable";

import FilterBar from "../components/filters/FilterBar";

import SelectFilter from "../components/filters/SelectFilter";

import StatusBadge from "../components/common/StatusBadge";

import type {
  Delivery,
  PageableResponse,
} from "../types/delivery";

export default function DeliveriesPage() {
  const [data, setData] =
    useState<PageableResponse<Delivery>>();

  const [loading, setLoading] =
    useState(true);

   const [page, setPage] = useState(1);

  const [status, setStatus] =
    useState("");

  const navigate = useNavigate();

  async function fetchData() {
    try {
      setLoading(true);

      const response = await getDeliveries({
        pageNumber: page,
        pageSize: 10,
        status,
      });

      setData(response);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to fetch deliveries"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, status]);

  const columns = [
    {
      header: "Delivery ID",

      render: (delivery: Delivery) => (
        <button
          onClick={() =>
            navigate(
              `/deliveries/${delivery.id}`
            )
          }
          className="text-blue-600 hover:text-blue-800 hover:underline font-mono text-sm text-left"
        >
          {delivery.id}
        </button>
      ),
    },

    {
      header: "Status",

      render: (delivery: Delivery) => (
        <StatusBadge
          status={delivery.status}
        />
      ),
    },

    {
      header: "Created At",

      render: (delivery: Delivery) =>
        delivery.createdAt
          ? new Date(
              delivery.createdAt
            ).toLocaleString()
          : "N/A",
    },
  ];

  return (
    <PageContainer
      title="Deliveries"
      subtitle="Monitor webhook delivery attempts"
    >
      {/* FILTERS */}
      <FilterBar>
        <SelectFilter
          value={status}
          onChange={(value) => {
            setPage(0);

            setStatus(value);
          }}
          options={[
            "SUCCESS",
            "FAILED",
            "PENDING",
          ]}
          placeholder="All Status"
        />
      </FilterBar>

      {/* TABLE STATE */}
      <PageState
        loading={loading}
        isEmpty={!data?.content?.length}
        emptyMessage="No deliveries found"
      >
        <DataTable
          data={data?.content || []}
          columns={columns}
        />

        {/* PAGINATION */}
        <Pagination
          currentPage={page}
          totalPages={
            data?.totalPages || 0
          }
          onPageChange={setPage}
        />
      </PageState>
    </PageContainer>
  );
}