import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  let rollingLabel;
  return <Bar data={props.data} />;
};

export default BarChart;
