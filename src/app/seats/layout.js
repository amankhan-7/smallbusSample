import { Navigation } from "@/components/navigaation/navigation";

export default function SeatsLayout({ children }) {
  return (
    <>
      {/* <Navigation showBackLink={true} backTo="/home" /> */}
      <main className="min-h-screen bg-gray-50 pt-20">{children}</main>
    </>
  );
}
