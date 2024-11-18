// TODO: `Temporary` this file should be and use native `TypedSQL` solution from prisma
// https://www.prisma.io/docs/orm/prisma-client/using-raw-sql
import type { RoleType } from '@resala/shared';

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

export type ListTopProducts = {
  units_sold: bigint | null;
  id: number;
  category_id: number;
  ar_name: string;
  en_name: string;
  ar_description: string;
  en_description: string;
  price: number;
  image_key: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}[];
export const listTopProducts = `
      SELECT
          t.units_sold,
          p.*
      FROM "product" p
      JOIN (
          SELECT 
              product_id,
              SUM(quantity) AS units_sold
          FROM "order_item"
          GROUP BY 1
          ORDER BY 2 DESC
          LIMIT 10
          ) AS t
          ON (t.product_id = p.id)
      ORDER BY 1 DESC;
    `;

export type ListTopCustomers = {
  total_paid: number;
  total_orders: bigint | null;
  id: string;
  email: string;
  is_email_verified: boolean;
  phone: string;
  is_phone_verified: boolean;
  first_name: string;
  last_name: string;
  role: RoleType;
  password: string;
  last_login: Date | null;
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
