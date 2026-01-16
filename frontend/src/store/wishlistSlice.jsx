import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    ids: [],
  },
  reducers: {
    setWishlistIds(state, action) {
      state.ids = action.payload;
    },

    displayWishlist(state, action) {

      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },

    removeWishlist(state, action) {
      state.ids = state.ids.filter(id => id !== action.payload)
    }



  },
});

export const { setWishlistIds, displayWishlist, removeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;


