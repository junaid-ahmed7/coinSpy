import { configureStore } from "@reduxjs/toolkit";
import catalystReducer from "../reducers/catalystReducer";

const store = configureStore({
  reducer: {
    catalyst: catalystReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
