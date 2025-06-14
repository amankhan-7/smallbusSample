import { Navigation } from "@/components/navigation/navigation";

export default function SeatsLayout({ children }) {
  return (
    <>
      <main className="min-h-screen bg-gray-50 pt-20">{children}</main>
    </>
  );
}
