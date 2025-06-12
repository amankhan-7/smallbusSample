import AccountTabs from "./account-tabs";
import AccountHeader from "./account-header";

export default function AccountPage() {
  return (
    <div className="h-screen w-full bg-[#f8f9fa] text-[var(--text-color)] font-sans">
      <div className="max-w-[900px] w-full min-h-screen mt-16 pt-6 mx-auto mb-[50px] px-[15px]">
        <AccountHeader />
        <AccountTabs />
      </div>
    </div>
  );
}
