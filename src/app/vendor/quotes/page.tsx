"use client";
import { useState, FormEvent } from "react";
import VendorAuthGuard from "../../screens/vendorAuth";

export default function VendorQuotesPage() {
  const [quoteHeader, setQuoteHeader] = useState({ quoteNumber: `PQ-${Math.floor(Math.random()*9000)+1000}`, vendor: "", date: new Date().toISOString().slice(0,10) });
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
      // Replace with real API call
      setTimeout(() => {
        setMessage("Quote submitted (mock)");
        setQuoteHeader({ quoteNumber: `PQ-${Math.floor(Math.random()*9000)+1000}`, vendor: "", date: new Date().toISOString().slice(0,10) });
        setLines([{ sku: "", description: "", qty: 1, unitPrice: 0 }]);
        setLoading(false);
      }, 800);
    } catch (e: any) {
      setError(e?.message || "Failed to submit quote");
      setLoading(false);
    }
  };

  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Purchase Quotes</h1>
          <div className="mb-6 rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <h2 className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">Create Purchase Quote</h2>
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs text-zinc-500">Quote Number</label>
                <input value={quoteHeader.quoteNumber} onChange={(e) => setQuoteHeader({ ...quoteHeader, quoteNumber: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500">Vendor</label>
                <input value={quoteHeader.vendor} onChange={(e) => setQuoteHeader({ ...quoteHeader, vendor: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500">Date</label>
                <input type="date" value={quoteHeader.date} onChange={(e) => setQuoteHeader({ ...quoteHeader, date: e.target.value })} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" />
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
                <button onClick={() => onSubmit()} disabled={loading} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-70">{loading ? "Sending..." : "Send Quote"}</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </VendorAuthGuard>
  );
}
