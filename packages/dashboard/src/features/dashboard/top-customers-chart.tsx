'use client';

import type { ListTopCustomersResponse } from '@resala/shared';
import { Tabs, Typography } from 'antd';
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

interface TopCustomersChartProps {
  customers: ListTopCustomersResponse['data'];
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Top customers',
    },
  },
};

const TopPaidBarChart: React.FC<TopCustomersChartProps> = ({ customers }) => {
  return (
    <Bar
      options={options}
      data={{
        labels: customers?.map(({ user }) => `${user.firstName} ${user.lastName}`),
        datasets: [
          {
            data: customers?.map(({ totalPaid }) => totalPaid),
            label: 'Total paid',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }}
    />
  );
};

const TopOrdersBarChart: React.FC<TopCustomersChartProps> = ({ customers }) => {
  return (
    <Bar
      options={options}
      data={{
        labels: customers?.map(({ user }) => `${user.firstName} ${user.lastName}`),
        datasets: [
          {
            data: customers?.map(({ totalOrders }) => totalOrders).sort((a, b) => b - a),
            label: 'Total orders',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }}
    />
  );
};

export const TopCustomersChart: React.FC<TopCustomersChartProps> = ({ customers }) => {
  return (
    <Tabs
      size="small"
      type="card"
      tabBarExtraContent={<Typography.Text strong>Top customers</Typography.Text>}
      items={[
        {
          key: 'top-paid',
          label: 'Top paid',
          children: <TopPaidBarChart customers={customers} />,
        },
        {
          key: 'top-orders',
          label: 'Top orders',
          children: <TopOrdersBarChart customers={customers} />,
        },
      ]}
    />
  );
};
