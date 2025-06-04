import { Navigation } from "@/components/navigation";

export const metadata = {
  title: "Login - SmallBus",
  description: "Login to your SmallBus account",
};

export default function LoginLayout({ children }) {
  return (
    <>
      <Navigation showBackLink={true} backTo="/home" />
      <main className="flex items-center justify-center min-h-[85vh] pt-20 px-4">
        {children}
      </main>
    </>
  );
}
