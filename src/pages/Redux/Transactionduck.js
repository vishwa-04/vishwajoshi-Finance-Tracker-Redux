import { createSlice, current } from "@reduxjs/toolkit";
import { DefaultJson } from "../../defaultvalue";

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState: DefaultJson,
  reducers: {
    addTransaction: (state, action) => {
      if (state.length === 0) {
        return (state = action.payload);
      } else {
        state.push(action.payload);
      }
    },
    updateTransaction: (state, action) => {
      const { formValues, id } = action.payload;
      const index = state.findIndex((ele) => ele.id == id);
      state[index] = formValues;
    },
    deleteTransaction: (state, action) => {
      const { id } = action.payload;
      let filterReduxData = state;
      console.log(current(filterReduxData), id, "filterReduxData");
      const filterDeleteData = filterReduxData.filter((element, index) => {
        return element.id !== id;
      });
      return filterDeleteData;
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } =
  TransactionSlice.actions;

export default TransactionSlice.reducer;
