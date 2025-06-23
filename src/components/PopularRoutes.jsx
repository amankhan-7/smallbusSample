import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function PopularRoutes() {
  const routes = [
    { route: "Mumbai → Pune", meta: "50+ buses daily", price: "₹500" },
    { route: "Delhi → Chandigarh", meta: "35+ buses daily", price: "₹800" },
    { route: "Bangalore → Chennai", meta: "40+ buses daily", price: "₹600" },
  ];

  return (
    <section className="h-140 md:h-78 pt-15 bg-white"> 
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-12">
          Popular Bus Routes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6.5">
          {routes.map((r, i) => (
            <Link
              href="#"
              key={i}
              className="border border-gray-200 rounded-lg p-5 flex justify-between items-center shadow-md hover:shadow-lg hover:border-[#004aad] transition-all group bg-white"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {r.route}
                </h3>
                <p className="text-sm text-gray-600">{r.meta}</p>
              </div>
              <div className="text-[#004aad] font-semibold text-sm flex items-center gap-2">
                <span>from {r.price}</span>
                <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
