'use client';

import type { GetSalesTrendsResponse } from '@resala/shared';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Sales Trends',
    },
  },
};

interface SalesTrendsChartProps {
  data: GetSalesTrendsResponse['data'];
}
export const SalesTrendsChart: React.FC<SalesTrendsChartProps> = ({ data }) => {
  return (
    <Line
      datasetIdKey="id"
      options={options}
      data={{
        labels: data.trends.map(({ date }) => date),
        datasets: [
          {
            data: data.trends.map(({ sales }) => sales),
            label: 'Sales',
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      }}
    />
  );
};
