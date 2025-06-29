"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ButtonUI from "@/components/ui/ButtonUI";
import BookingSummary from "@/components/payment/BookingSummary";
import PassengerForm from "@/components/payment/PassengerForm";
import TotalSection from "@/components/payment/TotalSection";
import {
  useBookSeatsMutation,
  useGetBusDataQuery,
} from "@/utils/redux/api/bus";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "@/utils/redux/features/user/userSlice";
import { resetBooking } from "@/utils/redux/features/booking/bookingSlice";
import { useRouter } from "next/navigation";
import { safeLocalStorage } from "@/lib/localStorage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passengerSchema } from "@/utils/validations/form-validation";

export default function PaymentPage() {
  const { data, isLoading } = useGetBusDataQuery("bus-123");
  const [booking, setBooking] = useState({
    bus: "",
    from: "",
    to: "",
    date: "",
    timeofdeparture: "",
    timeofarrival: "",
    seatid: [],
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const [bookSeats] = useBookSeatsMutation();
  const { selectedSeats, selectedBusId } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    const localData = safeLocalStorage.getItem("bookingInfo");
    if (localData) setBooking(localData);
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      setBooking({
        bus: data.busType,
        from: data.from,
        to: data.to,
        date: data.date,
        timeofdeparture: data.departureTime,
        timeofarrival: data.arrivalTime,
        seatid: data.seatid || ["A1", "A2"],
      });
    }
  }, [isLoading, data]);

  const form = useForm({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
    },
  });

  const handlePassengerSubmit = async () => {
    console.log("Passenger Data Submitted:", data);

    try {
      console.log("Proceeding to payment with selected seats:", selectedSeats);

      const result = await bookSeats({
        id: selectedBusId,
        seats: selectedSeats,
      }).unwrap();
      dispatch(addBooking(result.booking));
      dispatch(resetBooking());
      router.push("/account?tab=bookingHistory");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }

    alert("Payment Success (demo)");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="text-center py-2 bg-white shadow fixed w-full top-0 z-[1000]">
        <Link
          href="#"
          className="inline-block py-1 text-[24px] text-[#004aad] no-underline font-mont font-black"
        >
          smallbus
        </Link>
      </header>

      <main className="max-w-[720px] mx-auto pt-[90px] pb-[50px] px-4">
        <BookingSummary booking={booking} />
        <PassengerForm form={form} />
        {/* <PaymentOptions /> */}
        <TotalSection />
        <ButtonUI
          onClick={() => form.handleSubmit(handlePassengerSubmit)()}
          className="w-full py-1.5"
        >
          Make Payment
        </ButtonUI>
      </main>
    </div>
  );
}
