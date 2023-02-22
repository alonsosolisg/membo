import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="z-3 d-flex flex-column align-items-center justify-content-center vh-100">
      <ClipLoader />
      <div className="mt-2">LOADING...</div>
    </div>
  );
};

export default Loader;
