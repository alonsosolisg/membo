import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import {
  updateIncomeData,
  updateIncomeState,
} from "../features/userIncome/userIncomeSlice";
import { useSelector, useDispatch } from "react-redux";

const Settings = () => {
  //Call States Through UseSelector
  const { email } = useSelector((state) => state.userCredentials);
  const { monthly_income } = useSelector((state) => state.userIncome);

  //Create States For Storing And Changing Values
  const [incomeValue, setIncomeValue] = useState(null);
  const [onSubmit, setOnSubmit] = useState(false);

  //Assign useDispatch To A Variable
  const dispatch = useDispatch();

  //When The monthly_income Changes
  //If onSubmit Is True Update The Supabase Database Income Value
  //Then setOnSubmit To False And Redirect To "/home"
  useEffect(() => {
    if (onSubmit === true) {
      dispatch(updateIncomeData(monthly_income)).then(() => {
        setOnSubmit(false);
        window.location.href = "/home";
      });
    }
  }, [monthly_income, dispatch, onSubmit]);

  //Handle Form Submission By Setting onSubmit To True
  //Prevent Default From The event And Dispatch The Income Value To The Redux State
  const handleIncomeSubmit = (event) => {
    setOnSubmit(true);
    event.preventDefault();
    dispatch(updateIncomeState(incomeValue));
  };

  //Handle The Input Chnage By Setting The Income Value With The Input Value
  const handleInputChange = (event) => {
    setIncomeValue(event.target.value);
  };

  return (
    <div className="p-4">
      <Form onSubmit={handleIncomeSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup disabled>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder={email}
                type="email"
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="monthlyIncome">My Monthly Income</Label>
              <InputGroup>
                <InputGroupText>$</InputGroupText>
                <Input
                  id="monthlyIncomeNull"
                  name="myIncomeNull"
                  defaultValue={monthly_income}
                  type="number"
                  onChange={handleInputChange}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </Form>
    </div>
  );
};

export default Settings;
