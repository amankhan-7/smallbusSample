const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userInfo: {
    fullname: "",
    phone: "",
    email: "",
    profilePicture: null,
  },
  bookingHistory: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    clearUserData: (state) => {
      state.userInfo = initialState.userInfo;
      state.bookingHistory = [];
      localStorage.removeItem("userInfo");
    },
  },
});

export const {
  setUserInfo,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
