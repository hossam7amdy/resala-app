import { configuration } from '@/configuration';
import { CloudFrontAdapter } from '@/infrastructure/cdn-provider';
import { S3Adapter } from '@/infrastructure/cloud-storage';
import { PaymobAdapter } from '@/infrastructure/payment-provider';
import { db } from '@/lib/db';

import { AddressService } from './address/address.service';
import { CategoryService } from './category/category.service';
import { ColorService } from './color/color.service';
import { DashboardService } from './dashboard/dashboard.service';
import { DiscountService } from './discount/discount.service';
import { EmailService } from './email/email.service';
import { MediaService } from './media/media.service';
import { OrderService, postOrderHandler } from './order';
import { PaymentService } from './payment/payment.service';
import { ProductService } from './product/product.service';
import { ReviewService } from './review/review.service';
import { ShoppingService } from './shopping/shopping.service';
import { SizeService } from './size/size.service';
import { StockService } from './stock/stock.service';
import { UserService } from './user/user.service';

const addressService = new AddressService(db);
const categoryService = new CategoryService(db);
const colorService = new ColorService(db);
const dashboardService = new DashboardService(db);
const discountService = new DiscountService(db);
const orderService = new OrderService(db);
const paymentService = new PaymentService(configuration(), new PaymobAdapter(configuration()));
const productService = new ProductService(db);
const reviewService = new ReviewService(db);
const shoppingService = new ShoppingService(db);
const sizeService = new SizeService(db);
const stockService = new StockService(db);
const userService = new UserService(db);
const emailService = new EmailService(configuration());
const mediaService = new MediaService(
  new S3Adapter({
    region: configuration().aws.region,
    accessKey: configuration().aws.accessKey,
    accessSecret: configuration().aws.accessSecret,
    bucketName: configuration().aws.s3.bucketName,
  }),
  new CloudFrontAdapter({ baseUrl: configuration().cdnBaseUrl })
);

export {
  addressService,
  categoryService,
  colorService,
  dashboardService,
  discountService,
  orderService,
  paymentService,
  productService,
  reviewService,
  shoppingService,
  sizeService,
  stockService,
  userService,
  emailService,
  mediaService,
  postOrderHandler,
};

export {
  AddressService,
  CategoryService,
  ColorService,
  DashboardService,
  DiscountService,
  OrderService,
  PaymentService,
  ProductService,
  ReviewService,
  ShoppingService,
  SizeService,
  StockService,
  UserService,
  EmailService,
  MediaService,
};
