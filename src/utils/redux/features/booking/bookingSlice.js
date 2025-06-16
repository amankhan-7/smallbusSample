import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  selectedBusId: "bus-123",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    selectSeat: (state, action) => {
      const seatNumber = action.payload;
      if (state.selectedSeats.includes(seatNumber)) {
        return;
      }

      state.selectedSeats.push(seatNumber);
    },

    deselectSeat: (state, action) => {
      const seatNumber = action.payload;
      state.selectedSeats = state.selectedSeats.filter(
        (seat) => seat !== seatNumber
      );
    },
    resetBooking: (state) => {
      state.selectedSeats = [];
    },
    selectBus: (state, action) => {
      state.selectedBusId = action.payload;
    },
  },
});

export const {
  selectSeat,
  deselectSeat,
  resetBooking,
  selectBus,
} = bookingSlice.actions;

export default bookingSlice.reducer;
