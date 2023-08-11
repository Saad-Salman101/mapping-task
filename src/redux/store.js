import { configureStore} from "@reduxjs/toolkit";
import { customerSlice } from "./Reducers";


const store = configureStore({
    reducer: {
      customer: customerSlice,
    },
  });
export default store;