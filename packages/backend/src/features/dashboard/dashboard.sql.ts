// TODO: `Temporary` this file should be and use native `TypedSQL` solution from prisma
// https://www.prisma.io/docs/orm/prisma-client/using-raw-sql
import type { Role } from '@prisma/client';

export type GetSalesTrend = {
  date: string;
  sales: number;
}[];
export const getSalesTrend = `
      SELECT 
        SUM(total) AS sales,
        to_char(created_at, 'YYYY-MM') AS date
      FROM "order"
      GROUP BY date
      ORDER BY date ASC
      LIMIT 12;
    `;

export type ListTopCustomers = {
  total_paid: number;
  total_orders: bigint | null;
  id: string;
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  name: string;
  first_name: string;
  last_name: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}[];
export const listTopCustomers = `
      SELECT
        o.total_paid,
        o.total_orders,
        u.*
      FROM "user" AS u
      JOIN (
          SELECT 
              user_id,
              SUM(total) AS total_paid,
              COUNT(*) AS total_orders
          FROM "order"
          GROUP BY 1
          ORDER BY 2 DESC
          LIMIT 10
          ) AS o
          ON (o.user_id = u.id)
      ORDER BY 1 DESC;
    `;
