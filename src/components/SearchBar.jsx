"use client";

import { useState, useRef, useEffect } from "react";

import { createBusSearchUrl } from "@/utils/navigation";

import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaExchangeAlt,
  FaSearch,
  FaLocationArrow,
} from "react-icons/fa";
import ButtonUI from "@/components/ui/ButtonUI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const cities = [
  { name: "Patna", state: "Bihar" },
  { name: "Sasaram", state: "Bihar" },
  { name: "Darbhanga", state: "Bihar" },
  { name: "Aurangabad", state: "Bihar" },
  { name: "Dehri", state: "Bihar" },
  { name: "Bodh gaya", state: "Bihar" },
  { name: "Delhi", state: "Delhi" },
  { name: "Bangalore", state: "Karnataka" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Chennai", state: "Tamil Nadu" },
  { name: "Kolkata", state: "West Bengal" },
  { name: "Pune", state: "Maharashtra" },
  { name: "Ahmedabad", state: "Gujarat" },
  { name: "Jaipur", state: "Rajasthan" },
  { name: "Surat", state: "Gujarat" },
  { name: "Lucknow", state: "Uttar Pradesh" },
  { name: "Kanpur", state: "Uttar Pradesh" },
  { name: "Nagpur", state: "Maharashtra" },
  { name: "Nashik", state: "Maharashtra" },
  { name: "Visakhapatnam", state: "Andhra Pradesh" },
  { name: "Indore", state: "Madhya Pradesh" },
  { name: "Thane", state: "Maharashtra" },
  { name: "Bhopal", state: "Madhya Pradesh" },
  { name: "Mumbai", state: "Maharashtra" },
  { name: "Vadodara", state: "Gujarat" },
  { name: "Ghaziabad", state: "Uttar Pradesh" },
  { name: "Chandigarh", state: "Chandigarh" },
];

export default function SearchBar() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const router = useRouter();

  const wrapperRef = useRef(null);
  const dateInputRef = useRef(null);

  //Assigning minimum and default booking date
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const defaultBookingDate = tomorrow.toISOString().split("T")[0];

  //on clicking outside of wrapped DOM clear states
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFromSuggestions([]);
        setToSuggestions([]);
        setActiveInput(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //After selecting a city set state , clear option and SetActive input to null
  const handleSelectSuggestion = (name, setter, clearSuggestions) => {
    setter(name);
    clearSuggestions([]);
    setActiveInput(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fromCity = formData.get("from");
    const toCity = formData.get("to");
    const travelDate = formData.get("date");
    if (!fromCity || !toCity || !travelDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    const encryptedUrl = await createBusSearchUrl({
      fromCity,
      toCity,
      travelDate,
    });

    router.push(encryptedUrl);
  };
  return (
    <div
      className="mt-1 lg:mt-6 min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <section className="pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-6 sm:pb-8 text-center relative">
        <div className="max-w-xl mx-auto px-4 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-bold mb-4 sm:mb-6 text-white leading-tight">
            Book a Bus Ticket
          </h1>
        </div>
      </section>
      <div
        className="bg-white rounded-xl shadow-lg mx-4 px-4 sm:px-6 py-6 sm:py-8 mb-8 sm:mb-12 max-w-4xl md:mx-auto relative z-10"
        ref={wrapperRef}
      >
        {/* DESTINATION BOOKING FORM */}
        <form className="w-full" onSubmit={handleSubmit} action="#" noValidate>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* FROM INPUT SECTION */}
            <div className="flex-1 relative">
              <label className="font-medium mb-2 text-sm text-gray-700">
                FROM
              </label>
              <div className="relative">
                <FaLocationArrow
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#004aad]"
                  size={18}
                />
                <input
                  name="from"
                  required
                  type="text"
                  placeholder="Enter City"
                  value={from}
                  onFocus={() => {
                    setFromSuggestions(cities);
                    setActiveInput("from");
                  }}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setFromSuggestions(
                      cities.filter((city) =>
                        city.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      )
                    );
                  }}
                  className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#004aad] focus:ring-4 focus:ring-[#004aad]/20 transition-all"
                />
                {activeInput === "from" && fromSuggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white w-full mt-1 max-h-65 overflow-y-auto border border-gray-200 rounded shadow">
                    {fromSuggestions.map((city, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-t border-slate-300"
                        onClick={() =>
                          handleSelectSuggestion(
                            city.name,
                            setFrom,
                            setFromSuggestions
                          )
                        }
                      >
                        <p className="text-base text-gray-900 font-semibold">
                          {city.name}
                        </p>
                        <p className="text-xs text-gray-500">{city.state}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* SWAP ICON  */}
            <div className="flex justify-center items-end lg:items-center">
              <div
                onClick={() => {
                  const temp = from;
                  setFrom(to);
                  setTo(temp);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full shadow border -mb-6 border-gray-300 text-[#004aad] hover:bg-[#004aad]/10 cursor-pointer transition-all"
              >
                <FaExchangeAlt size={16} />
              </div>
            </div>

            {/* TO INPUT SECTION    */}
            <div className="flex-1 relative">
              <label className="font-medium mb-2 text-sm text-gray-700">
                TO
              </label>
              <div className="relative">
                <FaMapMarkerAlt
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#004aad]"
                  size={18}
                />
                <input
                  name="to"
                  required
                  type="text"
                  placeholder="Enter City"
                  value={to}
                  onFocus={() => {
                    setToSuggestions(cities);
                    setActiveInput("to");
                  }}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setToSuggestions(
                      cities.filter((city) =>
                        city.name
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      )
                    );
                  }}
                  className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#004aad] focus:ring-4 focus:ring-[#004aad]/20 transition-all"
                />
                {activeInput === "to" && toSuggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white w-full mt-1 max-h-65 overflow-y-auto border border-gray-200 rounded shadow">
                    {toSuggestions.map((city, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-t border-slate-300"
                        onClick={() =>
                          handleSelectSuggestion(
                            city.name,
                            setTo,
                            setToSuggestions
                          )
                        }
                      >
                        <p className="text-base font-semibold text-gray-900">
                          {city.name}
                        </p>
                        <p className="text-xs text-gray-500">{city.state}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* TRAVEL DATE SECTION         */}
          <div className="flex flex-col">
            <label className="font-medium mb-2 text-sm text-gray-700">
              TRAVEL DATE
            </label>
            <div
              className="relative"
              onClick={() => dateInputRef.current?.showPicker()}
            >
              <FaRegCalendarAlt
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#004aad] cursor-pointer"
                size={18}
              />
              <input
                ref={dateInputRef}
                type="date"
                id="date"
                name="date"
                min={defaultBookingDate}
                defaultValue={defaultBookingDate}
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#004aad] focus:ring-4 focus:ring-[#004aad]/20 transition-all cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
            </div>
          </div>
          {/* Reusable UI Button  */}
          <ButtonUI
            type="submit"
            className="w-full mt-6 hover:bg-[#00388a] text-base transition-all flex items-center justify-center gap-2"
          >
            <FaSearch className="text-white text-sm font-extrabold -mr-1" />
            Find Buses
          </ButtonUI>
        </form>
      </div>
    </div>
  );
}