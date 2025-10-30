"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface VendorFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  businessType: string;
  taxId: string;
}

// Configuration for Business Central API
const BC_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_BC_API_URL, // Add this to your .env file
  credentials: {
    username: process.env.NEXT_PUBLIC_BC_USERNAME,
    password: process.env.NEXT_PUBLIC_BC_PASSWORD,
  },
};

export default function VendorRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState<VendorFormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    businessType: "",
    taxId: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Create Basic Auth header
      const authHeader =
        "Basic " +
        btoa(
          `${BC_CONFIG.credentials.username}:${BC_CONFIG.credentials.password}`
        );

      // Transform formData to match Business Central's expected format
      const bcVendorData = {
        name: formData.companyName,
        contact: formData.contactPerson,
        email: formData.email,
        phoneNo: formData.phone,
        address: formData.address,
        businessType: formData.businessType,
        taxRegistrationNo: formData.taxId,
      };

      const response = await fetch(`${BC_CONFIG.baseUrl}/vendors`, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(bcVendorData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await response.json();
      alert("Vendor registration successful!");
      router.push("/vendordashboard");
    } catch (error) {
      alert("Error registering vendor. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center align-middle py-10 px-3">
      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-indigo-500/30 via-emerald-400/20 to-transparent p-[1px] shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white/80 shadow-xl ring-1 ring-black/5 backdrop-blur px-6 py-8 dark:bg-zinc-900/70 dark:ring-white/10"
        >
          <div className="mb-6">
            {/* <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-800/70 dark:text-zinc-200">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                            Trusted Vendor Onboarding
                        </div> */}
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center flex justify-center">
              Register as a Vendor
            </h2>

            {/* <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 justify-center align-centre">Register as a Vendor</h2> */}
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 text-center flex justify-center">
              Provide your business details to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="ACME Pvt Ltd"
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@company.com"
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 555 0123"
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street, City, State, ZIP"
                required
                rows={3}
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Business Type
              </label>
              <input
                type="text"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                placeholder="Manufacturer / Supplier"
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Tax ID
              </label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                placeholder="GST / VAT / PAN"
                required
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white/90 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              All fields are required. Your data remains confidential.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-700 transition hover:bg-zinc-50 active:scale-[.99] dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-indigo-500 active:scale-[.99]"
              >
                Register Vendor
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
