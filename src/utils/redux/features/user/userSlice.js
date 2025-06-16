import { safeLocalStorage } from "@/lib/localStorage";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userInfo: safeLocalStorage.getItem("userInfo") || {
    fullname: "",
    phone: "",
    email: "",
    profilePicture: null,
  },
  bookingHistory: safeLocalStorage.getItem("bookingHistory", []),
  isLoggedIn: safeLocalStorage.getItem("isLoggedIn") === "true",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      safeLocalStorage.setItem("userInfo", state.userInfo);
      safeLocalStorage.setItem("isLoggedIn", "true");
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      safeLocalStorage.setItem("userInfo", state.userInfo);
    },
    setBookingHistory: (state, action) => {
      state.bookingHistory = action.payload;
      safeLocalStorage.setItem("bookingHistory", state.bookingHistory);
    },
    addBooking: (state, action) => {
      state.bookingHistory.push(action.payload);
      safeLocalStorage.setItem("bookingHistory", state.bookingHistory);
    },
    clearUserData: (state) => {
      state.userInfo = {
        fullname: "",
        phone: "",
        email: "",
        profilePicture: null,
      };
      state.bookingHistory = [];
      state.isLoggedIn = false;
      safeLocalStorage.removeItem("userInfo");
      safeLocalStorage.removeItem("bookingHistory");
      safeLocalStorage.removeItem("isLoggedIn");
    },
    loadUserFromStorage: (state) => {
      const userInfo = safeLocalStorage.getItem("userInfo");
      const bookingHistory = safeLocalStorage.getItem("bookingHistory", []);
      const isLoggedIn = safeLocalStorage.getItem("isLoggedIn") === true;

      if (userInfo && isLoggedIn) {
        state.userInfo = userInfo;
        state.bookingHistory = bookingHistory;
        state.isLoggedIn = true;
      }
    },
  },
});

export const {
  setUserInfo,
  updateUserInfo,
  setBookingHistory,
  addBooking,
  clearUserData,
  loadUserFromStorage,
} = userSlice.actions;

export default userSlice.reducer;
