
import { createSlice } from "@reduxjs/toolkit";
import { getData, createData } from "../asyncActions/contact-us";

const initialState = {
  data: {},
  message: null,
  success: false
};

const contactUs = createSlice({
  name: "contactUs",
  initialState,
  reducers: {
    cleanAction: (state) => {
      return initialState;
    }
  },
  extraReducers: (build) => {
    build.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.results;
    });

    build.addCase(createData.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.success = action.payload.success;
    });
  }
});

export { getData, createData };
export const { cleanAction } = contactUs.actions;
export default contactUs.reducer;