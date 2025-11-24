"use client";
import VendorAuthGuard from "../../screens/vendorAuth";

export default function VendorPaymentsPage() {
  const payments = [
    { ref: "PAY-2001", date: "2025-11-05", amount: 12000, method: "Bank Transfer", status: "Completed" },
    { ref: "PAY-2002", date: "2025-11-12", amount: 8500, method: "UPI", status: "Processing" },
    { ref: "PAY-2003", date: "2025-11-18", amount: 4300, method: "Cheque", status: "Failed" },
  ];
  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Payments</h1>
          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500">
                  <th className="py-2 pr-3 text-left">Payment Ref</th>
                  <th className="py-2 pr-3 text-left">Date</th>
                  <th className="py-2 pr-3 text-left">Amount</th>
                  <th className="py-2 pr-3 text-left">Method</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800 dark:text-zinc-200">
                {payments.map((pay) => (
                  <tr key={pay.ref} className="border-b last:border-0 border-zinc-200/60 dark:border-zinc-700/60">
                    <td className="py-2 pr-3 font-medium">{pay.ref}</td>
                    <td className="py-2 pr-3">{pay.date}</td>
                    <td className="py-2 pr-3">₹{pay.amount.toLocaleString()}</td>
                    <td className="py-2 pr-3">{pay.method}</td>
                    <td className="py-2">{pay.status}</td>
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
