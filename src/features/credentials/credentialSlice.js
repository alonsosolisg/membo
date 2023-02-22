import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

//Fetch User Credentials From The Supabase Database
export const fetchCredentialData = createAsyncThunk(
  "userCredentials/fetchCredentialData",
  async () => {
    try {
      const user = await supabase.auth.getUser();
      return user.data.user;
    } catch (error) {
      throw error;
    }
  }
);

//Declare The Initial State Of credentialSlice email & userId
const initialState = {
  email: null,
  userId: null,
};

//Create The credentialSlice By Passing Name And Initial State
const credentialSlice = createSlice({
  name: "userCredentials",
  initialState,

  //Add The Extra Reducers pending, fulfilled and rejected Cases When Fetching Credentials
  extraReducers: (builder) => {
    //When The Data Fetching Is Pending
    builder.addCase(fetchCredentialData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //When The Data Fetching Is Fulfilled (Assigns Actual Values)
    builder.addCase(fetchCredentialData.fulfilled, (state, action) => {
      state.loading = false;
      state.userId = action.payload.id;
      state.email = action.payload.email;
    });

    //When The Data Fetching Gets Rejected (+ error message)
    builder.addCase(fetchCredentialData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default credentialSlice.reducer;
