import React from "react";
import { Routes, Route } from "react-router-dom";
import MemAdd from "../components/memAdd";
import MemDelete from "../components/memDelete";
import MemEdit from "../components/memEdit";
import MemList from "../components/memList";

const Memberships = () => {
  return (
    <Routes>
      <Route path="/" element={<MemList />} />
      <Route path="/edit" element={<MemEdit />} />
      <Route path="/add" element={<MemAdd />} />
      <Route path="/delete" element={<MemDelete />} />
    </Routes>
  );
};

export default Memberships;
