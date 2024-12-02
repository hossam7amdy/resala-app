import { dashboardService, productService, stockService } from '@/services';
import type {
  GetProductResponse,
  GetSalesTrendsResponse,
  ListProductsResponse,
  ListStocksResponse,
  ListTopProductsResponse,
} from '@resala/shared';
import type { Context } from 'hono';
import type { HandlerResponse } from 'hono/types';

// FIXME: should user `TypedResponse` instead of `HandlerResponse`

export const get = async (c: Context): Promise<HandlerResponse<GetProductResponse>> => {
  const productId = c.req.param('productId');

  const product = await productService.get(+productId);

  return c.json({ success: true, data: product });
};

export const list = async (c: Context): Promise<HandlerResponse<ListProductsResponse>> => {
  const page = c.req.query('page') || '1';
  const limit = c.req.query('limit') || '10';
  const search = c.req.query('search') || '';
  const categoryId = c.req.query('categoryId');

  const { products, pagination } = await productService.list({
    page: +page,
    limit: +limit,
    search,
    categoryId: categoryId ? +categoryId : undefined,
  });

  return c.json({ success: true, data: { pagination, products } });
};

export const listStocks = async (c: Context): Promise<HandlerResponse<ListStocksResponse>> => {
  const page = c.req.query('page') || '1';
  const limit = c.req.query('limit') || '10';
  const search = c.req.query('search') || '';
  const productId = c.req.query('productId');

  const { stocks, pagination } = await stockService.list({
    page: +page,
    limit: +limit,
    search,
    productId: productId ? +productId : undefined,
  });

  return c.json({ success: true, data: { stocks, pagination } });
};

export const listTopProducts = async (
  c: Context
): Promise<HandlerResponse<ListTopProductsResponse>> => {
  const products = await dashboardService.listTopProducts();

  return c.json({ success: true, data: products });
};

export const listSalesTrends = async (
  c: Context
): Promise<HandlerResponse<GetSalesTrendsResponse>> => {
  const trends = await dashboardService.getSalesTrend();

  return c.json({ success: true, data: { trends } });
};
