import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { useSelector } from "react-redux";

const Dashboard = () => {
  //Call States Through UseSelector
  const { monthly_income } = useSelector((state) => state.userIncome);
  const { memberships } = useSelector((state) => state.userMemberships);

  //Sort Memberships From Price High To Low
  const sortedMemberships = [...memberships].sort((a, b) => b.price - a.price);

  //Add Membership Prices To Find A Total Value
  const membSum = memberships.reduce((accumulator, object) => {
    return accumulator + Number(object.price);
  }, 0);

  //Find The Percentage Of Income That Memberships Take
  const membPercentage =
    Math.round(((membSum * 100) / monthly_income) * 100) / 100;

  //Format Timestamp To Date Reusable Function
  const formatTimestampToDate = (passedDate) => {
    const date = new Date(passedDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  //Turn Timestamp To Number Of Days Since Timestamp 0
  const turnTimestampToDays = (timestamp) => {
    const days = Math.floor(timestamp / 86400000);
    return days;
  };

  //Sort Memberships By Time
  const timeSortedMembs = [...memberships].sort((a, b) => a.date - b.date);

  //Slice The First Element Of The Sorted Memberships By Time (The Closest Date)
  const closestDate = timeSortedMembs.slice(0, 1).map((memb) => memb.date);

  //Find The Difference Between The Closest Date And Current Date In Timestamp
  const nextExpDate =
    Date.parse(closestDate[0]) - Date.parse(formatTimestampToDate(Date.now()));

  //Convert The Difference Into Days
  const daysToNextExp = turnTimestampToDays(nextExpDate);

  return (
    <div className="p-4 container-fluid overflow-auto mb-5">
      <div className="row overflow-hidden">
        <div className="col-12 col-lg-4 py-2">
          <Card
            style={{
              width: "auto",
            }}
          >
            <CardBody className="d-flex align-items-center flex-column gap-2">
              <CardTitle tag="h4">Memberships</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h4">
                {memberships.length}
              </CardSubtitle>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-lg-4 py-2">
          <Card
            style={{
              width: "auto",
            }}
          >
            <CardBody className="d-flex align-items-center flex-column gap-2">
              <CardTitle tag="h4">Monthly Expense</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h4">
                ${membSum}
              </CardSubtitle>
            </CardBody>
          </Card>
        </div>
        <div className="col-12 col-lg-4 py-2">
          <Card
            style={{
              width: "auto",
            }}
          >
            <CardBody className="d-flex align-items-center flex-column gap-2">
              <CardTitle tag="h4">Next Expiration</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h4">
                {daysToNextExp} days
              </CardSubtitle>
            </CardBody>
          </Card>
        </div>
      </div>
      <h5 className="pt-4 pb-2">Most Expensive Memberships</h5>
      <div className="row overflow-auto">
        <Table className="col-12 overflow-auto border">
          <thead>
            <tr>
              <th>#</th>
              <th>Membership Name</th>
              <th>Price</th>
              <th>Date Expiring</th>
            </tr>
          </thead>
          <tbody>
            {sortedMemberships.slice(0, 5).map((memb, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{memb.name}</td>
                <td>${memb.price}</td>
                <td>{memb.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="row overflow-hidden pt-3">
        <div className="col-lg-6 col-12 py-2">
          <Card
            style={{
              width: "auto",
            }}
          >
            <CardBody className="d-flex align-items-center flex-column gap-2">
              <CardTitle tag="h4">Monthly Income</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h4">
                ${monthly_income}
              </CardSubtitle>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-6 col-12 py-2">
          <Card
            style={{
              width: "auto",
            }}
          >
            <CardBody className="d-flex align-items-center flex-column gap-2">
              <CardTitle tag="h4">Percentage In Memberships</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h4">
                {membPercentage}%
              </CardSubtitle>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
