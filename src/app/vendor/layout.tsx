import type { Metadata } from "next";
import VendorAuthGuard from "../screens/vendorAuth";
import VendorSidebar from "../screens/vendorSidebar";

export const metadata: Metadata = {
  title: "Vendor",
  description: "Vendor portal",
};

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <VendorAuthGuard>
      <div className="grid min-h-screen w-full grid-cols-1 gap-4 p-4 lg:grid-cols-[16rem_1fr]">
        <VendorSidebar />
        <div>{children}</div>
      </div>
    </VendorAuthGuard>
  );
}


