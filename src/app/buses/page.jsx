"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import ButtonUI from "@/components/ui/ButtonUI";
import { useRouter } from "next/navigation";
import { useEncryptedSearchParams } from "@/hooks/useEncryptedSearchParams";
import { createSeatSelectionUrl } from "@/utils/navigation";
import { useGetBusScheduleMutation } from "@/utils/redux/api/bus";

function BusesContent() {
  const [sortOption, setSortOption] = useState("Price: Low to High");
  const router = useRouter();
  const encryptedParams = useEncryptedSearchParams();
  const [currentBusSchedule, setCurrentBusSchedule] = useState([]);
  const [searchData, setSearchData] = useState({
    from: null,
    to: null,
    date: null,
  });

  // Decrypt search parameters
  useEffect(() => {
    const decryptParams = async () => {
      const from = await encryptedParams.get("fromCity");
      const to = await encryptedParams.get("toCity");
      const date = await encryptedParams.get("travelDate");

      setSearchData({ from, to, date });
    };

    decryptParams();
  }, [encryptedParams]);

  const [getBusSchedule, { isLoading, isError }] = useGetBusScheduleMutation();

  useEffect(() => {
    const fetchBusSchedule = async () => {
      if (!searchData.from || !searchData.to || !searchData.date) return;

      try {
        const response = await getBusSchedule({
          fromCity: searchData.from,
          toCity: searchData.to,
          travelDate: searchData.date,
        }).unwrap();
        response.schedule && setCurrentBusSchedule(response.schedule);
      } catch (error) {
        console.error("Failed to fetch bus schedule:", error);
      }
    };

    fetchBusSchedule();
  }, [searchData.from, searchData.to, searchData.date, getBusSchedule]);

  const sortedSchedule = useMemo(() => {
    const schedule = [...currentBusSchedule];
    switch (sortOption) {
      case "Price: Low to High":
        return schedule.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return schedule.sort((a, b) => b.price - a.price);
      case "Departure Time":
        return schedule.sort((a, b) =>
          a.departureTime.localeCompare(b.departureTime)
        );
      case "Rating":
        return schedule.sort((a, b) => b.rating - a.rating);
      default:
        return schedule;
    }
  }, [currentBusSchedule, sortOption]);

  const handleModifySearch = () => {
    router.push("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="w-full max-w-screen-xl mx-auto pt-[90px] pb-[50px] px-2">
        <section className="md:max-w-9/10 md:mx-auto bg-white px-4 py-2 md:py-4.5 md:text-lg shadow-sm shadow-gray-400/50 flex flex-row justify-between items-center rounded-lg mb-6">
          <div>
            <h2 className="text-base md:text-xl text-black font-bold mb-1">
              {searchData.from} → {searchData.to}
            </h2>
            <p className="text-xs text-gray-600">
              {new Date(searchData.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={handleModifySearch}
            className="border border-[#004aad] text-[#004aad] text-xs px-2 py-1 md:px-3 md:py-1.5 md:text-sm rounded bg-white hover:bg-gray-50 transition font-medium"
          >
            Modify Search
          </button>
        </section>
        <div className="flex justify-normal items-center mb-6 md:max-w-9/10 md:mx-auto">
          <label className="text-xs md:text-base font-medium text-gray-600">
            Sort by:
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded px-2 py-1.5 md:text-sm shadow-sm ml-3 text-xs"
          >
            <option key="price-low-high">Price: Low to High</option>
            <option key="price-high-low">Price: High to Low</option>
            <option key="departure-time">Departure Time</option>
            <option key="rating">Rating</option>
          </select>
        </div>
        <section className="w-full space-y-6 animate-fadeInUp md:max-w-9/10 md:mx-auto">
          {isLoading && (
            <p className="text-center text-gray-600">Finding buses...</p>
          )}
          {isError && (
            <p className="text-center text-red-600">
              Could not fetch results. Please try again later.
            </p>
          )}
          {!isLoading &&
            !isError &&
            sortedSchedule.length > 0 &&
            sortedSchedule.map((bus, index) => (
              <BusCard key={bus._id} bus={bus} router={router} />
            ))}
          {!isLoading && !isError && sortedSchedule.length === 0 && (
            <p className="text-center text-gray-600">
              No buses found for this route on the selected date.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

function BusCard({ bus, router }) {
  return (
    <div className="w-full bg-white px-4 py-2.5 md:py-5 md:px-5 shadow-sm shadow-gray-400/50 space-y-3 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base md:text-lg font-bold text-black">
            {bus.busName}
          </h3>
          <p className="text-xs text-slate-600">{bus.BusName}</p>
          <p className="text-base text-black mt-1 font-normal">
            <span className="text-[#004aad]"> ★ </span>
            {bus.rating}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-black">₹{bus.price}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-900 mt-4">
        <div className="text-center">
          <p className="font-bold text-black text-base">{bus.departureTime}</p>
          <p className="text-xs">Departure</p>
        </div>
        <div className="text-center">
          <p className="font-normal text-xs pb-12 text-gray-500">
            {bus.duration}
          </p>
        </div>
        <div className="text-center">
          <p className="font-bold text-black text-base">{bus.arrivalTime}</p>
          <p className="text-xs">Arrival</p>
        </div>
      </div>
      <ButtonUI
        onClick={async () => {
          const encryptedUrl = await createSeatSelectionUrl(bus._id);
          router.push(encryptedUrl);
        }}
        className="w-full hover:bg-[#00388a] mt-4 py-1.5"
      >
        Select Seats
      </ButtonUI>
    </div>
  );
}

export default function BusesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading buses...
        </div>
      }
    >
      <BusesContent />
    </Suspense>
  );
}
