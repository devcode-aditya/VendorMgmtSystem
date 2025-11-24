"use client";
import VendorAuthGuard from "../../screens/vendorAuth";

export default function VendorDocumentsPage() {
  const docs = [
    { name: "GST Certificate.pdf", uploaded: "2025-10-01", status: "Verified" },
    { name: "PAN Card.jpg", uploaded: "2025-10-05", status: "Pending" },
    { name: "Bank Statement.pdf", uploaded: "2025-10-10", status: "Rejected" },
  ];
  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Documents</h1>
          <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500">
                  <th className="py-2 pr-3 text-left">Document</th>
                  <th className="py-2 pr-3 text-left">Uploaded</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800 dark:text-zinc-200">
                {docs.map((doc) => (
                  <tr key={doc.name} className="border-b last:border-0 border-zinc-200/60 dark:border-zinc-700/60">
                    <td className="py-2 pr-3 font-medium">{doc.name}</td>
                    <td className="py-2 pr-3">{doc.uploaded}</td>
                    <td className="py-2">{doc.status}</td>
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
