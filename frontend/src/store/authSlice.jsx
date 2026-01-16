import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    islogined: false
  },
  reducers: {
    onlogin(state, action) {
      state.user = action.payload
      state.islogined = true


    },
    logout(state, action) {
      state.user = null;
      state.islogined = false;
    }

  }
})

export const { onlogin, logout } = authSlice.actions;
export default authSlice.reducer;