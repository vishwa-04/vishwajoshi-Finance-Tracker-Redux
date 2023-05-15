import { createSlice, current } from "@reduxjs/toolkit";
import { DefaultUser } from "../../defaultvalue";

export const UserSlice = createSlice({
  name: "user",
  initialState: DefaultUser,
  reducers: {
    userRegister: (state, action) => {
      if (state.length === 0) {
        return (state = action.payload);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { userRegister } = UserSlice.actions;

export default UserSlice.reducer;
