import { Card } from "@/components/ui/card";
import { SiRazorpay } from "react-icons/si";
import { Smartphone, Landmark } from "lucide-react";

export function PaymentOptions({ selectedOption, onSelect}) {
  const options = [
    {
      id: "razorpay",
      icon: <SiRazorpay className="w-6 h-6 text-[#004aad]" />,
      title: "Razorpay",
      description: "Pay securely using Razorpay gateway",
    },
     {
      id:"upi",
      icon: <Smartphone className="w-6 h-6 text-[#004aad]" />,
      title: "UPI",
      description: "Pay using any UPI app",
    },
    {
      id:"net",
      icon: <Landmark className="w-6 h-6 text-[#004aad]" />,
      title: "Net Banking",
      description: "Pay directly from your bank account",
    },
  ];

  return (
    <Card className="bg-white rounded-[12px] p-6 mb-6 shadow">
      <div className="mb-1 font-bold text-xl md:text-2xl text-primary">
        Payment Method
      </div>

      {options.map((option) => (
        <div
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`border rounded-lg px-4 py-2.5 mb-1 flex items-center gap-3 cursor-pointer transition-all ${
            selectedOption === option.id
              ? "border-blue-700 bg-blue-50"
              : "border-slate-300 hover:border-blue-800"
          }`}
        >
          {option.icon}
          <div className="flex-1">
            <div className="font-medium text-text-color">{option.title}</div>
            <div className="text-xs lg:text-sm text-slate-500">
              {option.description}
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
