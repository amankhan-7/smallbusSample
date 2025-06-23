import { legendItems } from "@/constants/seat-selection";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function SeatLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-[1.875rem] rounded-lg">
      {legendItems.map((item) => (
        <div
          key={item.status}
          className="flex items-center gap-2 rounded-lg"
        >
          <span className={cn("w-5 h-5 border rounded ", item.className)}>
            {item.icon}
          </span>
          <span className="text-[#666] text-[0.9rem]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
