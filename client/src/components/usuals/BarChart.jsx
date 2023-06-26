import React from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
  let rollingLabel;
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

  return <Bar data={props.data} options={options} />;
};

export default BarChart;
