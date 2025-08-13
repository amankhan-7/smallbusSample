import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { resetBooking } from "@/utils/redux/slices/busSlice";
import { PAYMENT_CONFIG } from "@/constants/payment";
import {
  createPassengerDetails,
  validateRazorpayAvailability,
  formatPaymentError,
  createPrefillData,
} from "@/utils/payment-utils";
import { toast } from "sonner";

export const usePaymentHandlers = (
  lockSeats,
  confirmPayment,
  setProcessing,
  currentUser
) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const createRazorpayOrder = async (formData, booking, busId) => {
    setProcessing(true);

    const lockRes = await lockSeats({
      busId,
      seatNumbers: booking.seatid,
      userId: currentUser?.id,
      passengerDetails: createPassengerDetails(formData),
    }).unwrap();

    const { bookingId, paymentOrder } = lockRes;

    return { bookingId, paymentOrder };
  };

  const handlePaymentSuccess = async (response, bookingId) => {
    try {
      await confirmPayment({
        bookingId,
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        paymentMethod: PAYMENT_CONFIG.DEFAULT_PAYMENT_METHOD,
      }).unwrap();


      router.push(`/payment/success?bookingId=${bookingId}`);
    } catch (err) {
      console.error("Booking confirmation failed:", err);
      toast.success("Payment succeeded, but booking failed. Please contact support.");
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentFailure = (response) => {
    console.error("Razorpay payment failed:", response.error);
    toast.error(`Payment Failed\nReason: ${response.error.description}`);
    setProcessing(false);
    router.push(`/payment/failure?reason=${encodeURIComponent(response.error.description)}`);
  };

  const initiateRazorpayPayment = (
    paymentOrder,
    formData,
    onSuccess,
    onFailure
  ) => {
    try {
      validateRazorpayAvailability();
    } catch (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    const options = {
      key: paymentOrder.keyId,
      amount: paymentOrder.amount,
      currency: PAYMENT_CONFIG.CURRENCY,
      name: PAYMENT_CONFIG.COMPANY_NAME,
      description: PAYMENT_CONFIG.DESCRIPTION,
      order_id: paymentOrder.orderId,
      handler: onSuccess,
      prefill: createPrefillData(formData),
      theme: { color: PAYMENT_CONFIG.THEME_COLOR },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", onFailure);
    rzp.on("payment.success", onSuccess);
    rzp.open();
  };

  const processPayment = async (formData, booking, busId) => {
    try {
      const { bookingId, paymentOrder } = await createRazorpayOrder(
        formData,
        booking,
        busId
      );

      initiateRazorpayPayment(
        paymentOrder,
        formData,
        (response) => handlePaymentSuccess(response, bookingId),
        handlePaymentFailure
      );
    } catch (err) {
      console.error("Seat lock or Razorpay setup failed:", err);
      toast.error(formatPaymentError(err));
      setProcessing(false);
    }
  };

  return { processPayment };
};
