"use client";
import VendorAuthGuard from "../../screens/vendorAuth";
import Link from "next/link";

export default function VendorSupportPage() {
  const tickets = [
    { id: "TCK-3001", subject: "Invoice not received", date: "2025-11-10", status: "Open" },
    { id: "TCK-3002", subject: "Payment delay", date: "2025-11-12", status: "Closed" },
    { id: "TCK-3003", subject: "Document rejected", date: "2025-11-15", status: "Pending" },
  ];
  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Support</h1>
          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="mb-3 flex justify-end">
              <button className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">Create Ticket</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500">
                  <th className="py-2 pr-3 text-left">Ticket #</th>
                  <th className="py-2 pr-3 text-left">Subject</th>
                  <th className="py-2 pr-3 text-left">Date</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800 dark:text-zinc-200">
                {tickets.map((t) => (
                  <tr key={t.id} className="border-b last:border-0 border-zinc-200/60 dark:border-zinc-700/60 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                    <td className="py-2 pr-3 font-medium">
                      <Link href={`/vendor/support/${t.id}`} className="text-indigo-600 hover:underline">{t.id}</Link>
                    </td>
                    <td className="py-2 pr-3">{t.subject}</td>
                    <td className="py-2 pr-3">{t.date}</td>
                    <td className="py-2">{t.status}</td>
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
