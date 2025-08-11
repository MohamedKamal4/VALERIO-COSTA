import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite"))
    : [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      if (!exists) {
        state.items.push(item);
        localStorage.setItem("favorite", JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action) => {
      const idToRemove = action.payload.id;
      const updatedItems = state.items.filter((i) => i.id !== idToRemove);
      state.items = updatedItems;
      localStorage.setItem("favorite", JSON.stringify(updatedItems));
    },
    clearFavorite: (state) => {
      state.items = [];
      localStorage.setItem("favorite", JSON.stringify([]));
    },
  },
});

export const { addFavorite, removeFavorite,clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
