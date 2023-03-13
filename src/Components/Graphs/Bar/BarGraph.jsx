import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export default function BarGraph({data, display}) {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: display,
        },
        title: {
          display: true,
          text: 'Time spent (min)',
        },
      },
    };
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
  return <Bar options={options} data={data} />;
}
