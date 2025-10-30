"use client";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function VendorAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const authed = typeof window !== "undefined" && localStorage.getItem("vendorAuth") === "1";
    if (!authed) router.replace("/vendorlogin");
  }, [router]);
  return <>{children}</>;
}


