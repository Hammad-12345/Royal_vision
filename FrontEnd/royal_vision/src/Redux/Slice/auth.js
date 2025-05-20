import { createSlice } from "@reduxjs/toolkit";
export const Protect_Routes = createSlice({
  name: "Protect_Routes",
  initialState: {
    DashboardRoutes: localStorage.getItem("mytoken"),
  },
  reducers: {
    LoggedIn: (state, action) => {
      state.DashboardRoutes = action.payload;
    },
    LoggedOut: (state) => {
      state.DashboardRoutes = false;
    },
  },
});

export const { LoggedIn, LoggedOut } = Protect_Routes.actions;
export default Protect_Routes.reducer;
