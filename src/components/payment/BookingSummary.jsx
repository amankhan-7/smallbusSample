import React from "react";

export default function BookingSummary({ booking }) {
  return (
    <section className="bg-white rounded-[12px] px-5 py-6 mb-6 shadow">
      <h2 className="text-[#004aad] mb-4 text-xl md:text-2xl font-bold">Booking Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SummaryCard label="Bus" value={booking.bus} />
        <SummaryCard label="Journey" value={`${booking.from} → ${booking.to}`} />
        <SummaryCard label="Date & Time" value={`${booking.date} (${booking.timeofdeparture} - ${booking.timeofarrival})`} />
        <SummaryCard label="Seats" value={booking.seatid.join(", ")} />
      </div>
    </section>
  );
}

function SummaryCard({ label, value }) {
  return (
    <div className="p-3 bg-gray-50 border border-stone-100 rounded-lg">
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
