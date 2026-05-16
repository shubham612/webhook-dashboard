import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
  import AppLayout from "../components/layout/AppLayout";
  
  import DashboardPage from "../pages/DashboardPage";
  import WebhooksPage from "../pages/WebhooksPage";
  import DeliveriesPage from "../pages/DeliveriesPage";
  
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
          </Routes>
        </AppLayout>
      </BrowserRouter>
    );
  }