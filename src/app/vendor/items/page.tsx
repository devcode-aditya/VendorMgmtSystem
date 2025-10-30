"use client";
import VendorAuthGuard from "../../screens/vendorAuth";

const items = [
  { sku: "ITM-001", name: "Industrial Valve", category: "Hardware", stock: 120, demand: 85 },
  { sku: "ITM-002", name: "Hydraulic Pump", category: "Machinery", stock: 40, demand: 65 },
  { sku: "ITM-003", name: "Copper Wire 10mm", category: "Electrical", stock: 260, demand: 210 },
  { sku: "ITM-004", name: "Steel Sheet 2mm", category: "Raw Material", stock: 90, demand: 120 },
];

export default function VendorItemsPage() {
  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Items</h1>
          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Item Catalog</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-zinc-500 dark:text-zinc-400">
                  <tr className="border-b border-zinc-200/60 dark:border-zinc-700/60">
                    <th className="py-2 pr-3">SKU</th>
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Category</th>
                    <th className="py-2 pr-3">Stock</th>
                    <th className="py-2">Demand</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-800 dark:text-zinc-200">
                  {items.map((row) => (
                    <tr key={row.sku} className="border-b border-zinc-200/60 last:border-0 dark:border-zinc-700/60">
                      <td className="py-2 pr-3 font-medium">{row.sku}</td>
                      <td className="py-2 pr-3">{row.name}</td>
                      <td className="py-2 pr-3">{row.category}</td>
                      <td className="py-2 pr-3">{row.stock}</td>
                      <td className="py-2">{row.demand}</td>
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


