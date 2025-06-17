"use client";

import BottomNav from "@/app/owner/UI/BottomNav";
import {
  FaTrash,
  FaPlus,
  FaBus,
  FaPhone,
  FaCalendarCheck,
  FaCircle,
} from "react-icons/fa";

export default function DriversPage() {
  const drivers = [
    {
      name: "Rajesh Kumar",
      assignedTo: "Express 1",
      phone: "+91 9876543210",
      joined: "May 10, 2025",
      status: "Active",
    },
    {
      name: "Sunil Patil",
      assignedTo: "Express 2",
      phone: "+91 8765432109",
      joined: "Apr 15, 2025",
      status: "Active",
    },
    {
      name: "Amit Sharma",
      assignedTo: "Night Rider",
      phone: "+91 7654321098",
      joined: "Mar 22, 2025",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8f9fa]">
      {/* Sidebar Navigation */}
      <BottomNav />

      {/* Page Content */}
      <main className="flex-1 p-4 md:px-10 pb-24 md:pb-6">
        {" "}
        {/* 🛠 reduced px from 40 to 10 */}
        {/* Header */}
        <div className="bg-white p-4 mt-4 md:mt-8 rounded-lg shadow mb-6 max-w-5xl mx-auto w-full flex flex-col md:flex-row md:justify-between">
          <h1 className="text-xl font-semibold text-[#004aad] mb-5 md:mb-0">
            Drivers
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#004aad] text-white flex items-center justify-center font-semibold">
              AR
            </div>
            <div>
              <div className="font-medium text-gray-800">Ankush Raj</div>
              <div className="text-sm text-gray-500">Bus Owner</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-start  max-w-5xl mx-auto w-full sm:items-center mb-2 gap-3">
          {/* Heading */}
          <h2 className="text-[#004aad] text-[22px] font-semibold">
            Your Drivers
          </h2>

          {/* Add Bus Button */}
          <button className="flex items-center text-xs gap-2 bg-[#004aad] text-white h-8 px-4 py-2 rounded hover:bg-[#0056b3] transition cursor-pointer">
            <FaPlus />
            Add Drivers
          </button>
        </div>
        {/* Bus Drivers Card */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 max-w-5xl mx-auto w-full ">
          {/* 🛠 removed md:w-270 and md:h-30 */}
          {drivers.map((driver, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Row 1: Name + Trash */}
              <div className="flex justify-between items-center px-4 py-3.5 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-800">
                  {driver.name}
                </h2>
                <button
                  title="Remove Driver"
                  className="bg-[#007bff1a] text-[#004aad] hover:bg-[#007bff33] p-2 rounded-lg transition duration-200"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Row 2: Details */}
              <div className="flex flex-col gap-2 px-4 py-4 border-b border-gray-200 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaBus className="text-[#28a745]" />
                  <span>
                    Assigned to: <strong>{driver.assignedTo}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-[#28a745]" />
                  <span>{driver.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarCheck className="text-[#28a745]" />
                  <span>Joined: {driver.joined}</span>
                </div>
              </div>

              {/* Row 3: Status */}
              <div className="flex items-center gap-2 p-2 text-[#28a745] bg-[#f5f7fa] font-medium">
                <FaCircle className="text-xs" />
                {driver.status}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
