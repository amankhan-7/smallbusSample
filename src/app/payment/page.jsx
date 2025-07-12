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
  useCreateRazorpayOrderMutation,
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
  const [createOrder] = useCreateRazorpayOrderMutation();

  const handlePassengerSubmit = async (formData) => {
    if (selectedOption === "razorpay") {
      console.log("Processing Razorpay payment...");

      const amount = booking.price * booking.seatid.length + 50;
      setProcessing(true);

      // Generate unique identifiers
      const receipt = `rcpt_${Date.now()}`;
      const bookingReference = `SBUS-${selectedBusId}-${Date.now()}`;

      try {
        // 1. Create Razorpay Order from backend
        const order = await createOrder({
          amount,
          receipt,
          bookingReference,
        }).unwrap();
        console.log("Razorpay order created:", order);

        // 2. Razorpay options
        const options = {
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: "SmallBus",
          description: "Bus seat booking",
          order_id: order.orderId,
          handler: async (response) => {
            try {
              // 3. Confirm seat booking on successful payment
              const result = await bookSeats({
                id: selectedBusId,
                seats: selectedSeats,
                paymentId: response.razorpay_payment_id,
              }).unwrap();

              dispatch(addBooking(result.booking));
              dispatch(resetBooking());
              router.push("/account?tab=bookingHistory");
            } catch (err) {
              console.error("Booking failed:", err);
              alert(
                "Payment succeeded, but booking failed. Please contact support."
              );
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

        // 4. Open Razorpay Checkout
        const rzp = new window.Razorpay(options);

        // Handle payment failure
        rzp.on("payment.failed", function (response) {
          console.error("Razorpay Payment Failed:", response.error);

          alert(`Payment Failed
Reason: ${response.error.description}
Code: ${response.error.code}
Step: ${response.error.step}
Order ID: ${response.error.metadata?.order_id || "N/A"}
Payment ID: ${response.error.metadata?.payment_id || "N/A"}
      `);
          setProcessing(false);
        });

        rzp.open();
      } catch (error) {
        console.error("Payment initialization failed:", error);
        alert("Unable to start payment. Please try again later.");
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
