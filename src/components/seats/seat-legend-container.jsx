import { legendItems } from "@/constants/seat-selection";
import SeatLegend from "@/components/seats/seat-legend";

export default function SeatLegendContainer() {
  return <SeatLegend legendItems={legendItems} />;
}
