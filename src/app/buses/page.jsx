"use client";

import React, { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useDecryptedParam } from "@/hooks/useEncryptedSearchParams";
import { createSeatSelectionUrl } from "@/utils/navigation";
import { useGetBusScheduleMutation } from "@/utils/redux/api/bus";
import NotifyForm from "@/components/NotifyForm/NotifyForm";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useBusRouteSEO } from "@/hooks/useSEO";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { notifyFormSchema } from "@/utils/validations/form-validation";
import LoadingScreen from "@/components/ui/loading";

function BusesContent() {
  const [sortOption, setSortOption] = useState("Price: Low to High");
  const router = useRouter();
  const [currentBusSchedule, setCurrentBusSchedule] = useState([]);
  const { value: fromCity, isLoading: isLoadingFrom } =
    useDecryptedParam("fromCity");
  const { value: toCity, isLoading: isLoadingTo } = useDecryptedParam("toCity");
  const { value: travelDate, isLoading: isLoadingDate } =
    useDecryptedParam("travelDate");

  const [getBusSchedule, { isLoading, isError }] = useGetBusScheduleMutation();

  const isDecrypting = isLoadingFrom || isLoadingTo || isLoadingDate;

  useBusRouteSEO(fromCity, toCity, travelDate, currentBusSchedule);

  useEffect(() => {
    const fetchBusSchedule = async () => {
      if (isDecrypting || !fromCity || !toCity || !travelDate) {
        return;
      }


      try {
        const response = await getBusSchedule({
          fromCity,
          toCity,
          travelDate,
        }).unwrap();
        response.schedule && setCurrentBusSchedule(response.schedule);
      } catch (error) {
        console.error("Failed to fetch bus schedule:", error);
      }
    };

    fetchBusSchedule();
  }, [fromCity, toCity, travelDate, isDecrypting, getBusSchedule]);

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Departure Time",
    "Rating",
  ];

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
    router.back();
  };


  const form = useForm({
    resolver: zodResolver(notifyFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });
  const handleBusRequest = (data) => {
    console.log("Form submitted:", data);
    form.reset();
  };
  if (isDecrypting) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <main className="w-full max-w-screen-xl mx-auto pt-[90px] pb-[50px] px-2">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004aad] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading search results...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!fromCity || !toCity || !travelDate) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <main className="w-full max-w-screen-xl mx-auto pt-[90px] pb-[50px] px-2">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Invalid search parameters. Please try again.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-[#004aad] text-white rounded hover:bg-[#00348a] transition"
              >
                Go Back to Search
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-300 bg-gray-100"
      )}
    >
      <main className="w-full max-w-screen-xl mx-auto pt-[90px] pb-[50px] px-2">
        <section className="md:max-w-9/10 md:mx-auto bg-white px-4 py-2 md:py-4.5 md:text-lg shadow-sm shadow-gray-400/50 flex flex-row justify-between items-center rounded-lg mb-6">
          <div>
            <h2 className="text-base md:text-xl text-black font-bold mb-1">
              {fromCity} → {toCity}
            </h2>
            <p className="text-xs text-gray-600">
              {new Date(travelDate).toLocaleDateString("en-GB", {
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
        <div className="flex justify-normal items-center mb-6 md:max-w-9/10 md:mx-auto pl-1">
          <label className="text-xs md:text-base font-medium text-gray-600 mr-3">
            Sort by:
          </label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[170px] focus:outline-none focus:ring-1 focus:ring-primary">
              <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="cursor-pointer data-[highlighted]:bg-primary data-[highlighted]:text-white"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <div className="flex flex-col items-center pt-20">
              <p className="text-center text-gray-600 lg:text-xl pb-3">
                No buses found for this route on the selected date.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="border border-[#004aad] text-[#004aad] text-xs px-2 py-1 md:px-3 md:py-1.5 md:text-sm w-30 rounded bg-white hover:bg-gray-50 transition font-medium">
                    Notify Me
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-fit">
                  <DialogTitle>Notify Me</DialogTitle>
                  <NotifyForm
                    form={form}
                    onSubmit={form.handleSubmit(handleBusRequest)}
                  />
                </DialogContent>
              </Dialog>
            </div>
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
      <Button
        onClick={async () => {
          const encryptedUrl = await createSeatSelectionUrl(bus._id);
          router.push(encryptedUrl);
        }}
        className="w-full hover:bg-[#00388a] mt-4 py-1.5"
      >
        Select Seats
      </Button>
    </div>
  );
}

export default function BusesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <LoadingScreen />
        </div>
      }
    >
      <BusesContent />
    </Suspense>
  );
}
