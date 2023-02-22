import React from "react";
import ExpensesBar from "../components/expensesbar";

const ExpenseTracking = () => {
  return (
    <div className="continer-fluid p-2 vh-100">
      <h3>Most Expensive Memberships</h3>
      <div className="row h-25">
        <div className="col-lg-8 d-flex justify-content-start align-content-center">
          <ExpensesBar />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracking;
