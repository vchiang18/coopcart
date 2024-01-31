import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    update: (state, action) => {
      state.token = action.payload;
    },
    remove: (state) => {
      state.token = null;
    },
  },
});

export const { update, remove } = authSlice.actions;
export default authSlice.reducer;
