import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  busDetails: null,
  selectedSeats: [],
  currentBusSchedule: [],
  currentRoutes: { from: "", to: "", date: "" },
  bookings: [],
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    setCurrentBusDetails: (state, action) => {
      state.busDetails = action.payload;
    },
    clearCurrentBusDetails: (state) => {
      state.busDetails = null;
    },
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
    setCurrentBusSchedule: (state, action) => {
      state.currentBusSchedule = action.payload;
    },
    clearCurrentBusSchedule: (state) => {
      state.currentBusSchedule = [];
    },
    setCurrentRoutes: (state, action) => {
      state.currentRoutes = action.payload;
    },
    clearCurrentRoutes: (state) => {
      state.currentRoutes = { from: "", to: "", date: "" };
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    resetBooking: (state) => {
      state.selectedSeats = [];
      state.busDetails = null;
    },
  },
});

export const {
  setCurrentBusDetails,
  clearCurrentBusDetails,
  selectSeat,
  deselectSeat,
  resetSelectedSeats,
  setCurrentBusSchedule,
  clearCurrentBusSchedule,
  setCurrentRoutes,
  addBooking,
  resetBooking,
} = busSlice.actions;

export default busSlice.reducer;

export const selectCurrentBusDetails = (state) => state.bus.busDetails;
export const selectSelectedSeats = (state) => state.bus.selectedSeats;
export const isSeatSelected = (state, seat) =>
  state.bus.selectedSeats.includes(seat);
export const selectCurrentBusSchedule = (state) => state.bus.currentBusSchedule;
export const selectCurrentRoutes = (state) => state.bus.currentRoutes;
