"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
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
import { PaymentOptions } from "@/components/payment/PaymentOptions";
import {
  useLockSeatsForBookingMutation,
  useConfirmBookingPaymentMutation,
  useGetPaymentMethodsQuery,
  useGetPaymentDetailsMutation,
  useGetRefundDetailsMutation,
  useGetRazorpayHealthQuery,
} from "@/utils/redux/api/paymentApiSlice";

export default function PaymentPage() {
  const { data, isLoading } = useGetBusDataQuery({ id: "bus-123" });
  const [booking, setBooking] = useState({
    bus: "",
    from: "",
    to: "",
    date: "", 
    timeofdeparture: "",
    timeofarrival: "",
    seatid: [],
    price: "",
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
        price: data.seatPrice,
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

  const [processing, setProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [confirmPayment] = useConfirmBookingPaymentMutation();
  const [lockSeats] = useLockSeatsForBookingMutation();

  const handlePassengerSubmit = async (formData) => {
    if (selectedOption === "razorpay") {
      console.log("Processing Razorpay payment...");

      try {
        setProcessing(true);
        console.log("Locking seats and creating Razorpay order…");

        const lockRes = await lockSeats({
          busId: selectedBusId,
          seatNumbers: selectedSeats,
          userId: currentUser?._id, // or however you're storing the logged-in user
          passengerDetails: {
            name: `${formData.firstName} ${formData.lastName}`,
            age: formData.age,
            gender: formData.gender,
            email: formData.email,
            phone: formData.phone,
          },
        }).unwrap();

        const { bookingId, lockExpiresAt, lockedSeats, paymentOrder } = lockRes;

        console.log("Seats locked:", lockedSeats);

        const options = {
          key: paymentOrder.keyId,
          amount: paymentOrder.amount,
          currency: paymentOrder.currency,
          name: "SmallBus",
          description: "Bus seat booking",
          order_id: paymentOrder.orderId,
          handler: async (response) => {
            try {
              const confirmRes = await confirmPayment({
                bookingId,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                paymentMethod: "upi",
              }).unwrap();

              dispatch(addBooking(confirmRes.booking));
              dispatch(resetBooking());
              router.push("/account?tab=bookingHistory");
            } catch (err) {
              console.error("Booking confirmation failed:", err);
              alert(
                "Payment succeeded, but booking failed. Please contact support."
              );
            } finally {oloooo
              setProcessing(false);
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#004aad" },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", (response) => {
          console.error("Razorpay payment failed:", response.error);
          alert(`Payment Failed\nReason: ${response.error.description}`);
          setProcessing(false);
        });

        rzp.open();
      } catch (err) {
        console.error("Seat lock or Razorpay setup failed:", err);
        alert(err?.data?.message || "Unable to lock seats or start payment.");
        setProcessing(false);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Razorpay script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
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
        <PaymentOptions
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />
        <TotalSection booking={booking} />
        <ButtonUI
          onClick={() => form.handleSubmit(handlePassengerSubmit)()}
          className="w-full py-1.5"
          disabled={processing}
        >
          {processing ? "Processing..." : "Make Payment"}
        </ButtonUI>
      </main>
    </div>
  );
}
