import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === "admin";
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;