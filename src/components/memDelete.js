import React, { useState, useEffect } from "react";
import {
  deleteMembership,
  updateMembershipData,
} from "../features/memberships/membershipSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MemDelete = () => {
  //Call States Through UseSelector
  const { memberships } = useSelector((state) => state.userMemberships);

  //Create States For Storing And Changing Values
  const [onSubmitting, setOnSubmitting] = useState(false);

  //Assign useDispatch To A Variable
  const dispatch = useDispatch();

  //Assign useLocation To A Variable
  const location = useLocation();

  //Assigns To A Variable The Membership Index Passed From Routing
  const membIndex = location.state.index;

  //When The memberships Changes
  //If onSubmit Is True Update The Supabase Database Memberships Array
  //Then setOnSubmit To False And Redirect To "/home/memberships"
  useEffect(() => {
    if (onSubmitting === true) {
      dispatch(updateMembershipData([memberships])).then(() => {
        setOnSubmitting(false);
        window.location.href = "/home/memberships";
      });
    }
  }, [memberships, dispatch, onSubmitting]);

  //Handle The Delete Action
  const handleDelete = () => {
    //Set onSubmitting To True And Delete The Membership Based On The Index
    setOnSubmitting(true);
    dispatch(deleteMembership(membIndex));
  };
  return (
    <div className="vh-100 d-flex flex-column align-items-center pt-5">
      <h1 className="pt-5">Are You Sure You Want To Delete?</h1>
      <button className="btn btn-success mt-2" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default MemDelete;
