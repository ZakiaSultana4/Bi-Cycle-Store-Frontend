import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  exp: number;
  iat: number;
  role: string;
  userId: string;
};

type TAuthState={
    user:null | TUser;
    token: null | string;
}
const initialState:TAuthState = {
  user: null ,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState & { auth: TAuthState }) => state.auth.user;
export const selectCurrentToken = (state: RootState & { auth: TAuthState }) => state.auth.token;