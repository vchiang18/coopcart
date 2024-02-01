import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  password: null,
};

const loginSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    update: (state, action) => {
      state.email = action.payload;
      state.password = action.payload;
    },
    remove: (state) => {
      state.email = null;
      state.password = null;
    },
  },
});

export const { update, remove } = loginSlice.actions;
export default loginSlice.reducer;
