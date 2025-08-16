"use client";
import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { useVerifyCouponMutation, useApplyCouponMutation } from "@/utils/redux/api/paymentApiSlice";

export default function TotalSection({ booking }) {
  const taxfee = 50;
  const baseFare = booking.price * booking.seatid.length;

  // Local state
  const [coupon, setCoupon] = useState("");
  const [discountPreview, setDiscountPreview] = useState(null); // preview before confirm
  const [appliedDiscount, setAppliedDiscount] = useState(null); // final applied discount
  const [error, setError] = useState("");

  // RTK Query hooks
  const [verifyCoupon, { isLoading: verifying }] = useVerifyCouponMutation();
  const [applyCoupon, { isLoading: applying }] = useApplyCouponMutation();

  //1️ Validate coupon first
  const handleValidate = async () => {
    try {
      const res = await verifyCoupon(coupon).unwrap();
      if (res?.success && res.appliedDiscount) {
        setDiscountPreview(res.appliedDiscount);
        setError("");
      } else {
        setError("Invalid coupon");
        setDiscountPreview(null);
      }
    } catch {
      setError("Something went wrong");
      setDiscountPreview(null);
    }
  };

  //2️ Apply coupon after confirm
  const handleApply = async () => {
    try {
      const res = await applyCoupon(coupon).unwrap();
      if (res?.success && res.appliedDiscount) {
        setAppliedDiscount(res.appliedDiscount);
        setDiscountPreview(null); // clear preview
        setError("");
      }
    } catch {
      setError("Failed to apply coupon");
    }
  };

  // Calculate final price
  const totalPrice =
    appliedDiscount?.discountedAmount ??
    discountPreview?.discountedAmount ??
    baseFare + taxfee;

  return (
    <section className="bg-white rounded-[12px] px-6 py-3 mb-6 shadow">
      {/* Base Fare */}
      <div className="flex justify-between items-center text-[14px] text-slate-500 mb-3">
        <span>Base Fare</span>
        <span className="text-black">₹{baseFare}</span>
      </div>
      <hr className="border-gray-200 mb-4" />

      {/* Tax */}
      <div className="flex justify-between items-center text-[14px] text-slate-500 mb-3">
        <span>Tax & Fee</span>
        <span className="text-black">₹{taxfee}</span>
      </div>
      <hr className="border-gray-200 mb-3" />

      {/* Coupon Input */}
      <div className="mb-4">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full outline-none text-sm text-slate-700 bg-transparent"
          />
          {!discountPreview && !appliedDiscount && (
            <button
              onClick={handleValidate}
              disabled={verifying}
              className="border border-[#004aad] text-[#004aad] text-xs px-2 py-1 md:px-3 md:py-1.5 rounded bg-white hover:bg-gray-50 transition cursor-pointer whitespace-nowrap"
            >
              {verifying ? "Checking..." : "Apply"}
            </button>
          )}
          {discountPreview && (
            <button
              onClick={handleApply}
              disabled={applying}
              className="border border-green-600 text-green-600 text-xs px-2 py-1 md:px-3 md:py-1.5 rounded bg-white hover:bg-gray-50 transition cursor-pointer whitespace-nowrap"
            >
              {applying ? "Confirming..." : "Confirm"}
            </button>
          )}
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {discountPreview && (
          <p className="text-blue-600 text-sm mt-2">
            Preview: New Total ₹{discountPreview.discountedAmount}
          </p>
        )}
        {appliedDiscount && (
          <p className="text-green-600 text-sm mt-2">
            Discount Applied 🎉 You saved ₹{appliedDiscount.savings}
          </p>
        )}
      </div>

      <hr className="border-gray-200 mb-4" />

      {/* Final Amount */}
      <div className="text-[#004aad] font-bold text-[18px] flex justify-between">
        Total Amount <span>₹{totalPrice}</span>
      </div>
    </section>
  );
}
