"use client";

import { use, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarX } from "lucide-react";
import Link from "next/link";

import { BookingFilter } from "@/components/account/booking-filter";
import { BookingCard } from "@/components/account/booking-card";
import { useRouter } from "next/navigation";
import { useGetBookingHistoryMutation } from "@/utils/redux/api/bus";
import { useAuth } from "@/hooks/useAuth";

export default function BookingHistory() {
  const { user, isAuthenticated } = useAuth();
  const [getBookingHistory, { data, isLoading }] =
    useGetBookingHistoryMutation();
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const bookingHistory = data?.bookings || [];

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      getBookingHistory({ userId: user.id, limit: 10 });
    }
  }, [isAuthenticated, user, getBookingHistory]);

  const onBack = () => router.push("/account");

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Please login to view your bookings
          </p>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
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

      {isLoading ? (
        <Card className="flex flex-col items-center justify-center h-[300px]">
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </Card>
      ) : filtered.length > 0 ? (
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
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full py-4 min-h-fit"
        >
          Back to Account
        </Button>
      </div>
    </div>
  );
}
