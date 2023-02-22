import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/dashboard";
import Memberships from "../screens/memberships";
import ExpenseTracking from "../screens/expensetracking";
import Settings from "../screens/settings";
import logo from "../pictures/membo_logo.svg";
import Loader from "../components/loader";

const Home = () => {
  //Create States For Storing And Changing Values
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(false);

  //Assign useNavigate To A Variable
  const navigate = useNavigate();

  //Set The Loader Based On The Value Of The User Keys To Prevent UnAuthenticated Access
  const loadData = () => {
    if (Object.keys(user).length === 0) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  };

  //Get User Data From The Supabase Database On Refresh
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  //Load User Data On Refresh
  useEffect(() => {
    loadData();
  });

  //Sign Out The User And Navigate To Initial Page
  async function signOutUsername() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="vh-100 overflow-hidden">
      {loader === true ? <Loader /> : null}
      <div className="container-fluid">
        <div className="row border-bottom">
          <div className=" col-lg-2 col-4 d-flex align-items-center">
            <img className="h-75 w-75" src={logo} alt="logo" />
          </div>
          <div className="col-auto p-1 offset-lg-9 offset-4 d-flex align-items-center">
            <button
              className="btn btn-success"
              onClick={() => signOutUsername()}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="row">
          <ListGroup className="col-4 col-lg-3 rounded-0 vh-100 overflow-auto border-end pe-0">
            <ListGroupItem
              className="border-top-0 py-4 border-end-0"
              href="/home"
              tag="a"
            >
              Dashboard
            </ListGroupItem>
            <ListGroupItem
              className="py-4 border-end-0"
              href="/home/memberships"
              tag="a"
            >
              Memberships
            </ListGroupItem>
            <ListGroupItem
              className="py-4 border-end-0"
              href="/home/expensetracking"
              tag="a"
            >
              Expense Tracking
            </ListGroupItem>
            <ListGroupItem
              className="py-4 border-end-0"
              href="/home/settings"
              tag="a"
            >
              Settings
            </ListGroupItem>
          </ListGroup>
          <div className="col-lg-9 col-8 vh-100 overflow-auto">
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="memberships/*" element={<Memberships />} />
              <Route path="expensetracking" element={<ExpenseTracking />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
