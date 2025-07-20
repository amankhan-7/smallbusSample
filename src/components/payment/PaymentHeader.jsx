import Link from "next/link";

export default function PaymentHeader() {
  return (
    <header className="text-center py-2 bg-white shadow fixed w-full top-0 z-[1000]">
      <Link
        href="/"
        className="inline-block py-1 text-[24px] text-[#004aad] no-underline font-mont font-black"
      >
        smallbus
      </Link>
    </header>
  );
}
