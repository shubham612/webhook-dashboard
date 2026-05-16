import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Webhooks", path: "/webhooks" },
  { name: "Deliveries", path: "/deliveries" },
  { name: "Retries", path: "/retries" },
  { name: "Dead Letter", path: "/dead-letter" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-8">
        Webhook Admin
      </h1>

      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg transition ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}