import type { Metadata } from "next";
import VendorRegistrationPage from "@/src/app/screens/vendorRegistrationPage";
import VendorLoginPage from "../vendorlogin/page";

export const metadata: Metadata = {
  title: "Vendor Registration",
  description: "Register as a vendor",
};

export default function Page() {
  return <VendorLoginPage />;
}


