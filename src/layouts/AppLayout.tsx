import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Webhooks",
    path: "/webhooks",
  },
  {
    label: "Deliveries",
    path: "/deliveries",
  },
  {
    label: "Queues",
    path: "/queues",
  },
  {
    label: "Dead Letter",
    path: "/dead-letter",
  },
  {
    label: "Logs",
    path: "/logs",
  },
];

export default function AppLayout({ children }: Props) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-10">
          Webhook Dashboard
        </h1>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  block px-4 py-3 rounded-lg transition
                  ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-slate-800"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}