import { SEAT_STATUS } from "@/constants/seat-selection";
export function generateSeatLayout({ busLayout, rows }) {
  const seats = [];
  
  const rowLabels = Array.from({ length: rows }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  for (let row = 0; row < rows; row++) {
    const rowLabel = rowLabels[row];
    const rowSeats = [];

    if (busLayout === "3-column") {
      rowSeats.push(createSeatItem(`${rowLabel}1`, 1));
      rowSeats.push(createSeatItem(`${rowLabel}2`, 2));
      rowSeats.push(createSeatItem(`${rowLabel}3`, 3));
    } else {

      rowSeats.push(createSeatItem(`${rowLabel}1`, 1));
      rowSeats.push(createSeatItem(`${rowLabel}2`, 2));
      rowSeats.push(createSeatItem(`${rowLabel}3`, 3));
      rowSeats.push(createSeatItem(`${rowLabel}4`, 4));
    }

    seats.push(rowSeats);
  }

  return seats;
}


function createSeatItem(id, position) {
  return {
    type: "seat",
    id,
    position,
  };
}


