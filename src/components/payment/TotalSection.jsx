export default function TotalSection() {
  return (
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
      <div className="text-[#004aad] font-bold text-[18px]">Total Amount</div>
    </section>
  );
}
