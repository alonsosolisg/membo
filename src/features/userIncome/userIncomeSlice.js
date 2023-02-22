import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

//Fetch User Income From The Supabase Database
export const fetchIncomeData = createAsyncThunk(
  "userIncomeSlice/fetchInitialData",
  async () => {
    const userId = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
      .from("profiles")
      .select("monthly_income")
      .eq("id", userId);

    if (error) throw error;
    return data;
  }
);

//Update User Income In The Supabase Database With The Latest State
export const updateIncomeData = createAsyncThunk(
  "userIncomeSlice/updateIncomeData",
  async (updatedIncome) => {
    const userId = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
      .from("profiles")
      .update({ monthly_income: updatedIncome })
      .eq("id", userId);

    if (error) throw error;

    return data;
  }
);

//Declare The Initial State Of userIncomeSlice monthly_income
const initialState = {
  monthly_income: null,
};

//Create The membershipSlice By Passing Name And Initial State
const userIncomeSlice = createSlice({
  name: "userIncome",
  initialState,

  //Add Reducers To Change Store monthly_income Value Through Actions
  reducers: {
    //Replace The Current monthly_income State With The Passed State
    updateIncomeState(state, action) {
      state.monthly_income = action.payload;
    },
  },
  //Add The Extra Reducers pending, fulfilled and rejected Cases When Fetching Income
  extraReducers: (builder) => {
    //When The Data Fetching Is Pending
    builder.addCase(fetchIncomeData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //When The Data Fetching Is Fulfilled (Assigns Actual Values)
    builder.addCase(fetchIncomeData.fulfilled, (state, action) => {
      state.loading = false;
      state.monthly_income = action.payload[0].monthly_income;
    });
    //When The Data Fetching Gets Rejected (+ error message)
    builder.addCase(fetchIncomeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

//Export The Reducer
export const { updateIncomeState } = userIncomeSlice.actions;

export default userIncomeSlice.reducer;
