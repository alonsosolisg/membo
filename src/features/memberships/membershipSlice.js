import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../supabaseClient";

//Fetch User Memberships From The Supabase Database
export const fetchMembershipData = createAsyncThunk(
  "membershipSlice/fetchMembershipData",
  async () => {
    const userId = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
      .from("profiles")
      .select("memberships")
      .eq("id", userId);

    if (error) throw error;
    return data;
  }
);

//Update User Memberships In The Supabase Database With The Latest State
export const updateMembershipData = createAsyncThunk(
  "membershipSlice/updateMembershipData",
  async (updatedMemberships) => {
    const userId = (await supabase.auth.getUser()).data.user.id;
    const { data, error } = await supabase
      .from("profiles")
      .update({ memberships: updatedMemberships })
      .eq("id", userId);

    if (error) throw error;
    return data;
  }
);

//Declare The Initial State Of membershipSlice memberships
const initialState = {
  memberships: [],
};

//Create The membershipSlice By Passing Name And Initial State
const membershipSlice = createSlice({
  name: "userMemberships",
  initialState,

  //Add Reducers To Change Store membersips Values Through Actions
  reducers: {
    //Add A Membership To The End Of The Membership Array
    addMembership(state, action) {
      if (state.memberships === []) {
        state.memberships = action.payload[0];
      } else {
        state.memberships.push(action.payload[0]);
      }
    },

    //Replace A Membership Based On The Membebership Index
    replaceMembership(state, action) {
      const { index, newMemb } = action.payload;
      if (index !== -1) {
        state.memberships.splice(index, 1, newMemb);
      }
    },

    //Delete A Membership Based On The Index
    deleteMembership(state, action) {
      state.memberships.splice(action.payload, 1);
    },
  },

  //Add The Extra Reducers pending, fulfilled and rejected Cases When Fetching Memberships
  extraReducers: (builder) => {
    //When The Data Fetching Is Pending
    builder.addCase(fetchMembershipData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    //When The Data Fetching Is Fulfilled (Assigns Actual Values)
    builder.addCase(fetchMembershipData.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload[0].memberships[0] === undefined) {
        state.memberships = action.payload[0].memberships;
      } else {
        state.memberships = action.payload[0].memberships[0];
      }
    });
    //When The Data Fetching Gets Rejected (+ error message)
    builder.addCase(fetchMembershipData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

//Export The Reducers
export const { addMembership, replaceMembership, deleteMembership } =
  membershipSlice.actions;

export default membershipSlice.reducer;
