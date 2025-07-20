import { safeLocalStorage } from "@/lib/localStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      safeLocalStorage.setItem("user", user);
      state.user = user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      safeLocalStorage.removeItem("user");
    },
    clearAuth: (state) => {
      safeLocalStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;

    },
    hydrate: (state) => {
      const user = safeLocalStorage.getItem("user");
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
        state.isLoading = false;
  
      } else {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
  
      }
    }
  },
});

export const { setCredentials, logout, setLoading, setInitialized, clearAuth, hydrate } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
