"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { hydrate } from "@/utils/redux/features/user/userSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarX } from "lucide-react";
import Link from "next/link";

import { BookingFilter } from "@/components/account/booking-filter";
import { BookingCard } from "@/components/account/booking-card";

export default function BookingHistory() {
  const { bookingHistory, isHydrated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setIsMounted(true);
    if (!isHydrated) dispatch(hydrate());
  }, [dispatch, isHydrated]);

  const onBack = () => window.history.back();

  if (!isMounted || !isHydrated) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const filtered = bookingHistory?.filter((b) =>
    filter === "all" ? true : b.status === filter
  );

  return (
    <div>
      <h3 className="mb-[15px] text-primary text-lg font-semibold">
        Your Bookings
      </h3>

      <BookingFilter value={filter} onChange={setFilter} />

      {filtered.length > 0 ? (
        filtered.map((booking, idx) => (
          <BookingCard key={idx} booking={booking} />
        ))
      ) : (
      <Card className="flex flex-col items-center justify-center h-[300px]">
        <CalendarX className="text-[3rem] text-[#ddd] mb-[15px] mx-auto" />
        <h3 className="text-xl font-medium mb-[8px]">No Booking History</h3>
        <p className="mb-[15px]">You haven't made any bookings yet.</p>
        <Button asChild>
          <Link
            href="/seats"
            className="px-[20px] py-[10px] bg-primary text-white rounded-none min-h-fit transition-colors hover:bg-[var(--secondary-color)]"
          >
            Book Now
          </Link>
        </Button>
      </Card>
      )}

      <div className="mt-6">
        <Button variant="outline" onClick={onBack} className="w-full py-4 min-h-fit">
          Back to Account
        </Button>
      </div>
    </div>
  );
}
