import { configuration } from '@/configuration';
import { db } from '@/lib/db';

import { AddressService } from './address/address.service';
import { CategoryService } from './category/category.service';
import { ColorService } from './color/color.service';
import { DashboardService } from './dashboard/dashboard.service';
import { DiscountService } from './discount/discount.service';
import { EmailService } from './email';
import { ImageService } from './image/image.service';
import { OrderService } from './order/order.service';
import { PaymentService } from './payment/payment.service';
import { PaymobService } from './paymob';
import { ProductService } from './product/product.service';
import { ReviewService } from './review/review.service';
import { ShoppingService } from './shopping/shopping.service';
import { SizeService } from './size/size.service';
import { StockService } from './stock/stock.service';
import { FileStorage } from './storage';
import { UserService } from './user/user.service';

const addressService = new AddressService(db);
const categoryService = new CategoryService(db);
const colorService = new ColorService(db);
const dashboardService = new DashboardService(db);
const discountService = new DiscountService(db);
const imageService = new ImageService(db, FileStorage.getInstance(configuration()));
const orderService = new OrderService(db);
const paymentService = new PaymentService(new PaymobService(configuration()));
const productService = new ProductService(db, FileStorage.getInstance(configuration()));
const reviewService = new ReviewService(db);
const shoppingService = new ShoppingService(db);
const sizeService = new SizeService(db);
const stockService = new StockService(db);
const userService = new UserService(db);
const emailService = EmailService.getInstance(configuration());

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
};
