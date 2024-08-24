import { configureStore } from "@reduxjs/toolkit";
import TabReducer from "./reducer/tab";

const store = configureStore({
  reducer: {
    tab: TabReducer,
  },
});

export default store;
