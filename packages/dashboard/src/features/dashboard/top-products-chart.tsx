'use client';

import type { ListTopProductsResponse } from '@resala/shared';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Top Selling Products',
    },
  },
};

interface TopProductsChartProps {
  products: ListTopProductsResponse['data'];
}
export const TopProductsChart: React.FC<TopProductsChartProps> = ({ products }) => {
  return (
    <Bar
      datasetIdKey="id"
      options={options}
      data={{
        labels: products.map(({ product }) => product.enName),
        datasets: [
          {
            data: products.map(({ unitsSold }) => unitsSold),
            label: 'Units sold',
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
