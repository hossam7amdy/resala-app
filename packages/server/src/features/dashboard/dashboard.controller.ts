import type {
  GetDashboardOverviewResponse,
  GetInventoryStatusResponse,
  GetOrdersStatusResponse,
  GetSalesTrendsResponse,
  ListCustomersFeedbackResponse,
  ListTopCustomersResponse,
  ListTopProductsResponse,
} from '@resala/shared';
import { Controller, Get, Middlewares, Route, Security, Tags } from 'tsoa/dist/index.js';

import { db } from '../../datastore/index.js';
import { jwtParse } from '../../middlewares/authentication.js';
import { authorizeRole } from '../../middlewares/authorization.js';
import { DashboardService } from './dashboard.service.js';

@Tags('Dashboard')
@Route('api/v1/dashboard')
@Middlewares([jwtParse])
export class DashboardController extends Controller {
  private readonly dashboardService: DashboardService;

  constructor() {
    super();
    this.dashboardService = new DashboardService(db);
  }

  /** * returns an overview of the store's performance data for the specified period of time (daily, weekly, or monthly), if omitted will return all data */
  @Get('overview')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async getOverview(): Promise<GetDashboardOverviewResponse> {
    const data = await this.dashboardService.getOverview();

    return { success: true, data };
  }

  /** * returns the list of top selling products for the specified period of time (daily, weekly, or monthly) */
  @Get('top-products')
  public async listTopProducts(): Promise<ListTopProductsResponse> {
    const data = await this.dashboardService.listTopProducts();

    return { success: true, data };
  }

  /** * returns the sales trend data for the specified period of time (daily, weekly, or monthly) */
  @Get('sales-trends')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async getSalesTrend(): Promise<GetSalesTrendsResponse> {
    const data = await this.dashboardService.getSalesTrend();

    return { success: true, data };
  }

  /** * returns the order status data for the specified period of time (daily, weekly, or monthly) */
  @Get('orders-status')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async getOrderStatus(): Promise<GetOrdersStatusResponse> {
    const data = await this.dashboardService.getOrderStatus();

    return { success: true, data };
  }

  /** * returns the inventory status data */
  @Get('inventory-status')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async getInventoryStatus(): Promise<GetInventoryStatusResponse> {
    const data = await this.dashboardService.getInventoryStatus();

    return { success: true, data };
  }

  /** * returns the list of customers' feedback */
  @Get('customers-feedback')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async listCustomersFeedback(): Promise<ListCustomersFeedbackResponse> {
    const data = await this.dashboardService.listCustomersFeedback();

    return { success: true, data };
  }

  /** * returns the list of top customers for the specified period of time (daily, weekly, or monthly) */
  @Get('top-customers')
  @Security('JWT_SECRET')
  @Middlewares([authorizeRole(['ADMIN', 'MODERATOR'])])
  public async listTopCustomers(): Promise<ListTopCustomersResponse> {
    const data = await this.dashboardService.listTopCustomers();

    return { success: true, data };
  }
}
