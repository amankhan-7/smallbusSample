import { safeLocalStorage } from "@/lib/localStorage";
import { apiSlice } from "./apiSlice";
const mockBusData = {
  id: "bus-123",
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
  bookedSeats: ["A2", "B1", "C3", "D2"],
};

export const busApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusData: builder.query({
      queryFn: async ({ id }) => {
        try {
          const bookedSeats = safeLocalStorage.getItem("bookedSeats", []);
          const busData = {
            ...mockBusData,
            bookedSeats: [...mockBusData.bookedSeats, ...bookedSeats],
          };

          return { data: busData };
        } catch (error) {
          return { error: { status: 500, data: "Failed to fetch bus data" } };
        }
      },
      providesTags: (result, error, { id }) =>
        result ? [{ type: "Bus", id }] : [],
    }),

    bookSeats: builder.mutation({
      queryFn: async ({ id, seats }) => {
        try {
          const currentBookedSeats = safeLocalStorage.getItem(
            "bookedSeats",
            []
          );
          const newBookedSeats = [...currentBookedSeats, ...seats];
          safeLocalStorage.setItem("bookedSeats", newBookedSeats);

          const currentUser = safeLocalStorage.getItem("userInfo", {});
          const bookingHistory = safeLocalStorage.getItem("bookingHistory", []);

          const newBooking = {
            id: Date.now(),
            busId: id,
            seats,
            ...mockBusData,
            bookingDate: new Date().toISOString(),
            totalAmount: seats.length * mockBusData.seatPrice,
            status: "confirmed",
          };
          bookingHistory.push(newBooking);
          safeLocalStorage.setItem("bookingHistory", bookingHistory);

          return { data: { booking: newBooking, bookedSeats: newBookedSeats } };
        } catch (error) {
          return { error: { status: 500, data: "Booking failed" } };
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Bus", id }],
    }),
  }),
});

export const { useGetBusDataQuery, useBookSeatsMutation } = busApiSlice;
