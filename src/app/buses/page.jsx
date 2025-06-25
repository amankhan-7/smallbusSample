"use client";

import React, { useState } from "react";
import ButtonUI from "@/components/UI/ButtonUI";
import { useRouter } from "next/navigation";

export default function BusesPage() {
  const [sortOption, setSortOption] = useState("Price: Low to High");
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="w-full max-w-screen-xl mx-auto pt-[90px] pb-[50px] px-2">
        {/* Section 1: Selected Route */}
        <section className="md:max-w-9/10 md:mx-auto bg-white px-4 py-2 md:py-4.5 md:text-lg shadow-sm shadow-gray-400/50 flex flex-row justify-between items-center rounded-lg mb-6">
          <div>
            <h2 className="text-base md:text-xl text-black font-bold mb-1">
              Pune → Patna
            </h2>
            <p className="text-xs text-gray-600">Sat, 9 Jun</p>
          </div>
          <button className="border border-[#004aad] text-[#004aad] text-xs px-2 py-1 md:px-3 md:py-1.5 md:text-sm rounded bg-white hover:bg-gray-50 transition font-medium">
            Modify Search
          </button>
        </section>

        {/* Sort Dropdown */}
        <div className="flex justify-normal items-center mb-6">
          <label className="text-xs md:text-base font-medium text-gray-600 ml-3 md:ml-20">
            Sort by:
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded px-2 py-1.5 md:text-sm shadow-sm ml-5 text-xs"
          >
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Departure Time</option>
            <option>Rating</option>
          </select>
        </div>

        {/* Section 2: Available Buses */}
        <section className="w-full space-y-6">
          <div className="w-full bg-white px-4 py-2.5 md:py-5 md:px-5 shadow-sm shadow-gray-400/50  space-y-3 md:max-w-9/10 md:mx-auto rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base md:text-lg font-bold text-black">
                  Metro Link
                </h3>
                <p className="text-xs text-slate-600">AC Seater Express</p>
                <p className="text-base text-black mt-1 font-normal">
                  <span className="text-[#004aad]"> ★ </span>4.2
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-black">₹899</p>
                <p className="text-xs text-slate-600">38 seats left</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-900 mt-4">
              <div className="text-center">
                <p className="font-bold text-black text-base -ml-3">18:30</p>
                <p className="text-xs">Departure</p>
              </div>
              <div className="text-center">
                <p className="font-normal text-xs pb-12 text-gray-500">
                  5h 30m
                </p>
              </div>
              <div className="text-center">
                <p className="font-bold text-black text-base">00:00</p>
                <p className="text-xs">Arrival</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap text-sm text-gray-500 mt-2">
              <span className="bg-blue-50 text-[#004aad] px-1 py-0.5 md:text-xs md:px-1.5 md:py-1 rounded text-[11px]">
                WiFi
              </span>
              <span className="bg-blue-50 text-[#004aad]  px-1 py-0.5 md:text-xs md:px-1.5 md:py-1 rounded text-[11px]">
                Charging Port
              </span>
              <span className="bg-blue-50 text-[#004aad]  px-1 py-0.5 md:text-xs md:px-1.5 md:py-1 rounded text-[11px]">
                Water Bottle
              </span>
            </div>

            <ButtonUI onClick={() => {
              router.push("/seats");
            }} className="w-full hover:bg-[#00388a] mt-4 py-1.5">
              Select Seats
            </ButtonUI>
          </div>
        </section>
      </main>
    </div>
  );
}
