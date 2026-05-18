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
  
  export default function AppRouter() {
    return (
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
  
            <Route
              path="/webhooks"
              element={<WebhooksPage />}
            />
  
            <Route
              path="/deliveries"
              element={<DeliveriesPage />}
            />

            <Route
              path="/webhooks/:id"
              element={<WebhookDetailPage />}
            />

           <Route
              path="/webhooks/new"
              element={<CreateWebhookPage />}
            />

           <Route
             path="/deliveries/:id"
             element={<DeliveryDetailPage />}
           />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    );
  }