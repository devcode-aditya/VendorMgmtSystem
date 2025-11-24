"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import VendorAuthGuard from "../../../screens/vendorAuth";

export default function AddVendorItemPage() {
  const router = useRouter();
  const [form, setForm] = useState({ sku: "", name: "", category: "", stock: "", demand: "" });
  const [status, setStatus] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now, we just log and show a success message. Integrate with API later.
    console.log("Add item:", form);
    setStatus("Item added (mock)");
    setTimeout(() => router.push("/vendor/items"), 800);
  }

  return (
    <VendorAuthGuard>
      <main className="min-h-[80vh] px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Add Item</h1>
          <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/70">
            <div className="grid gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">SKU</span>
                <input name="sku" value={form.sku} onChange={handleChange} className="mt-1 rounded-md border px-3 py-2" />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Name</span>
                <input name="name" value={form.name} onChange={handleChange} className="mt-1 rounded-md border px-3 py-2" />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Category</span>
                <input name="category" value={form.category} onChange={handleChange} className="mt-1 rounded-md border px-3 py-2" />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Stock</span>
                <input name="stock" value={form.stock} onChange={handleChange} type="number" className="mt-1 rounded-md border px-3 py-2" />
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">Demand</span>
                <input name="demand" value={form.demand} onChange={handleChange} type="number" className="mt-1 rounded-md border px-3 py-2" />
              </label>

              <div className="flex items-center justify-between pt-2">
                <button type="submit" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Add</button>
                <span className="text-sm text-zinc-600 dark:text-zinc-300">{status}</span>
              </div>
            </div>
          </form>
        </div>
      </main>
    </VendorAuthGuard>
  );
}
