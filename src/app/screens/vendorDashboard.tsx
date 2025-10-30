"use client";
import React from "react";
import VendorAuthGuard from "./vendorAuth";
import VendorSidebar from "./vendorSidebar";

type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

interface ItemRow {
  sku: string;
  name: string;
  category: string;
  stock: number;
  demand: number;
}

interface PurchaseOrderRow {
  poNumber: string;
  date: string;
  itemSku: string;
  qty: number;
  status: OrderStatus;
}

const sampleItems: ItemRow[] = [
  { sku: "ITM-001", name: "Industrial Valve", category: "Hardware", stock: 120, demand: 85 },
  { sku: "ITM-002", name: "Hydraulic Pump", category: "Machinery", stock: 40, demand: 65 },
  { sku: "ITM-003", name: "Copper Wire 10mm", category: "Electrical", stock: 260, demand: 210 },
  { sku: "ITM-004", name: "Steel Sheet 2mm", category: "Raw Material", stock: 90, demand: 120 },
];

const sampleOrders: PurchaseOrderRow[] = [
  { poNumber: "PO-1123", date: "2025-10-15", itemSku: "ITM-003", qty: 500, status: "Processing" },
  { poNumber: "PO-1124", date: "2025-10-18", itemSku: "ITM-001", qty: 80, status: "Pending" },
  { poNumber: "PO-1125", date: "2025-10-20", itemSku: "ITM-004", qty: 120, status: "Shipped" },
  { poNumber: "PO-1126", date: "2025-10-21", itemSku: "ITM-002", qty: 30, status: "Delivered" },
];

function kpiCard(label: string, value: string, sub?: string) {
  return (
    <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{value}</div>
      {sub ? <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">{sub}</div> : null}
    </div>
  );
}

function BarChart({ data, height = 140 }: { data: number[]; height?: number }) {
  const max = Math.max(...data, 1);
  const barW = 28;
  const gap = 10;
  const width = data.length * (barW + gap) + gap;
  return (
    <svg className="w-full" style={{ height }} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {data.map((n, i) => {
        const h = Math.max(4, (n / max) * (height - 20));
        const x = gap + i * (barW + gap);
        const y = height - h - 8;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx={6} fill="url(#barGrad)" />
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart({
  segments,
  size = 160,
  thickness = 16,
}: {
  segments: { value: number; color: string; label: string }[];
  size?: number;
  thickness?: number;
}) {
  const total = segments.reduce((a, b) => a + b.value, 0) || 1;
  const radius = size / 2;
  const inner = radius - thickness;
  let startAngle = -90;
  const toXY = (angle: number) => {
    const rad = (Math.PI / 180) * angle;
    return [radius + radius * Math.cos(rad), radius + radius * Math.sin(rad)];
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={radius} cy={radius} r={inner} fill="transparent" />
      {segments.map((s, i) => {
        const angle = (s.value / total) * 360;
        const endAngle = startAngle + angle;
        const [sx, sy] = toXY(startAngle);
        const [ex, ey] = toXY(endAngle);
        const largeArc = angle > 180 ? 1 : 0;
        const path = `M ${sx} ${sy} A ${radius} ${radius} 0 ${largeArc} 1 ${ex} ${ey} L ${radius} ${radius} Z`;
        startAngle = endAngle;
        return <path key={i} d={path} fill={s.color} opacity={0.9} />;
      })}
      <circle cx={radius} cy={radius} r={inner} fill="var(--background)" opacity={0.9} />
    </svg>
  );
}

export default function VendorDashboard() {
  const totalOrders = sampleOrders.length.toString();
  const pending = sampleOrders.filter((o) => o.status === "Pending").length.toString();
  const fulfilled = sampleOrders.filter((o) => o.status === "Delivered").length.toString();
  const itemCount = sampleItems.length.toString();

  const demandData = sampleItems.map((i) => i.demand);
  const statusData = [
    { label: "Pending", value: sampleOrders.filter((o) => o.status === "Pending").length, color: "#f59e0b" },
    { label: "Processing", value: sampleOrders.filter((o) => o.status === "Processing").length, color: "#6366f1" },
    { label: "Shipped", value: sampleOrders.filter((o) => o.status === "Shipped").length, color: "#06b6d4" },
    { label: "Delivered", value: sampleOrders.filter((o) => o.status === "Delivered").length, color: "#22c55e" },
  ];

  return (
    <VendorAuthGuard>
      <div className="grid min-h-screen w-full grid-cols-1 gap-4 p-4 lg:grid-cols-[16rem_1fr]">
        <VendorSidebar />
        <main className="min-h-[80vh]">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Vendor Dashboard</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Overview of your items, purchase orders, and statuses.</p>
          </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCard("Total Orders", totalOrders)}
          {kpiCard("Pending", pending)}
          {kpiCard("Delivered", fulfilled)}
          {kpiCard("Items", itemCount)}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Item Demand</h2>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Last 30 days</span>
            </div>
            <BarChart data={demandData} />
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-4">
              {sampleItems.map((it) => (
                <div key={it.sku} className="flex items-center justify-between rounded-lg border border-zinc-200/60 px-2 py-1 dark:border-zinc-700/60">
                  <span className="truncate">{it.name}</span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{it.demand}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Order Status</h2>
            </div>
            <div className="flex items-center justify-center">
              <DonutChart segments={statusData} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              {statusData.map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded" style={{ background: s.color }}></span>
                    {s.label}
                  </span>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Item Details</h2>
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
                  {sampleItems.map((row) => (
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

          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Purchase Order Requests</h2>
              <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-500">New Request</button>
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
                  {sampleOrders.map((row) => (
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
        </section>
        </main>
      </div>
    </VendorAuthGuard>
  );
}


