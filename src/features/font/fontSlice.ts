import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FontState {
  isLoaded: boolean;
}

const initialState: FontState = {
  isLoaded: false,
};

const FontSlice = createSlice({
  name: "Font",
  initialState,
  reducers: {
    setIsLoaded(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },
  },
});

export default FontSlice.reducer;
export const { setIsLoaded } = FontSlice.actions;
