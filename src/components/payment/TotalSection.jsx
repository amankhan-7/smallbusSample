export default function TotalSection({booking}) {

  const taxfee = 50;
  const baseFare =  booking.price * booking.seatid.length
  const totalPrice = baseFare + taxfee;
  return (
    <section className="bg-white rounded-[12px] px-6 py-3 mb-6 shadow">
      <div className="flex justify-between items-center text-[14px] text-slate-500 font-base mb-3">
        <span>Base Fare</span>
          <span className="text-black font-normal">₹{baseFare}</span>
      </div>
      <hr className="border-gray-200 mb-4" />
      <div className="flex justify-between items-center text-[14px] text-slate-500 font-base mb-3">
        <span>Tax & Fee</span>
        <span className="text-black font-normal">₹{taxfee}</span>
      </div>
      <hr className="border-gray-200 mb-3" />
      <div className="text-[#004aad] font-bold text-[18px] flex justify-between">Total Amount <span>₹{totalPrice}</span> </div>
    </section>
  );
}
