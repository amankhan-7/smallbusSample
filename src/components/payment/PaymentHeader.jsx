import Image from "next/image";
import Link from "next/link";

export default function PaymentHeader() {
  return (
    <header className="text-center py-2 bg-white shadow fixed w-full top-0 z-[1000]">
      <Link
        href="/"
        className="inline-block py-1 text-[24px] text-[#004aad] font-black"
      >
        <Image src="/logo.svg" alt="SmallBus Logo" width={120} height={40} />
      </Link>
    </header>
  );
}
