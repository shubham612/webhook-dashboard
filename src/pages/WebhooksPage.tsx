import { useEffect, useState } from "react";

import { getWebhooks } from "../api/webhooks";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";
import WebhookTable from "../components/tables/WebhookTable";

import type{
  PageableResponse,
  Webhook,
} from "../types/webhook";

export default function WebhooksPage() {
  const [data, setData] =
    useState<PageableResponse<Webhook>>();

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);

  async function fetchWebhooks() {
    try {
      setLoading(true);

      const response = await getWebhooks(page);

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Webhooks
        </h1>
      </div>

      {loading ? (
        <Loader />
      ) : data?.content.length === 0 ? (
        <EmptyState message="No webhooks found" />
      ) : (
        <>
          <WebhookTable webhooks={data!.content} />

          <Pagination
            page={page}
            totalPages={data!.totalPages}
            onPrevious={() =>
              setPage((prev) => prev - 1)
            }
            onNext={() =>
              setPage((prev) => prev + 1)
            }
          />
        </>
      )}
    </div>
  );
}