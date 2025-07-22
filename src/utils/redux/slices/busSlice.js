import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  currentBusSchedule: [],
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    selectSeat: (state, action) => {
      const seat = action.payload;
      if (!state.selectedSeats.includes(seat)) {
        state.selectedSeats.push(seat);
      }
    },
    deselectSeat: (state, action) => {
      const seat = action.payload;
      state.selectedSeats = state.selectedSeats.filter((s) => s !== seat);
    },
    resetSelectedSeats: (state) => {
      state.selectedSeats = [];
    },
    resetBooking: (state) => {
      state.selectedSeats = [];
    },
  },
});

export const {
  clearCurrentBusDetails,
  selectSeat,
  deselectSeat,
  resetSelectedSeats,
  resetBooking,
} = busSlice.actions;

export default busSlice.reducer;

export const selectSelectedSeats = (state) => state.bus.selectedSeats;
export const isSeatSelected = (state, seat) =>
  state.bus.selectedSeats.includes(seat);