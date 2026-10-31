import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import DashboardPage from "../pages/DashboardPage";
import WebhooksPage from "../pages/WebhooksPage";
import DeliveriesPage from "../pages/DeliveriesPage";
import DeliveryDetailPage from "../pages/DeliveryDetailPage";
import WebhookDetailPage from "../pages/WebhookDetailPage";
import CreateWebhookPage from "../pages/CreateWebhookPage";
import RetryPage from "../pages/RetryPage";
import DeadLetterPage from "../pages/DeadLetterPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/webhooks" element={<WebhooksPage />} />
          <Route path="/webhooks/new" element={<CreateWebhookPage />} />
          <Route path="/webhooks/:id" element={<WebhookDetailPage />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
          <Route path="/deliveries/:id" element={<DeliveryDetailPage />} />
          <Route path="/retries" element={<RetryPage />} />
          <Route path="/dead-letter" element={<DeadLetterPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
