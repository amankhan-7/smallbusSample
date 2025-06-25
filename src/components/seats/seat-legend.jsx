import { memo } from "react";
import { cn } from "@/lib/utils";

const SeatLegend = memo(({
  legendItems = [],
  className = "",
}) => {
  if (!legendItems.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-6 mb-[1.875rem] rounded-lg",
        className
      )}
    >
      {legendItems.map((item) => (
        <div key={item.status} className="flex items-center gap-2 rounded-lg">
          <span className={cn("w-5 h-5 border rounded", item.className)}>
            {item.icon}
          </span>
          <span className="text-[#666] text-[0.9rem]">{item.label}</span>
        </div>
      ))}
    </div>
  );
});

export default SeatLegend;
