import React from "react";
import { Table } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MemList = () => {
  //Call States Through UseSelector
  const { memberships } = useSelector((state) => state.userMemberships);

  //Assign useNavigate To A Variable
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-4">
      <div className="row overflow-hidden">
        <div className="col-2 offset-10 pb-3 d-flex justify-content-end">
          <a
            className="btn btn-success"
            role="button"
            href="/home/memberships/add"
          >
            Add +
          </a>
        </div>
      </div>
      <div className="row overflow-auto">
        <Table className="col-12 overflow-auto border">
          <thead>
            <tr>
              <th>#</th>
              <th>Membership Name</th>
              <th>Price</th>
              <th>Date Expiring</th>
              <th>Payment Type</th>
              <th>Renewing</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {memberships.map((memb, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{memb.name}</td>
                <td>${memb.price}</td>
                <td>{memb.date}</td>
                <td>{memb.frequency}</td>
                <td>{memb.renewing}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate("/home/memberships/edit", {
                        state: { membership: memb, index: index },
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate("delete", {
                        state: { index: index },
                      })
                    }
                    className="btn"
                  >
                    <FontAwesomeIcon icon="fa-regular fa-circle-xmark"></FontAwesomeIcon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MemList;
