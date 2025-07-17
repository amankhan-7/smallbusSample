"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import CustomButton from "@/components/ui/ButtonUI";
import BookingSummary from "@/components/payment/BookingSummary";
import PassengerForm from "@/components/payment/PassengerForm";
import TotalSection from "@/components/payment/TotalSection";
import {
  useGetBusDetailsQuery,
  useLockSeatsForBookingMutation,
  useConfirmBookingPaymentMutation,
} from "@/utils/redux/api/bus";
import { useSelector, useDispatch } from "react-redux";
import { addBooking, resetBooking } from "@/utils/redux/slices/busSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passengerSchema } from "@/utils/validations/form-validation";
import { PaymentOptions } from "@/components/payment/PaymentOptions";
import {
  useGetPaymentMethodsQuery,
  useGetPaymentDetailsMutation,
  useGetRefundDetailsMutation,
  useGetRazorpayHealthQuery,
} from "@/utils/redux/api/paymentApiSlice";
import { useAuth } from "@/hooks/useAuth";
import { selectSelectedSeats } from "@/utils/redux/slices/busSlice";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const busId = searchParams.get("busId");

  const { data, isLoading } = useGetBusDetailsQuery(
    { busId },
    { skip: !busId }
  );
  const [booking, setBooking] = useState({
    id: "",
    bus: "",
    from: "",
    to: "",
    date: "",
    timeofdeparture: "",
    timeofarrival: "",
    seatid: [],
    price: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedSeats = [23];

  const currentUser = useAuth().user;

  useEffect(() => {
    if (!isLoading && data?.bus) {
      const busData = data.bus;
      setBooking({
        id: busData.id,
        bus: busData.busName,
        from: busData.routeFrom,
        to: busData.routeTo,
        date: busData.date,
        timeofdeparture: busData.departureTime,
        timeofarrival: busData.arrivalTime,
        seatid: selectedSeats.length > 0 ? selectedSeats : [],
        price: busData.seatPrice || busData.price,
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
    console.log("Form submitted:", formData);
    if (selectedOption === "razorpay") {
      console.log("Processing Razorpay payment...");

      try {
        setProcessing(true);
        console.log("Locking seats and creating Razorpay order…");

        const lockRes = await lockSeats({
          busId,
          seatNumbers: booking.seatid,
          userId: currentUser?.id,
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

        if (!window.Razorpay) {
          alert("Razorpay failed to load. Please try again.");
          setProcessing(false);
          return;
        }

        const options = {
          key: paymentOrder.keyId,
          amount: paymentOrder.amount,
          currency: "INR",
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
            } finally {
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
    const onSubmit = form.handleSubmit(handlePassengerSubmit);

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
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-pulse text-gray-500">
              Loading payment details...
            </div>
          </div>
        ) : (
          <>
            <BookingSummary booking={booking} />
            <PassengerForm form={form} />
            <PaymentOptions
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
            />
            <TotalSection booking={booking} />
            <CustomButton
              onClick={onSubmit}
              className="w-full py-1.5"
              disabled={processing || isLoading}
            >
              {processing ? "Processing..." : "Make Payment"}
            </CustomButton>
          </>
        )}
      </main>
    </div>
  );
}
