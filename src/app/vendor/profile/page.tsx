"use client";
import VendorAuthGuard from "../../screens/vendorAuth";

export default function VendorProfilePage() {
  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Vendor Profile</h1>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
              <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Company</h2>
              <div className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <div><span className="text-zinc-500">Name:</span> ACME Pvt Ltd</div>
                <div><span className="text-zinc-500">Type:</span> Manufacturer</div>
                <div><span className="text-zinc-500">Tax ID:</span> ABCD1234</div>
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70 lg:col-span-2">
              <h2 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Contact & Address</h2>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs text-zinc-500">Contact Person</label>
                  <input className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" defaultValue="John Doe" />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500">Email</label>
                  <input className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100" defaultValue="john@acme.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-zinc-500">Address</label>
                  <textarea rows={3} className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100">221B Baker Street, London, UK</textarea>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500">Save Changes</button>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <h2 className="mb-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">Documents</h2>
            <div className="mb-3 flex justify-end">
              <button className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">Upload Document</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-500">
                  <th className="py-2 pr-3 text-left">Document</th>
                  <th className="py-2 pr-3 text-left">Uploaded</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800 dark:text-zinc-200">
                {[
                  { name: "GST Certificate.pdf", uploaded: "2025-10-01", status: "Verified" },
                  { name: "PAN Card.jpg", uploaded: "2025-10-05", status: "Pending" },
                  { name: "Bank Statement.pdf", uploaded: "2025-10-10", status: "Rejected" },
                ].map((doc) => (
                  <tr key={doc.name} className="border-b last:border-0 border-zinc-200/60 dark:border-zinc-700/60">
                    <td className="py-2 pr-3 font-medium">{doc.name}</td>
                    <td className="py-2 pr-3">{doc.uploaded}</td>
                    <td className="py-2">{doc.status}</td>
                    <td className="py-2 flex gap-2">
                      <button className="rounded bg-green-600 px-2 py-1 text-xs font-medium text-white hover:bg-green-700">Download</button>
                      <button className="rounded bg-rose-600 px-2 py-1 text-xs font-medium text-white hover:bg-rose-700">Delete</button>
                    </td>
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


