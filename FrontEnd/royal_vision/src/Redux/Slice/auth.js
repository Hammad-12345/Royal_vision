import { createSlice } from "@reduxjs/toolkit";

export const Protect_Routes = createSlice({
  name: "Protect_Routes",
  initialState: {
    DashboardRoutes: JSON.parse(localStorage.getItem("mytoken")),
    userDetail: JSON.parse(localStorage.getItem("user")), // ← added userDetail
  },
  reducers: {
    LoggedIn: (state, action) => {
      state.DashboardRoutes = action.payload.token;
      state.userDetail = action.payload.user; // set user detail
    },
    LoggedOut: (state) => {
      state.DashboardRoutes = false;
      state.userDetail = null;
    },
  },
});

export const { LoggedIn, LoggedOut } = Protect_Routes.actions;
export default Protect_Routes.reducer;
