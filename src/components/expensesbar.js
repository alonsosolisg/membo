import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const ExpensesBar = () => {
  //Call States Through UseSelector
  const { memberships } = useSelector((state) => state.userMemberships);

  //Create States For Storing And Changing Values
  const [barX, setBarX] = useState([]);
  const [barSeries, setBarSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: barX,
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Price in $",
      data: barSeries,
    },
  ]);

  //When memberships State Changes Trigger The Effect
  useEffect(() => {
    //Sort The Memberships By Price High To Low
    const sortedMemberships = [...memberships].sort(
      (a, b) => b.price - a.price
    );

    //Slice The First 5 Objects From The Sorted Memberships And Map The Names
    const mappedXAxis = sortedMemberships.slice(0, 5).map((memb) => memb.name);

    //Slice The First 5 Objects From The Sorted Memberships And Map The Prices
    const mappedSeries = sortedMemberships
      .slice(0, 5)
      .map((memb) => Number(memb.price));

    //Set State Values
    setBarX(mappedXAxis);
    setBarSeries(mappedSeries);

    setOptions({
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: mappedXAxis,
      },
    });

    setChartSeries([
      {
        name: "Price in $",
        data: mappedSeries,
      },
    ]);
  }, [memberships]);

  return (
    <div className="app d-flex align-items-center justify-items-center h-100 w-100">
      <div className="row h-100 w-100">
        <div className="mixed-chart h-100 w-100">
          <Chart
            options={options}
            series={chartSeries}
            type="bar"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesBar;
