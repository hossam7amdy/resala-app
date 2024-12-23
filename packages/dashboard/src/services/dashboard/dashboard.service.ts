import type { DataStore } from '@/lib/db';
import type {
  GetDashboardOverviewResponse,
  GetInventoryStatusResponse,
  GetOrdersStatusResponse,
  GetSalesTrendsResponse,
  ListCustomersFeedbackResponse,
  ListTopCustomersResponse,
  ListTopProductsResponse,
} from '@resala/shared';

import { type GetSalesTrend, type ListTopCustomers, type ListTopProducts } from './dashboard.sql';

export class DashboardService {
  constructor(private readonly db: DataStore) {}

  async getOverview(): Promise<GetDashboardOverviewResponse['data']> {
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      totalSalesSum,
      totalRevenueSum,
      totalRefundSum,
    ] = await Promise.all([
      this.db.product.count(),
      this.db.order.count(),
      this.db.user.count({ where: { isAnonymous: null } }),
      this.db.order.aggregate({ _sum: { total: true } }),
      this.db.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: 'PAID' },
      }),
      this.db.order.aggregate({
        _sum: { total: true },
        where: {
          OR: [{ paymentStatus: 'VOIDED' }, { paymentStatus: 'REFUNDED' }],
        },
      }),
    ]);

    const totalSales = totalSalesSum._sum.total?.toNumber() ?? 0;
    const totalRevenue = totalRevenueSum._sum.total?.toNumber() ?? 0;
    const totalRefund = totalRefundSum._sum.total?.toNumber() ?? 0;

    return { totalProducts, totalOrders, totalCustomers, totalSales, totalRefund, totalRevenue };
  }

  async getSalesTrend(): Promise<GetSalesTrendsResponse['data']> {
    const trends = await this.db.$queryRaw<GetSalesTrend>`
        SELECT 
          SUM(total) AS sales,
          to_char(created_at, 'YYYY-MM') AS date
        FROM "order"
        GROUP BY date
        ORDER BY date ASC
        LIMIT 12;
    `;

    return { trends };
  }

  async getOrderStatus(): Promise<GetOrdersStatusResponse['data']> {
    const orders = await this.db.order.groupBy({
      by: ['orderStatus'],
      _count: { orderStatus: true },
    });

    const accValues = orders.reduce(
      (prev, order) => {
        switch (order.orderStatus) {
          case 'PENDING':
            prev.pending += order._count.orderStatus;
            break;
          case 'SHIPPED':
            prev.shipped += order._count.orderStatus;
            break;
          case 'DELIVERED':
            prev.delivered += order._count.orderStatus;
            break;
          case 'CANCELLED':
            prev.canceled += order._count.orderStatus;
            break;
          case 'FULFILLED':
            prev.fulfilled += order._count.orderStatus;
            break;
        }

        return prev;
      },
      { pending: 0, shipped: 0, delivered: 0, canceled: 0, fulfilled: 0 }
    );

    return accValues;
  }

  async getInventoryStatus(): Promise<GetInventoryStatusResponse['data']> {
    const lowStock = await this.db.stock.findMany({
      select: {
        quantity: true,
        product: {
          include: {
            media: true,
          },
        },
        color: true,
        size: true,
      },
      where: {
        quantity: { lte: 10, gt: 0 },
      },
      orderBy: { quantity: 'asc' },
      take: 10,
    });

    const outOfStock = await this.db.stock.findMany({
      select: {
        product: {
          include: {
            media: true,
          },
        },
        color: true,
        size: true,
      },
      where: {
        quantity: { equals: 0 },
      },
      take: 10,
    });

    return {
      lowStock: lowStock.map(({ product: { media, ...product }, quantity, ...stock }) => ({
        ...stock,
        stockRemaining: quantity,
        product: { ...product, imageUrl: media.url },
      })),
      outOfStock: outOfStock.map(({ product: { media, ...product }, ...stock }) => ({
        ...stock,
        stockRemaining: 0,
        product: { ...product, imageUrl: media.url },
      })),
    };
  }

  async listCustomersFeedback(): Promise<ListCustomersFeedbackResponse['data']> {
    const [averageRating, recentReviews] = await this.db.$transaction([
      this.db.review.aggregate({
        _avg: {
          rating: true,
        },
      }),
      this.db.review.findMany({
        include: {
          user: true,
          product: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      }),
    ]);

    return {
      averageRating: +(averageRating._avg.rating ?? 0),
      recentFeedback: recentReviews,
    };
  }

  async listTopProducts(): Promise<ListTopProductsResponse['data']> {
    const topProducts = await this.db.$queryRaw<ListTopProducts>`
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

    return topProducts.map(p => ({
      unitsSold: Number(p.units_sold?.toString() ?? 0),
      product: {
        id: p.id,
        categoryId: p.category_id,
        arName: p.ar_name,
        enName: p.en_name,
        price: p.price,
        arDescription: p.ar_description,
        enDescription: p.en_description,
        imageUrl: p.image_url,
        mediaId: p.image_key,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
      },
    }));
  }

  async listTopCustomers(): Promise<ListTopCustomersResponse['data']> {
    const topCustomers = await this.db.$queryRaw<ListTopCustomers>`
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

    return topCustomers.map(({ total_paid, total_orders, ...user }) => ({
      totalPaid: +(total_paid ?? 0),
      totalOrders: +(total_orders?.toString() ?? 0),
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        emailVerified: user.email_verified,
        emailMarketingState: 'not_subscribed', // default value, adjust as needed
        phoneNumber: user.phone_number,
        phoneNumberVerified: user.phone_number_verified,
        smsMarketingState: 'not_subscribed', // default value, adjust as needed
        role: user.role,
        birthDate: null, // optional field
      },
    }));
  }
}
