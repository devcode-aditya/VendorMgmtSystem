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
  const [poHeader, setPoHeader] = useState({ poNumber: `PO-${Math.floor(Math.random()*9000)+1000}`, vendor: "", date: new Date().toISOString().slice(0,10) });
  const [lines, setLines] = useState<Array<{ sku: string; description: string; qty: number; unitPrice: number }>>([
    { sku: "", description: "", qty: 1, unitPrice: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const totalQty = lines.reduce((s, l) => s + Number(l.qty || 0), 0);
  const totalAmount = lines.reduce((s, l) => s + (Number(l.qty || 0) * Number(l.unitPrice || 0)), 0);

  const onSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const payload = { header: poHeader, lines };
      const res = await fetch("/api/vendor/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send purchase order");
      setMessage(data?.message || (data.forwarded ? "Sent to Business Central" : "Accepted"));
      const totalQty = lines.reduce((s, l) => s + Number(l.qty || 0), 0);
      setOrders([{ poNumber: poHeader.poNumber, date: poHeader.date, itemSku: lines.length === 1 ? lines[0].sku : "Multiple", qty: totalQty, status: "Pending" }, ...orders]);
      // reset header and lines
      setPoHeader({ poNumber: `PO-${Math.floor(Math.random()*9000)+1000}`, vendor: "", date: new Date().toISOString().slice(0,10) });
      setLines([{ sku: "", description: "", qty: 1, unitPrice: 0 }]);
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
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs text-zinc-500">PO Number</label>
                <input value={poHeader.poNumber} onChange={(e) => setPoHeader({ ...poHeader, poNumber: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500">Vendor</label>
                <input value={poHeader.vendor} onChange={(e) => setPoHeader({ ...poHeader, vendor: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500">Date</label>
                <input type="date" value={poHeader.date} onChange={(e) => setPoHeader({ ...poHeader, date: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" />
              </div>
              
            </div>

            <div className="mb-4">
              <h3 className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Line Items</h3>
              <div className="mt-2 space-y-2">
                {lines.map((ln, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input placeholder="SKU" value={ln.sku} onChange={(e) => setLines(lines.map((l,i)=> i===idx?{...l, sku:e.target.value}:l))} className="col-span-3 rounded-md border px-2 py-2 text-sm" />
                    <input placeholder="Description" value={ln.description} onChange={(e) => setLines(lines.map((l,i)=> i===idx?{...l, description:e.target.value}:l))} className="col-span-5 rounded-md border px-2 py-2 text-sm" />
                    <input type="number" min={1} placeholder="Qty" value={ln.qty} onChange={(e) => setLines(lines.map((l,i)=> i===idx?{...l, qty: Number(e.target.value)}:l))} className="col-span-2 rounded-md border px-2 py-2 text-sm" />
                    <input type="number" min={0} step="0.01" placeholder="Unit" value={ln.unitPrice} onChange={(e) => setLines(lines.map((l,i)=> i===idx?{...l, unitPrice: Number(e.target.value)}:l))} className="col-span-1 rounded-md border px-2 py-2 text-sm" />
                    <div className="col-span-1 flex justify-end">
                      <button type="button" onClick={() => setLines(lines.filter((_,i)=>i!==idx))} className="text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                ))}
                <div>
                  <button type="button" onClick={() => setLines([...lines, { sku: "", description: "", qty: 1, unitPrice: 0 }])} className="mt-2 rounded-md bg-indigo-600 px-3 py-1 text-sm text-white">Add Line</button>
                </div>
              </div>
            </div>

            {error ? <div className="mb-3 rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</div> : null}
            {message ? <div className="mb-3 rounded border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">{message}</div> : null}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 items-center">
              <div className="sm:col-span-2">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">Lines: <strong>{lines.length}</strong> • Total Qty: <strong>{totalQty}</strong></p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">Total Amount: <strong>₹{totalAmount.toFixed(2)}</strong></p>
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <button onClick={() => onSubmit()} disabled={loading} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-70">{loading ? "Sending..." : "Send PO"}</button>
              </div>
            </div>
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


