import { SEAT_STATUS } from "@/constants/seat-selection";

export function generateSeatLayout({ seatMap, totalSeats }) {
  if (!seatMap || !Array.isArray(seatMap)) {
    return [];
  }

  const seats = [];
  const seatsPerRow = 4;
  const numberOfRows = Math.ceil(totalSeats / seatsPerRow);

  for (let row = 0; row < numberOfRows; row++) {
    const rowSeats = [];
    const startSeatNumber = row * seatsPerRow + 1;
    const endSeatNumber = Math.min(
      startSeatNumber + seatsPerRow - 1,
      totalSeats
    );

    for (
      let seatNumber = startSeatNumber;
      seatNumber <= endSeatNumber;
      seatNumber++
    ) {
      const seatData = seatMap.find((seat) => seat.seatNumber === seatNumber);
      if (seatData) {
        rowSeats.push(
          createSeatItem(seatData._id, seatNumber, seatData.status)
        );
      }
    }

    if (rowSeats.length > 0) {
      seats.push(rowSeats);
    }
  }

  return seats;
}

function createSeatItem(id, seatNumber, status = "available") {
  return {
    type: "seat",
    id,
    seatNumber,
    status,
  };
}
