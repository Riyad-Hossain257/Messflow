import React from 'react';
import { Line } from 'react-chartjs-2';
import  'chart.js/auto';

const LineChart = (props) => {
    return (
        <Line
            data={props.data}
        />
    )
}

export default LineChart