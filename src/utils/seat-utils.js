import { SEAT_STATUS } from "@/constants/seat-selection";
export function generateSeatLayout({ busType, rows }) {
  const seats = [];

  const rowLabels = Array.from({ length: rows }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  for (let row = 0; row < rows; row++) {
    const rowLabel = rowLabels[row];
    const rowSeats = [];

    if (busType === "3-column") {
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


export function getSeatStatus(seatId, bookedSeats = [], selectedSeats = []) {
  if (bookedSeats.includes(seatId)) return SEAT_STATUS.BOOKED;
  if (selectedSeats.includes(seatId)) return SEAT_STATUS.SELECTED;
  return SEAT_STATUS.AVAILABLE;
}



