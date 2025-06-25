"use client";

import React, { useRef, useState, useEffect } from "react";
import ButtonUI from "@/components/UI/ButtonUI";
import { Landmark, CreditCard, Smartphone } from "lucide-react";
import { useGetBusDataQuery } from "@/utils/redux/api/bus";
import Link from "next/link";

export default function PaymentPage() {
  /*
  Dummy Data to store before retrieve
  localStorage.setItem("bookingInfo", JSON.stringify({
  bus: "ABC Travels",
  from: "Delhi",
  to: "Jaipur",
  date: "2025-06-10",
  timeofdeparture: "7:30 AM",
  timeofarrival: "12:15 PM",
  seatid: ["A1", "A2"]
}));
*/

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
  useEffect(() => {
    const localData = localStorage.getItem("bookingInfo");
    if (localData) {
      setBooking(JSON.parse(localData));
    }
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

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const handlePayment = () => {
    const fields = [
      { ref: firstNameRef },
      { ref: lastNameRef },
      { ref: ageRef },
      { ref: genderRef },
      { ref: emailRef },
      { ref: phoneRef },
    ];

    let allFilled = true;

    fields.forEach(({ ref }) => {
      if (!ref.current.value.trim()) {
        ref.current.classList.remove("focus:ring-blue-800");
        ref.current.classList.add("ring-1", "ring-red-600");
        allFilled = false;
      } else {
        ref.current.classList.remove("ring-1", "ring-red-600");
        ref.current.classList.add("focus:ring-blue-800");
      }
    });

    if (!allFilled) {
      alert("Please fill in all required fields.");
      return;
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
        {/* Booking Summary */}
        <section className="bg-white rounded-[12px] px-5 py-6 mb-6 shadow">
          <h2 className="text-[#004aad] mb-4 text-xl md:text-2xl font-bold">
            Booking Summary
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 border border-stone-100 rounded-lg">
              <div className="text-gray-500 text-xs">Bus</div>
              <div className="text-sm font-medium"> {booking.bus} </div>
            </div>

            <div className="p-3 bg-gray-50 border border-stone-100 rounded-lg">
              <div className="text-gray-500 text-xs">Journey</div>
              <div className="text-sm font-medium">
                {booking.from} → {booking.to}
              </div>
            </div>

            <div className="p-3 bg-gray-50 border border-stone-100 rounded-lg">
              <div className="text-gray-500 text-xs">Date & Time</div>
              <div className="text-sm font-medium">
                {booking.date} ({booking.timeofdeparture} -{" "}
                {booking.timeofarrival})
              </div>
            </div>

            <div className="p-3 bg-gray-50 border border-stone-100 rounded-lg">
              <div className="text-gray-500 text-xs">Seats</div>
              <div className="text-sm font-medium">
                {booking.seatid.join(", ")}
              </div>
            </div>
          </div>
        </section>

        {/* Passenger Form */}
        <section className="bg-white rounded-[12px] p-6 mb-6 shadow">
          <h2 className="text-[#004aad] mb-4 text-2xl font-bold">
            Passenger Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-text-color"
              >
                First Name
              </label>
              <input
                ref={firstNameRef}
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                type="text"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-text-color"
              >
                Last Name
              </label>
              <input
                ref={lastNameRef}
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                type="text"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-text-color"
              >
                Age
              </label>
              <input
                ref={ageRef}
                id="age"
                name="age"
                autoComplete="age"
                type="number"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-text-color"
              >
                Gender
              </label>
              <select
                ref={genderRef}
                id="gender"
                name="gender"
                autoComplete="sex"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-text-color"
              >
                Email Address
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-800 transition duration-200 ease-in-out"
              />
              <div className="text-xs text-slate-500 pt-2">
                Your ticket will be sent to this email address
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-text-color"
              >
                Phone Number
              </label>
              <input
                ref={phoneRef}
                id="phone"
                name="phone"
                autoComplete="tel"
                type="tel"
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm  focus:outline-none focus:ring-1 focus:ring-blue-800 transition duration-200 ease-in-out"
              />
              <div className="text-xs text-slate-500 pt-2">
                For journey updates and assistance
              </div>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="bg-white rounded-[12px] p-6 mb-6 shadow">
          <div className="mb-4 font-bold text-[1.5rem] text-primary">
            Payment Method
          </div>

          <div className="border border-slate-300 rounded-lg px-4 py-2.5 mb-4 flex items-center gap-3 cursor-pointer hover:border-blue-800">
            <CreditCard className="w-6 h-6 text-[#004aad]" />
            <div className="flex-1">
              <div className="font-medium text-text-color">
                Credit/Debit Card
              </div>
              <div className="text-sm text-slate-500">
                Pay securely using your card
              </div>
            </div>
          </div>

          <div className="border border-slate-300 rounded-lg px-4 py-2.5 mb-4 flex items-center gap-3 cursor-pointer hover:border-blue-800">
            <Smartphone className="w-6 h-6 text-[#004aad]" />
            <div className="flex-1">
              <div className="font-medium text-text-color">UPI</div>
              <div className="text-sm text-slate-500">
                Pay using any UPI app
              </div>
            </div>
          </div>

          <div className="border border-slate-300 rounded-lg px-4 py-2.5 mb-4 flex items-center gap-3 cursor-pointer hover:border-blue-800">
            <Landmark className="w-6 h-6 text-[#004aad]" />
            <div className="flex-1">
              <div className="font-medium text-text-color">Net Banking</div>
              <div className="text-sm text-slate-500">
                Pay directly from your bank account
              </div>
            </div>
          </div>
        </section>

        {/* Total Section */}
        <section className="bg-white rounded-[12px] px-6 py-3 mb-6 shadow">
          <div className="flex justify-between items-center text-[14px] text-slate-500 font-base mb-3">
            <span>Base Fare</span>
          </div>
          <hr className="border-gray-200 mb-4" />

          <div className="flex justify-between items-center text-[14px] text-slate-500 font-base mb-3">
            <span>Tax & Fee</span>
            <span className="text-black font-normal">₹50</span>
          </div>
          <hr className="border-gray-200 mb-3" />

          <div className="text-[#004aad] font-bold text-[18px]">
            Total Amount
          </div>
        </section>

        <ButtonUI onClick={handlePayment} className="w-full py-1.5">
          Make Payment
        </ButtonUI>
      </main>
    </div>
  );
}
