
import { createSlice } from "@reduxjs/toolkit";
import { getData, createData, getDataById, updateData, deleteData } from "../asyncActions/contact-us";

const initialState = {
  data: {},
  dataContact: {},
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
      state.data = action.payload;
    });

    build.addCase(getDataById.pending, (state, action) => {
      state.dataContact = null
    });

    build.addCase(getDataById.fulfilled, (state, action) => {
      state.dataContact = action.payload.results;
    });

    build.addCase(createData.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.success = action.payload?.success;
    });

    build.addCase(updateData.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.success = action.payload?.success;
    });

    build.addCase(deleteData.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.success = action.payload?.success;
    });
  }
});

export { getData, getDataById, createData, updateData, deleteData };
export const { cleanAction } = contactUs.actions;
export default contactUs.reducer;