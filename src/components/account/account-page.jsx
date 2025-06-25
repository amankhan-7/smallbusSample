import { Suspense } from "react";
import AccountTabs from "@/components/account/account-tabs";
import AccountHeader from "@/components/account/account-header";

export default function AccountPage() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] text-[var(--text-color)] font-sans">
      <div className="max-w-[900px] w-full min-h-screen mt-16 pt-6 mx-auto mb-[50px] px-[15px]">
        <AccountHeader />
        <Suspense fallback={<div>Loading...</div>}>
          <AccountTabs />
        </Suspense>
      </div>
    </div>
  );
}
