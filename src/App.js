import "./styles/App.css";
import React from "react";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/loginpage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Util } from "reactstrap";
import Home from "./pages/homepage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

//Set Global CSS module
Util.setGlobalCssModule({
  btn: "hyperspeed-btn",
});

//Add FontAwesome icons
library.add(faCircleXmark);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/home/*" element={<Home />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
