"use client";
import { useState, FormEvent } from "react";
import VendorAuthGuard from "../../screens/vendorAuth";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

const demoOrders: { poNumber: string; date: string; itemSku: string; qty: number; status: OrderStatus }[] = [
  { poNumber: "PO-1123", date: "2025-10-15", itemSku: "ITM-003", qty: 500, status: "Processing" },
  { poNumber: "PO-1124", date: "2025-10-18", itemSku: "ITM-001", qty: 80, status: "Pending" },
  { poNumber: "PO-1125", date: "2025-10-20", itemSku: "ITM-004", qty: 120, status: "Shipped" },
  { poNumber: "PO-1126", date: "2025-10-21", itemSku: "ITM-002", qty: 30, status: "Delivered" },
];

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState(demoOrders);
  const [form, setForm] = useState({ itemSku: "", qty: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const body = { itemSku: form.itemSku, quantity: Number(form.qty) };
      const res = await fetch("/api/vendor/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send purchase order");
      setMessage(data?.message || (data.forwarded ? "Sent to Business Central" : "Accepted"));
      setOrders([{ poNumber: `PO-${Math.floor(Math.random()*9000)+1000}`, date: new Date().toISOString().slice(0,10), itemSku: form.itemSku, qty: Number(form.qty), status: "Pending" }, ...orders]);
      setForm({ itemSku: "", qty: 1 });
    } catch (e: any) {
      setError(e?.message || "Failed to send purchase order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Purchase Orders</h1>

          <div className="mb-6 rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <h2 className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">Create Purchase Order</h2>
            {error ? <div className="mb-3 rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</div> : null}
            {message ? <div className="mb-3 rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">{message}</div> : null}
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-500">Item SKU</label>
                <input value={form.itemSku} onChange={(e) => setForm({ ...form, itemSku: e.target.value })} required className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500">Quantity</label>
                <input type="number" min={1} value={form.qty} onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })} required className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" />
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <button type="submit" disabled={loading} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-70">{loading ? "Sending..." : "Send PO"}</button>
              </div>
            </form>
          </div>

          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Requests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-zinc-500 dark:text-zinc-400">
                  <tr className="border-b border-zinc-200/60 dark:border-zinc-700/60">
                    <th className="py-2 pr-3">PO #</th>
                    <th className="py-2 pr-3">Date</th>
                    <th className="py-2 pr-3">Item</th>
                    <th className="py-2 pr-3">Qty</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-800 dark:text-zinc-200">
                  {orders.map((row) => (
                    <tr key={row.poNumber} className="border-b border-zinc-200/60 last:border-0 dark:border-zinc-700/60">
                      <td className="py-2 pr-3 font-medium">{row.poNumber}</td>
                      <td className="py-2 pr-3">{row.date}</td>
                      <td className="py-2 pr-3">{row.itemSku}</td>
                      <td className="py-2 pr-3">{row.qty}</td>
                      <td className="py-2">
                        <span className="inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs"
                          style={{
                            borderColor:
                              row.status === "Pending" ? "#f59e0b" : row.status === "Processing" ? "#6366f1" : row.status === "Shipped" ? "#06b6d4" : row.status === "Delivered" ? "#22c55e" : "#ef4444",
                            color:
                              row.status === "Pending" ? "#92400e" : row.status === "Processing" ? "#3730a3" : row.status === "Shipped" ? "#155e75" : row.status === "Delivered" ? "#166534" : "#991b1b",
                            background:
                              row.status === "Pending" ? "#fef3c7" : row.status === "Processing" ? "#eef2ff" : row.status === "Shipped" ? "#ecfeff" : row.status === "Delivered" ? "#ecfdf5" : "#fee2e2",
                          }}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background:
                            row.status === "Pending" ? "#f59e0b" : row.status === "Processing" ? "#6366f1" : row.status === "Shipped" ? "#06b6d4" : row.status === "Delivered" ? "#22c55e" : "#ef4444" }}></span>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </VendorAuthGuard>
  );
}


