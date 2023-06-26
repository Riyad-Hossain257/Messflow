import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = (props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
          font: {
            size: 12,
          },
        },
      },
      datalabels: {
        color: 'white',
        labels: {
          title: {
            font: {
              weight: 'bold',
            },
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
      },
      y: {
        ticks: { color: 'white' },
      },
    },
  };
  return <Line data={props.data} options={options} />;
};

export default LineChart;
