import { Navigation } from "@/components/navigation/navigation";

export default function LoginLayout({ children }) {
  return (
    <>
      <main className="flex md:items-center justify-center h-fit md:min-h-screen pt-[6.25rem] md:p-0 px-5">
        {children}
      </main>
    </>
  );
}
