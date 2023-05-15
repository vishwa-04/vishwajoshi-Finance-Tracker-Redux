import { configureStore } from "@reduxjs/toolkit";
import TransactionReducer from "./Transactionduck";
import UserReducer from "./userduck";

export const FinanceStore = configureStore({
  reducer: {
    transaction: TransactionReducer,
    user: UserReducer,
  },
});
