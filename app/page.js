import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">🛠️ Developer Home</h1>

      <div className="space-y-4 w-full max-w-md">
        <Link href="/buses">
          <div className="w-full p-4 bg-white shadow-md rounded-xl hover:bg-blue-50 cursor-pointer">
            🚌 Go to Buses Page
          </div>
        </Link>

        <Link href="/payment">
          <div className="w-full p-4 bg-white shadow-md rounded-xl hover:bg-green-50 cursor-pointer">
            💳 Go to Payment Page
          </div>
        </Link>
      </div>
    </div>
  );
}
