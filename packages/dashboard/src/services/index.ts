import { configuration } from '@/configuration';
import { S3StorageService } from '@/infrastructure/cloud-storage';
import { db } from '@/lib/db';

import { AddressService } from './address/address.service';
import { CategoryService } from './category/category.service';
import { ColorService } from './color/color.service';
import { DashboardService } from './dashboard/dashboard.service';
import { DiscountService } from './discount/discount.service';
import { EmailService } from './email';
import { ImageService } from './image/image.service';
import { MediaService } from './media/media.service';
import { OrderService } from './order/order.service';
import { PaymentService } from './payment/payment.service';
import { PaymobService } from './paymob';
import { ProductService } from './product/product.service';
import { ReviewService } from './review/review.service';
import { ShoppingService } from './shopping/shopping.service';
import { SizeService } from './size/size.service';
import { StockService } from './stock/stock.service';
import { UserService } from './user/user.service';

const paymobService = new PaymobService(configuration());
const addressService = new AddressService(db);
const categoryService = new CategoryService(db);
const colorService = new ColorService(db);
const dashboardService = new DashboardService(db);
const discountService = new DiscountService(db);
const imageService = new ImageService(db);
const orderService = new OrderService(db);
const paymentService = new PaymentService(configuration(), paymobService);
const productService = new ProductService(db);
const reviewService = new ReviewService(db);
const shoppingService = new ShoppingService(db);
const sizeService = new SizeService(db);
const stockService = new StockService(db);
const userService = new UserService(db);
const emailService = EmailService.getInstance(configuration());
const mediaService = new MediaService(
  db,
  new S3StorageService({
    region: configuration().aws.region,
    accessKey: configuration().aws.accessKey,
    accessSecret: configuration().aws.accessSecret,
    bucketName: configuration().aws.s3.bucketName,
    cdnBaseUrl: configuration().cdnBaseUrl,
  })
);

export {
  addressService,
  categoryService,
  colorService,
  dashboardService,
  discountService,
  imageService,
  orderService,
  paymentService,
  productService,
  reviewService,
  shoppingService,
  sizeService,
  stockService,
  userService,
  emailService,
  paymobService,
  mediaService,
};

export {
  AddressService,
  CategoryService,
  ColorService,
  DashboardService,
  DiscountService,
  ImageService,
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
