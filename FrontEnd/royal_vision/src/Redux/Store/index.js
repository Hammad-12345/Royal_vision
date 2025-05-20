import { configureStore } from "@reduxjs/toolkit";
import ProtectRoutes from "../Slice/auth";
const store = configureStore({
    reducer: {
        Token:ProtectRoutes
    },
  });
  
  export default store;
  