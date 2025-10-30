"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function VendorLoginPage() {
  const router = useRouter();
  const DEMO_EMAIL = "vendor.demo@example.com";
  const DEMO_PASSWORD = "vendor123!";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Demo auth: accept only demo credentials
      if (!email || !password) throw new Error("Enter email and password");
      if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        throw new Error("Invalid credentials. Use the demo credentials shown below.");
      }
      localStorage.setItem("vendorAuth", "1");
      router.push("/vendordashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-indigo-500/30 via-emerald-400/20 to-transparent p-[1px] shadow-xl">
        <form
          onSubmit={onSubmit}
          className="rounded-2xl bg-white/80 px-6 py-8 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-zinc-900/70 dark:ring-white/10"
        >
          <h1 className="mb-1 text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Vendor Login</h1>
          <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">Access your dashboard and manage orders</p>

          {error ? (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</div>
          ) : null}

          <div className="mb-4 rounded-lg border border-zinc-200/60 bg-white/70 px-3 py-2 text-xs text-zinc-700 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-800/70 dark:text-zinc-200">
            <div className="mb-1 font-medium">Demo Credentials</div>
            <div>Email: <span className="font-mono">{DEMO_EMAIL}</span></div>
            <div>Password: <span className="font-mono">{DEMO_PASSWORD}</span></div>
            <button
              type="button"
              onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); }}
              className="mt-2 inline-flex rounded-md border border-zinc-300 px-2 py-1 text-xs hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Use demo credentials
            </button>
          </div>

          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-indigo-500 active:scale-[.99] disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
            New vendor? <a className="text-indigo-600 hover:underline" href="/vendorregister">Register</a>
          </p>
        </form>
      </div>
    </main>
  );
}


