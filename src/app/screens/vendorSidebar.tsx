"use client";
import { usePathname } from "next/navigation";

const links = [
  { href: "/vendordashboard", label: "Overview" },
  { href: "/vendor/items", label: "Items" },
  { href: "/vendor/orders", label: "Orders" },
  { href: "/vendor/quotes", label: "Quotes" },
  { href: "/vendor/invoices", label: "Invoices" },
  { href: "/vendor/payments", label: "Payments" },
  { href: "/vendor/support", label: "Support" },
  { href: "/vendor/profile", label: "Profile" },
];

export default function VendorSidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full w-64 shrink-0 rounded-2xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
      <div className="mb-4">
        <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Vendor Portal</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">Manage your operations</div>
      </div>
      <nav className="space-y-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <a
              key={l.href}
              href={l.href}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              <span>{l.label}</span>
            </a>
          );
        })}
      </nav>
      <div className="mt-4 border-t border-zinc-200/60 pt-4 text-xs text-zinc-500 dark:border-zinc-700/60 dark:text-zinc-400">
        <button
          onClick={() => {
            localStorage.removeItem("vendorAuth");
            window.location.href = "/vendorlogin";
          }}
          className="w-full rounded-lg bg-rose-600 px-3 py-2 text-center font-medium text-white hover:bg-rose-500"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}


