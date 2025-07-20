import CustomButton from "@/components/ui/ButtonUI";
import BookingSummary from "@/components/payment/BookingSummary";
import PassengerForm from "@/components/payment/PassengerForm";
import TotalSection from "@/components/payment/TotalSection";

export default function PaymentForm({
  booking,
  form,
  onSubmit,
  processing,
  isLoading,
}) {
  return (
    <>
      <BookingSummary booking={booking} />
      <PassengerForm form={form} />
      <TotalSection booking={booking} />
      <CustomButton
        onClick={onSubmit}
        className="w-full py-1.5"
        disabled={processing || isLoading}
      >
        {processing ? "Processing..." : "Make Payment"}
      </CustomButton>
    </>
  );
}
