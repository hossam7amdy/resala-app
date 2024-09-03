'use client';

import type { GetOrdersStatusResponse } from '@resala/shared';
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
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Orders Status',
    },
  },
};

interface OrdersStatusChartProps {
  orders: GetOrdersStatusResponse['data'];
}

const labels = ['Pending', 'Fulfilled', 'Shipped', 'Delivered', 'Canceled'];

export const OrderStatusChart: React.FC<OrdersStatusChartProps> = ({ orders }) => {
  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: '',
            data: [
              orders.pending,
              orders.fulfilled,
              orders.shipped,
              orders.delivered,
              orders.canceled,
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}
    />
  );
};
