import React from 'react';
import { Line } from 'react-chartjs-2';

const UserActivityGraph = ({ userActivityData }) => {
  const dates = userActivityData.map(data => data.date);
  const newUsers = userActivityData.map(data => data.newUsers);
  console.log(newUsers)

  const graphData = {
    labels: dates,
    datasets: [
      {
        label: 'New Users Registered',
        data: newUsers,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0.1,
      },
    ],
  };

  const graphOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return( 
    <div className='grid grid-cols-12'>
  <Line data={graphData} options={graphOptions} />
  </div>
  )
};

export default UserActivityGraph;
