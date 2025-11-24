"use client";
import VendorAuthGuard from "../../screens/vendorAuth";

export default function VendorInvoicesPage() {
  const invoices = [
    { number: "INV-1001", date: "2025-11-01", amount: 12000, status: "Paid" },
    { number: "INV-1002", date: "2025-11-10", amount: 8500, status: "Pending" },
    { number: "INV-1003", date: "2025-11-15", amount: 4300, status: "Overdue" },
  ];
  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Invoices</h1>
          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500">
                  <th className="py-2 pr-3 text-left">Invoice #</th>
                  <th className="py-2 pr-3 text-left">Date</th>
                  <th className="py-2 pr-3 text-left">Amount</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800 dark:text-zinc-200">
                {invoices.map((inv) => (
                  <tr key={inv.number} className="border-b last:border-0 border-zinc-200/60 dark:border-zinc-700/60">
                    <td className="py-2 pr-3 font-medium">{inv.number}</td>
                    <td className="py-2 pr-3">{inv.date}</td>
                    <td className="py-2 pr-3">₹{inv.amount.toLocaleString()}</td>
                    <td className="py-2">{inv.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </VendorAuthGuard>
  );
}
