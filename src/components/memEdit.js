/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  replaceMembership,
  updateMembershipData,
} from "../features/memberships/membershipSlice";

const MemEdit = () => {
  //Call States Through UseSelector
  const { memberships } = useSelector((state) => state.userMemberships);

  //Create States For Storing And Changing Values
  const [values, setValues] = useState({
    name: "",
    price: 0,
    date: "",
    frequency: "",
    renewing: "false",
  });
  const [membership, setMembership] = useState([]);
  const [onSubmitting, setOnSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);

  //Assign useDispatch To A Variable
  const dispatch = useDispatch();

  //Assign useLocation To A Variable
  const location = useLocation();

  //Assigns To A Variable The Membership Array Passed From Routing
  const memb = location.state.membership;

  //Assigns To A Variable The Membership Index Passed From Routing
  const membIndex = location.state.index;

  //Set Default Current Membership Values To The Form On Refresh If onSubmitting Is False
  useEffect(() => {
    if (onSubmitting === false) {
      setValues(memb);
    }
  }, [memb, onSubmitting]);

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

  //Handle Form Submission Form
  const handleSubmit = (event) => {
    //Prevent Default From The event And Assign The newMembership Values
    event.preventDefault();
    const newMembership = [
      ...membership,
      {
        name: values.name,
        price: values.price,
        date: values.date,
        frequency: values.frequency,
        renewing: values.renewing,
      },
    ];
    //Set On Submitting To True & Dispatch The Membership Array & Index To The Redux State
    setOnSubmitting(true);
    dispatch(
      replaceMembership({ index: membIndex, newMemb: newMembership[0] })
    );
    setMembership(newMembership);
  };

  //Handle The Input Chnage By Setting The Membership Values With The Input Values
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  //Format Timestamp To Date Reusable Function
  const formatTimestampToDate = (passedDate) => {
    const date = new Date(passedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  //Validate The Form Inputs So That Empty Values Or Past Dates Can't Be Submitted
  const validateForm = () => {
    if (
      values.name.trim() === "" ||
      values.price <= 0 ||
      values.date.trim() === "" ||
      Date.parse(values.date.trim()) <=
        Date.parse(formatTimestampToDate(Date.now()))
    ) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  //Validate Form When values Change
  useEffect(() => {
    validateForm();
  }, [values]);

  return (
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        <Row className="py-2">
          <Col md={6}>
            <FormGroup>
              <Label for="exampleMembership">Membership Name</Label>
              <Input
                id="membName"
                name="name"
                placeholder={memb.name}
                type="text"
                onChange={handleInputChange}
                value={values.name}
                className={values.name.trim() === "" ? "is-invalid" : ""}
              />
              {values.name.trim() === "" && (
                <div className="invalid-feedback">
                  Please enter a membership name
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePrice">Price/Month</Label>
              <Input
                id="priceMonth"
                name="price"
                placeholder="price"
                type="number"
                value={values.price}
                onChange={handleInputChange}
                className={values.price <= 0 ? "is-invalid" : ""}
              />
              {values.price <= 0 && (
                <div className="invalid-feedback">
                  Price must be greater than zero
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row className="py-2">
          <Col md={6}>
            <Label for="exampleDate">Date Expiring</Label>
            <Input
              id="date"
              name="date"
              placeholder="date"
              type="date"
              value={values.date}
              onChange={handleInputChange}
              className={
                values.date.trim() === "" ||
                Date.parse(values.date.trim()) <=
                  Date.parse(formatTimestampToDate(Date.now()))
                  ? "is-invalid"
                  : ""
              }
            />
            {values.date.trim() === "" ||
              (Date.parse(values.date.trim()) <=
                Date.parse(formatTimestampToDate(Date.now())) && (
                <div className="invalid-feedback">
                  There must be a date from the future
                </div>
              ))}
          </Col>
          <Col md={6}>
            <Label for="exampleFrequency">Payment Frequency</Label>
            <Input
              id="frequency"
              name="frequency"
              placeholder="frequency of membership payments"
              type="select"
              value={values.frequency}
              onChange={handleInputChange}
            >
              <option>Monthly</option>
              <option>Yearly</option>
            </Input>
          </Col>
        </Row>
        <Row className="py-2">
          <Col md={2}>
            <FormGroup check className="py-2">
              <Label for="exampleRenewing">Renewing</Label>
              <Input
                id="renewing"
                name="renewing"
                placeholder="is it being renewed"
                type="select"
                value={values.renewing}
                onChange={handleInputChange}
              >
                <option>Yes</option>
                <option>No</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={validated === false}
        >
          Submit
        </button>
      </Form>
    </div>
  );
};

export default MemEdit;
