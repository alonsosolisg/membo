import React from "react";
import supabase from "../supabaseClient";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";
import logo from "../pictures/membo_logo.svg";
import "../styles/App.css";

const Login = () => {
  //Assign useNavigate To A Variable
  const navigate = useNavigate();

  //When State Of Authentication Changes Navigate User To Respective Page
  supabase.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      navigate("/home");
    } else {
      navigate("/");
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img className="h-25 w-25" src={logo} alt="logo" />
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
        />
      </header>
    </div>
  );
};

export default Login;
