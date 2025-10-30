import type { Metadata } from "next";
import VendorDashboard from "../screens/vendorDashboard";

export const metadata: Metadata = {
  title: "Vendor Dashboard",
  description: "Overview with items, purchase orders, and status charts",
};

export default function Page() {
  return <VendorDashboard />;
}


