import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieGraph({data}) {
  // console.log(data);
  if(data == null){
    data = {
      labels: [],
      datasets: [
        {
          label: 'No data availabe',
          data: [1],
          backgroundColor: ['#f2740550'],
          borderColor: ['#f27405'],
          borderWidth: 1,
        },
      ],
    };
  }
  return <Pie data={data} />;
}
