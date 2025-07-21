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
    <section className="h-140 md:h-78 pt-15 bg-white">
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
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {routes.map((r, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Link
                      href={`/buses?fromCity=${r.route.from}&toCity=${
                        r.route.to
                      }&travelDate=${new Date().toISOString().split("T")[0]}`}
                      className="border border-gray-200 rounded-lg p-5 flex justify-between items-center shadow-md hover:shadow-lg hover:border-[#004aad] transition-all group bg-white"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {r.route.from} → {r.route.to}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Total Bookings: {r.totalBookings}
                        </p>
                      </div>
                      <div className="text-[#004aad] font-semibold text-sm flex items-center gap-2">
                        <span>from ₹ {r.avgPrice}</span>
                        <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="z-99" />
            <CarouselNext className="z-99" />
          </Carousel>
        )}
      </div>
    </section>
  );
}
