import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  bookingData: {
    from: "Pune",
    to: "Patna",
    date: "Sun, 3 Jun",
    busType: "AC Seater Express",
    busLayout: "3-column",
    departureTime: "18:30",
    arrivalTime: "00:00",
    rows: 8,
    totalSeats: 32,
    seatPrice: 899,
    bookedSeats: [],
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectSeat: (state, action) => {
      const seatNumber = action.payload;
      if (!seatNumber || typeof seatNumber !== "string") {
        state.bookingError = "Invalid seat number";
        return;
      }

      if (state.selectedSeats.includes(seatNumber)) {
        return;
      }

      state.selectedSeats.push(seatNumber);
      state.bookingError = null;
    },

    deselectSeat: (state, action) => {
      const seatNumber = action.payload;
      state.selectedSeats = state.selectedSeats.filter(
        (seat) => seat !== seatNumber
      );
      state.bookingError = null;
    },

    setBookingData: (state, action) => {
      state.bookingData = { ...state.bookingData, ...action.payload };
      state.bookingError = null;
    },

    setPassengerDetails: (state, action) => {
      state.passengerDetails = action.payload;
    },
  },
});

export const {
  selectSeat,
  deselectSeat,
  setBookingData,
  setPassengerDetails,
} = bookingSlice.actions;

export default bookingSlice.reducer;
