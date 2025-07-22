"use client";
import { useGetPopularRoutesQuery } from "@/utils/redux/api/bus";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PopularRoutes() {
  const { data, isLoading, isError } = useGetPopularRoutesQuery();
  const routes = data || [];

  return (
    <section className="mb-14 w-full py-15 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-12">
          Popular Bus Routes
        </h2>

        {isLoading && <p className="text-center">Loading popular routes...</p>}
        {isError && (
          <p className="text-center text-red-500">
            Error loading popular routes.
          </p>
        )}
        {routes.length === 0 && !isLoading && (
          <p className="text-center">No popular routes found.</p>
        )}

        {routes.length > 0 && (
          <div className="relative w-full">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-full"
            >
              <CarouselContent className="-ml-1 w-full">
                {routes.map((r, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Link
                        href={r.href}
                        className="border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-md hover:shadow-lg hover:border-[#004aad] transition-all group bg-white w-full"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                            {r.from} → {r.to}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Total Bookings: {r.totalBookings || "N/A"}
                          </p>
                        </div>
                        <div className="text-[#004aad] font-semibold text-sm flex items-center gap-2 flex-shrink-0 ml-2">
                          <span>from ₹ {r.avgPrice || "N/A"}</span>
                          <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-6" />
              <CarouselNext className="hidden sm:flex -right-4 lg:-right-6" />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
}
