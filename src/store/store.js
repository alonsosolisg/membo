import { configureStore } from "@reduxjs/toolkit";
import membershipSlice, {
  fetchMembershipData,
} from "../features/memberships/membershipSlice";
import userIncomeSlice, {
  fetchIncomeData,
} from "../features/userIncome/userIncomeSlice";
import credentialSlice, {
  fetchCredentialData,
} from "../features/credentials/credentialSlice";

//Set The Redux Store Passing The Slices
export const store = configureStore({
  reducer: {
    userMemberships: membershipSlice,
    userIncome: userIncomeSlice,
    userCredentials: credentialSlice,
  },
});

//Fetch Data From The Supabase Database When The App Start
store.dispatch(fetchCredentialData());
store.dispatch(fetchIncomeData());
store.dispatch(fetchMembershipData());
