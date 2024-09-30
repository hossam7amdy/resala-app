/* tslint:disable */

/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExpressTemplateService, TsoaRoute, fetchMiddlewares } from '@tsoa/runtime';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
import multer from 'multer';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AddressController } from './../features/address/address.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../features/auth/auth.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GoogleOAuthController } from './../features/auth/google-oauth.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoryController } from './../features/category/category.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ColorController } from './../features/color/color.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DashboardController } from './../features/dashboard/dashboard.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DiscountController } from './../features/discount/discount.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ImageController } from './../features/image/image.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrderController } from './../features/order/order.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PaymentController } from './../features/payment/payment.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductController } from './../features/product/product.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReviewController } from './../features/review/review.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ShoppingController } from './../features/shopping/shopping.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SizeController } from './../features/size/size.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StockController } from './../features/stock/stock.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../features/user/user.controller.js';
import { expressAuthentication } from './../middlewares/authentication.js';

const expressAuthenticationRecasted = expressAuthentication as (
  req: ExRequest,
  securityName: string,
  scopes?: string[],
  res?: ExResponse
) => Promise<any>;

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  DefaultResponseBody: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        message: { dataType: 'string' },
        success: { dataType: 'boolean', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RoleType: {
    dataType: 'refAlias',
    type: { dataType: 'enum', enums: ['ADMIN', 'CUSTOMER', 'MODERATOR'], validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  User: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        lastLogin: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'datetime' }],
          required: true,
        },
        role: { ref: 'RoleType', required: true },
        lastName: { dataType: 'string', required: true },
        firstName: { dataType: 'string', required: true },
        isPhoneVerified: { dataType: 'boolean', required: true },
        phone: { dataType: 'string', required: true },
        isEmailVerified: { dataType: 'boolean', required: true },
        email: { dataType: 'string', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetUserResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'User', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Pagination: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        total: { dataType: 'integer', required: true },
        limit: { dataType: 'integer', required: true },
        page: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListUsersResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                users: {
                  dataType: 'array',
                  array: { dataType: 'refAlias', ref: 'User' },
                  required: true,
                },
                pagination: { ref: 'Pagination', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteUserResponse: {
    dataType: 'refAlias',
    type: { ref: 'DefaultResponseBody', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateUserResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'User', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Product: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        imageUrl: { dataType: 'string', required: true },
        imageKey: { dataType: 'string', required: true },
        price: { dataType: 'any', required: true },
        enDescription: { dataType: 'string', required: true },
        arDescription: { dataType: 'string', required: true },
        enName: { dataType: 'string', required: true },
        arName: { dataType: 'string', required: true },
        categoryId: { dataType: 'integer', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Color: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        enName: { dataType: 'string', required: true },
        arName: { dataType: 'string', required: true },
        code: { dataType: 'string', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Stock.Exclude_keyofStock.id-or-colorId-or-productId__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        sizeId: { dataType: 'integer', required: true },
        quantity: { dataType: 'integer', required: true },
        createdAt: { dataType: 'datetime', required: true },
        updatedAt: { dataType: 'datetime', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Omit_Stock.id-or-colorId-or-productId_': {
    dataType: 'refAlias',
    type: { ref: 'Pick_Stock.Exclude_keyofStock.id-or-colorId-or-productId__', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Image.Exclude_keyofImage.colorId-or-productId__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        id: { dataType: 'integer', required: true },
        createdAt: { dataType: 'datetime', required: true },
        isPrimary: { dataType: 'boolean', required: true },
        imageKey: { dataType: 'string', required: true },
        imageUrl: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Omit_Image.colorId-or-productId_': {
    dataType: 'refAlias',
    type: { ref: 'Pick_Image.Exclude_keyofImage.colorId-or-productId__', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetStockResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                images: {
                  dataType: 'array',
                  array: { dataType: 'refAlias', ref: 'Omit_Image.colorId-or-productId_' },
                  required: true,
                },
                sizes: {
                  dataType: 'array',
                  array: {
                    dataType: 'intersection',
                    subSchemas: [
                      { ref: 'Omit_Stock.id-or-colorId-or-productId_' },
                      {
                        dataType: 'nestedObjectLiteral',
                        nestedProperties: {
                          size: { dataType: 'string', required: true },
                          stockId: { dataType: 'integer', required: true },
                        },
                      },
                    ],
                  },
                  required: true,
                },
                color: { ref: 'Color', required: true },
                product: { ref: 'Product', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListStocksResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                stocks: {
                  dataType: 'array',
                  array: {
                    dataType: 'nestedObjectLiteral',
                    nestedProperties: {
                      images: {
                        dataType: 'array',
                        array: { dataType: 'refAlias', ref: 'Omit_Image.colorId-or-productId_' },
                        required: true,
                      },
                      sizes: {
                        dataType: 'array',
                        array: {
                          dataType: 'intersection',
                          subSchemas: [
                            { ref: 'Omit_Stock.id-or-colorId-or-productId_' },
                            {
                              dataType: 'nestedObjectLiteral',
                              nestedProperties: {
                                size: { dataType: 'string', required: true },
                                stockId: { dataType: 'integer', required: true },
                              },
                            },
                          ],
                        },
                        required: true,
                      },
                      color: { ref: 'Color', required: true },
                      product: { ref: 'Product', required: true },
                    },
                  },
                  required: true,
                },
                pagination: { ref: 'Pagination', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Stock: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        quantity: { dataType: 'integer', required: true },
        sizeId: { dataType: 'integer', required: true },
        colorId: { dataType: 'integer', required: true },
        productId: { dataType: 'integer', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateStockResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Stock', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateStockResponse: {
    dataType: 'refAlias',
    type: { ref: 'CreateStockResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteStockResponse: {
    dataType: 'refAlias',
    type: { ref: 'CreateStockResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Size: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        name: { dataType: 'string', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetSizeResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Size', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListSizesResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'array',
              array: { dataType: 'refAlias', ref: 'Size' },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateSizeResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetSizeResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateSizeResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetSizeResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteSizeResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetSizeResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Cart: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        quantity: { dataType: 'integer', required: true },
        stockId: { dataType: 'integer', required: true },
        userId: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DiscountType: {
    dataType: 'refAlias',
    type: { dataType: 'enum', enums: ['PERCENTAGE', 'FIXED', 'BOGO', 'BULK'], validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Discount: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        endDate: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'datetime' }],
          required: true,
        },
        startDate: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'datetime' }],
          required: true,
        },
        isStoreWide: { dataType: 'boolean', required: true },
        isActive: { dataType: 'boolean', required: true },
        minQty: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'integer' }],
          required: true,
        },
        description: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'string' }],
          required: true,
        },
        amount: { dataType: 'any', required: true },
        type: { ref: 'DiscountType', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Image: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        createdAt: { dataType: 'datetime', required: true },
        imageUrl: { dataType: 'string', required: true },
        imageKey: { dataType: 'string', required: true },
        isPrimary: { dataType: 'boolean', required: true },
        productId: { dataType: 'integer', required: true },
        colorId: { dataType: 'integer', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetCartResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                items: {
                  dataType: 'array',
                  array: {
                    dataType: 'intersection',
                    subSchemas: [
                      { ref: 'Cart' },
                      {
                        dataType: 'nestedObjectLiteral',
                        nestedProperties: {
                          stock: {
                            dataType: 'intersection',
                            subSchemas: [
                              { ref: 'Stock' },
                              {
                                dataType: 'nestedObjectLiteral',
                                nestedProperties: {
                                  size: { ref: 'Size', required: true },
                                  color: { ref: 'Color', required: true },
                                },
                              },
                            ],
                            required: true,
                          },
                          images: {
                            dataType: 'array',
                            array: { dataType: 'refAlias', ref: 'Image' },
                            required: true,
                          },
                          product: { ref: 'Product', required: true },
                          appliedDiscount: { ref: 'Discount' },
                          discountedPrice: { dataType: 'integer' },
                        },
                      },
                    ],
                  },
                  required: true,
                },
                totalDiscount: { dataType: 'integer' },
                totalPrice: { dataType: 'integer', required: true },
                totalQuantity: { dataType: 'integer', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateCartResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetCartResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteCartResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetCartResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Wishlist.Exclude_keyofWishlist.productId__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        userId: { dataType: 'integer', required: true },
        createdAt: { dataType: 'datetime', required: true },
        updatedAt: { dataType: 'datetime', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Omit_Wishlist.productId_': {
    dataType: 'refAlias',
    type: { ref: 'Pick_Wishlist.Exclude_keyofWishlist.productId__', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetWishlistResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'array',
              array: {
                dataType: 'intersection',
                subSchemas: [
                  { ref: 'Omit_Wishlist.productId_' },
                  {
                    dataType: 'nestedObjectLiteral',
                    nestedProperties: { product: { ref: 'Product', required: true } },
                  },
                ],
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateWishlistResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetWishlistResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteWishlistResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetWishlistResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Review: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        comment: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'string' }],
          required: true,
        },
        rating: { dataType: 'integer', required: true },
        userId: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'integer' }],
          required: true,
        },
        productId: { dataType: 'integer', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateReviewResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Review', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateReviewResponse: {
    dataType: 'refAlias',
    type: { ref: 'CreateReviewResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteReviewResponse: {
    dataType: 'refAlias',
    type: { ref: 'CreateReviewResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetReviewResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'intersection',
              subSchemas: [
                { ref: 'Review' },
                {
                  dataType: 'nestedObjectLiteral',
                  nestedProperties: { user: { ref: 'User', required: true } },
                },
              ],
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListReviewsResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                reviews: {
                  dataType: 'array',
                  array: {
                    dataType: 'intersection',
                    subSchemas: [
                      { ref: 'Review' },
                      {
                        dataType: 'nestedObjectLiteral',
                        nestedProperties: { user: { ref: 'User', required: true } },
                      },
                    ],
                  },
                  required: true,
                },
                pagination: { ref: 'Pagination', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Category: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        enName: { dataType: 'string', required: true },
        arName: { dataType: 'string', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetProductResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'intersection',
              subSchemas: [
                { ref: 'Product' },
                {
                  dataType: 'nestedObjectLiteral',
                  nestedProperties: {
                    discounts: {
                      dataType: 'array',
                      array: { dataType: 'refAlias', ref: 'Discount' },
                      required: true,
                    },
                    category: { ref: 'Category', required: true },
                    avgRating: { dataType: 'integer', required: true },
                  },
                },
              ],
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListProductsResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                pagination: { ref: 'Pagination', required: true },
                products: {
                  dataType: 'array',
                  array: {
                    dataType: 'intersection',
                    subSchemas: [
                      { ref: 'Product' },
                      {
                        dataType: 'nestedObjectLiteral',
                        nestedProperties: {
                          discounts: {
                            dataType: 'array',
                            array: { dataType: 'refAlias', ref: 'Discount' },
                            required: true,
                          },
                          category: { ref: 'Category', required: true },
                          avgRating: { dataType: 'integer', required: true },
                        },
                      },
                    ],
                  },
                  required: true,
                },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateProductResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Product', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateProductResponse: {
    dataType: 'refAlias',
    type: { ref: 'CreateProductResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteProductResponse: {
    dataType: 'refAlias',
    type: { ref: 'CreateProductResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetPaymentResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                created_at: { dataType: 'string', required: true },
                has_parent_transaction: { dataType: 'boolean', required: true },
                profile_id: { dataType: 'integer', required: true },
                integration_id: { dataType: 'integer', required: true },
                is_3d_secure: { dataType: 'boolean', required: true },
                is_refunded: { dataType: 'boolean', required: true },
                is_voided: { dataType: 'boolean', required: true },
                is_standalone_payment: { dataType: 'boolean', required: true },
                is_capture: { dataType: 'boolean', required: true },
                is_auth: { dataType: 'boolean', required: true },
                success: { dataType: 'boolean', required: true },
                amount_cents: { dataType: 'integer', required: true },
                pending: { dataType: 'boolean', required: true },
                id: { dataType: 'integer', required: true },
              },
              additionalProperties: { dataType: 'any' },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateOrderResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: { paymentUrl: { dataType: 'string', required: true } },
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  OrderStatusType: {
    dataType: 'refAlias',
    type: {
      dataType: 'enum',
      enums: ['PENDING', 'FULFILLED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PaymentMethodType: {
    dataType: 'refAlias',
    type: { dataType: 'enum', enums: ['CARD', 'CASH'], validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PaymentStatusType: {
    dataType: 'refAlias',
    type: {
      dataType: 'enum',
      enums: ['UNPAID', 'PAID', 'FAILED', 'VOIDED', 'REFUNDED'],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Order: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        note: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'string' }],
          required: true,
        },
        paymentStatus: { ref: 'PaymentStatusType', required: true },
        paymentMethod: { ref: 'PaymentMethodType', required: true },
        transactionId: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'string' }],
          required: true,
        },
        orderStatus: { ref: 'OrderStatusType', required: true },
        total: { dataType: 'any', required: true },
        discount: { dataType: 'any', required: true },
        subtotal: { dataType: 'any', required: true },
        userId: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'integer' }],
          required: true,
        },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  OrderItem: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        quantity: { dataType: 'integer', required: true },
        price: { dataType: 'any', required: true },
        stockId: { dataType: 'integer', required: true },
        productId: { dataType: 'integer', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Shipping.Exclude_keyofShipping.addressId-or-orderId__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        id: { dataType: 'integer', required: true },
        createdAt: { dataType: 'datetime', required: true },
        updatedAt: { dataType: 'datetime', required: true },
        cost: { dataType: 'any', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Omit_Shipping.addressId-or-orderId_': {
    dataType: 'refAlias',
    type: { ref: 'Pick_Shipping.Exclude_keyofShipping.addressId-or-orderId__', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Address: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        updatedAt: { dataType: 'datetime', required: true },
        createdAt: { dataType: 'datetime', required: true },
        lastName: { dataType: 'string', required: true },
        firstName: { dataType: 'string', required: true },
        phone: { dataType: 'string', required: true },
        address: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'string' }],
          required: true,
        },
        floor: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'integer' }],
          required: true,
        },
        building: {
          dataType: 'union',
          subSchemas: [{ dataType: 'enum', enums: [null] }, { dataType: 'string' }],
          required: true,
        },
        street: { dataType: 'string', required: true },
        city: { dataType: 'string', required: true },
        state: { dataType: 'string', required: true },
        country: { dataType: 'string', required: true },
        id: { dataType: 'integer', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetOrderResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'intersection',
              subSchemas: [
                { ref: 'Order' },
                {
                  dataType: 'nestedObjectLiteral',
                  nestedProperties: {
                    shippingDetails: {
                      dataType: 'union',
                      subSchemas: [
                        {
                          dataType: 'intersection',
                          subSchemas: [
                            { ref: 'Omit_Shipping.addressId-or-orderId_' },
                            {
                              dataType: 'nestedObjectLiteral',
                              nestedProperties: { address: { ref: 'Address', required: true } },
                            },
                          ],
                        },
                        { dataType: 'enum', enums: [null] },
                      ],
                      required: true,
                    },
                    orderItems: {
                      dataType: 'array',
                      array: {
                        dataType: 'intersection',
                        subSchemas: [
                          { ref: 'OrderItem' },
                          {
                            dataType: 'nestedObjectLiteral',
                            nestedProperties: {
                              size: { dataType: 'string', required: true },
                              color: { dataType: 'string', required: true },
                              product: { ref: 'Product', required: true },
                            },
                          },
                        ],
                      },
                      required: true,
                    },
                    user: { ref: 'User', required: true },
                  },
                },
              ],
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListOrdersResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                orders: {
                  dataType: 'array',
                  array: {
                    dataType: 'intersection',
                    subSchemas: [
                      { ref: 'Order' },
                      {
                        dataType: 'nestedObjectLiteral',
                        nestedProperties: {
                          shippingDetails: {
                            dataType: 'union',
                            subSchemas: [
                              {
                                dataType: 'intersection',
                                subSchemas: [
                                  { ref: 'Omit_Shipping.addressId-or-orderId_' },
                                  {
                                    dataType: 'nestedObjectLiteral',
                                    nestedProperties: {
                                      address: { ref: 'Address', required: true },
                                    },
                                  },
                                ],
                              },
                              { dataType: 'enum', enums: [null] },
                            ],
                            required: true,
                          },
                          orderItems: {
                            dataType: 'array',
                            array: {
                              dataType: 'intersection',
                              subSchemas: [
                                { ref: 'OrderItem' },
                                {
                                  dataType: 'nestedObjectLiteral',
                                  nestedProperties: {
                                    size: { dataType: 'string', required: true },
                                    color: { dataType: 'string', required: true },
                                    product: { ref: 'Product', required: true },
                                  },
                                },
                              ],
                            },
                            required: true,
                          },
                          user: { ref: 'User', required: true },
                        },
                      },
                    ],
                  },
                  required: true,
                },
                pagination: { ref: 'Pagination', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteOrderResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Order', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateOrderResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Order', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListImagesResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'array',
              array: { dataType: 'refAlias', ref: 'Image' },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateImageResponse: {
    dataType: 'refAlias',
    type: { ref: 'DefaultResponseBody', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateImageResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Image', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetDiscountResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'intersection',
              subSchemas: [
                { ref: 'Discount' },
                {
                  dataType: 'nestedObjectLiteral',
                  nestedProperties: {
                    products: {
                      dataType: 'array',
                      array: { dataType: 'refAlias', ref: 'Product' },
                      required: true,
                    },
                    pagination: { ref: 'Pagination', required: true },
                  },
                },
              ],
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListDiscountsResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                pagination: { ref: 'Pagination', required: true },
                discounts: {
                  dataType: 'array',
                  array: { dataType: 'refAlias', ref: 'Discount' },
                  required: true,
                },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateDiscountResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Discount', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateDiscountResponse: {
    dataType: 'refAlias',
    type: { ref: 'CreateDiscountResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteDiscountResponse: {
    dataType: 'refAlias',
    type: { ref: 'CreateDiscountResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetDashboardOverviewResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                totalRevenue: { dataType: 'integer', required: true },
                totalRefund: { dataType: 'integer', required: true },
                totalSales: { dataType: 'integer', required: true },
                totalCustomers: { dataType: 'integer', required: true },
                totalOrders: { dataType: 'integer', required: true },
                totalProducts: { dataType: 'integer', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListTopProductsResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'array',
              array: {
                dataType: 'nestedObjectLiteral',
                nestedProperties: {
                  product: { ref: 'Product', required: true },
                  unitsSold: { dataType: 'integer', required: true },
                },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetSalesTrendsResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                trends: {
                  dataType: 'array',
                  array: {
                    dataType: 'nestedObjectLiteral',
                    nestedProperties: {
                      sales: { dataType: 'integer', required: true },
                      date: { dataType: 'string', required: true },
                    },
                  },
                  required: true,
                },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetOrdersStatusResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                fulfilled: { dataType: 'integer', required: true },
                canceled: { dataType: 'integer', required: true },
                delivered: { dataType: 'integer', required: true },
                shipped: { dataType: 'integer', required: true },
                pending: { dataType: 'integer', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetInventoryStatusResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                outOfStock: {
                  dataType: 'array',
                  array: {
                    dataType: 'nestedObjectLiteral',
                    nestedProperties: {
                      size: { ref: 'Size', required: true },
                      color: { ref: 'Color', required: true },
                      product: { ref: 'Product', required: true },
                    },
                  },
                  required: true,
                },
                lowStock: {
                  dataType: 'array',
                  array: {
                    dataType: 'nestedObjectLiteral',
                    nestedProperties: {
                      size: { ref: 'Size', required: true },
                      color: { ref: 'Color', required: true },
                      product: { ref: 'Product', required: true },
                      stockRemaining: { dataType: 'integer', required: true },
                    },
                  },
                  required: true,
                },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListCustomersFeedbackResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                recentFeedback: {
                  dataType: 'array',
                  array: {
                    dataType: 'intersection',
                    subSchemas: [
                      { ref: 'Review' },
                      {
                        dataType: 'nestedObjectLiteral',
                        nestedProperties: {
                          product: { ref: 'Product', required: true },
                          user: { ref: 'User', required: true },
                        },
                      },
                    ],
                  },
                  required: true,
                },
                averageRating: { dataType: 'integer', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListTopCustomersResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'array',
              array: {
                dataType: 'nestedObjectLiteral',
                nestedProperties: {
                  user: { ref: 'User', required: true },
                  totalOrders: { dataType: 'integer', required: true },
                  totalPaid: { dataType: 'integer', required: true },
                },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetColorResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Color', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListColorsResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'array',
              array: { dataType: 'refAlias', ref: 'Color' },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateColorResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetColorResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateColorResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetColorResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteColorResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetColorResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetCategoryResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Category', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListCategoriesResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'array',
              array: { dataType: 'refAlias', ref: 'Category' },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateCategoryResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetCategoryResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateCategoryResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetCategoryResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteCategoryResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetCategoryResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  LoginResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                user: { ref: 'User', required: true },
                refreshToken: { dataType: 'string', required: true },
                accessToken: { dataType: 'string', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RegisterResponse: {
    dataType: 'refAlias',
    type: { ref: 'DefaultResponseBody', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  RefreshTokenResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'nestedObjectLiteral',
              nestedProperties: {
                refreshToken: { dataType: 'string', required: true },
                accessToken: { dataType: 'string', required: true },
              },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  VerifyEmailResponse: {
    dataType: 'refAlias',
    type: { ref: 'DefaultResponseBody', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ForgotPasswordResponse: {
    dataType: 'refAlias',
    type: { ref: 'DefaultResponseBody', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ResetPasswordResponse: {
    dataType: 'refAlias',
    type: { ref: 'DefaultResponseBody', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ChangePasswordResponse: {
    dataType: 'refAlias',
    type: { ref: 'DefaultResponseBody', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ResendVerificationEmailResponse: {
    dataType: 'refAlias',
    type: { ref: 'DefaultResponseBody', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ListAddressResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            data: {
              dataType: 'array',
              array: { dataType: 'refAlias', ref: 'Address' },
              required: true,
            },
          },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GetAddressResponse: {
    dataType: 'refAlias',
    type: {
      dataType: 'intersection',
      subSchemas: [
        { ref: 'DefaultResponseBody' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { data: { ref: 'Address', required: true } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateAddressResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetAddressResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateAddressResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetAddressResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  DeleteAddressResponse: {
    dataType: 'refAlias',
    type: { ref: 'GetAddressResponse', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: 'throw-on-extras',
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router, opts?: { multer?: ReturnType<typeof multer> }) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const upload = opts?.multer || multer({ limits: { fileSize: 8388608 } });

  app.get(
    '/api/v1/users/:userId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.getUser),

    async function UserController_getUser(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        userId: { in: 'path', name: 'userId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: 'getUser',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/users',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.listUsers),

    async function UserController_listUsers(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        page: { default: 1, in: 'query', name: 'page', dataType: 'integer' },
        limit: { default: 10, in: 'query', name: 'limit', dataType: 'integer' },
        search: { in: 'query', name: 'search', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: 'listUsers',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/users/:userId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser),

    async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        userId: { in: 'path', name: 'userId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: 'deleteUser',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/users/:userId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser),

    async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        userId: { in: 'path', name: 'userId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            role: {
              dataType: 'union',
              subSchemas: [
                { dataType: 'enum', enums: ['ADMIN'] },
                { dataType: 'enum', enums: ['CUSTOMER'] },
                { dataType: 'enum', enums: ['MODERATOR'] },
              ],
            },
            lastName: { dataType: 'string' },
            firstName: { dataType: 'string' },
            phone: { dataType: 'string' },
            isVerified: { dataType: 'boolean' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: 'updateUser',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/stocks/:stockId',
    ...fetchMiddlewares<RequestHandler>(StockController),
    ...fetchMiddlewares<RequestHandler>(StockController.prototype.get),

    async function StockController_get(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        stockId: { in: 'path', name: 'stockId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new StockController();

        await templateService.apiHandler({
          methodName: 'get',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/stocks',
    ...fetchMiddlewares<RequestHandler>(StockController),
    ...fetchMiddlewares<RequestHandler>(StockController.prototype.list),

    async function StockController_list(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        page: { default: 1, in: 'query', name: 'page', dataType: 'integer' },
        limit: { default: 10, in: 'query', name: 'limit', dataType: 'integer' },
        search: { in: 'query', name: 'search', dataType: 'string' },
        productId: { in: 'query', name: 'productId', dataType: 'integer' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new StockController();

        await templateService.apiHandler({
          methodName: 'list',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/stocks',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(StockController),
    ...fetchMiddlewares<RequestHandler>(StockController.prototype.create),

    async function StockController_create(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            quantity: { dataType: 'integer' },
            sizeId: { dataType: 'integer' },
            productId: { dataType: 'integer' },
            colorId: { dataType: 'integer' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new StockController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/stocks/:stockId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(StockController),
    ...fetchMiddlewares<RequestHandler>(StockController.prototype.update),

    async function StockController_update(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        stockId: { in: 'path', name: 'stockId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            quantity: { dataType: 'integer' },
            sizeId: { dataType: 'integer' },
            productId: { dataType: 'integer' },
            colorId: { dataType: 'integer' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new StockController();

        await templateService.apiHandler({
          methodName: 'update',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/stocks/:stockId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(StockController),
    ...fetchMiddlewares<RequestHandler>(StockController.prototype.delete),

    async function StockController_delete(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        stockId: { in: 'path', name: 'stockId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new StockController();

        await templateService.apiHandler({
          methodName: 'delete',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/sizes/:sizeId',
    ...fetchMiddlewares<RequestHandler>(SizeController),
    ...fetchMiddlewares<RequestHandler>(SizeController.prototype.get),

    async function SizeController_get(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        sizeId: { in: 'path', name: 'sizeId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new SizeController();

        await templateService.apiHandler({
          methodName: 'get',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/sizes',
    ...fetchMiddlewares<RequestHandler>(SizeController),
    ...fetchMiddlewares<RequestHandler>(SizeController.prototype.list),

    async function SizeController_list(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new SizeController();

        await templateService.apiHandler({
          methodName: 'list',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/sizes',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(SizeController),
    ...fetchMiddlewares<RequestHandler>(SizeController.prototype.create),

    async function SizeController_create(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: {
          in: 'body',
          name: 'req',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { name: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new SizeController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/sizes/:sizeId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(SizeController),
    ...fetchMiddlewares<RequestHandler>(SizeController.prototype.update),

    async function SizeController_update(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        sizeId: { in: 'path', name: 'sizeId', required: true, dataType: 'string' },
        req: {
          in: 'body',
          name: 'req',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { name: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new SizeController();

        await templateService.apiHandler({
          methodName: 'update',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/sizes/:sizeId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(SizeController),
    ...fetchMiddlewares<RequestHandler>(SizeController.prototype.delete),

    async function SizeController_delete(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        sizeId: { in: 'path', name: 'sizeId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new SizeController();

        await templateService.apiHandler({
          methodName: 'delete',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/cart',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ShoppingController),
    ...fetchMiddlewares<RequestHandler>(ShoppingController.prototype.getCart),

    async function ShoppingController_getCart(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ShoppingController();

        await templateService.apiHandler({
          methodName: 'getCart',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/cart/items',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ShoppingController),
    ...fetchMiddlewares<RequestHandler>(ShoppingController.prototype.addItemToCart),

    async function ShoppingController_addItemToCart(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { stockId: { dataType: 'integer' }, quantity: { dataType: 'integer' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ShoppingController();

        await templateService.apiHandler({
          methodName: 'addItemToCart',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/cart/items/:stockId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ShoppingController),
    ...fetchMiddlewares<RequestHandler>(ShoppingController.prototype.removeItemFromCart),

    async function ShoppingController_removeItemFromCart(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        stockId: { in: 'path', name: 'stockId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ShoppingController();

        await templateService.apiHandler({
          methodName: 'removeItemFromCart',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/cart',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ShoppingController),
    ...fetchMiddlewares<RequestHandler>(ShoppingController.prototype.clearCart),

    async function ShoppingController_clearCart(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ShoppingController();

        await templateService.apiHandler({
          methodName: 'clearCart',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/wishlist',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ShoppingController),
    ...fetchMiddlewares<RequestHandler>(ShoppingController.prototype.getWishlist),

    async function ShoppingController_getWishlist(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ShoppingController();

        await templateService.apiHandler({
          methodName: 'getWishlist',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/wishlist/items',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ShoppingController),
    ...fetchMiddlewares<RequestHandler>(ShoppingController.prototype.addProductToWishlist),

    async function ShoppingController_addProductToWishlist(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { productId: { dataType: 'integer' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ShoppingController();

        await templateService.apiHandler({
          methodName: 'addProductToWishlist',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/wishlist/items/:productId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ShoppingController),
    ...fetchMiddlewares<RequestHandler>(ShoppingController.prototype.removeProductFromWishlist),

    async function ShoppingController_removeProductFromWishlist(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        productId: { in: 'path', name: 'productId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ShoppingController();

        await templateService.apiHandler({
          methodName: 'removeProductFromWishlist',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/wishlist',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ShoppingController),
    ...fetchMiddlewares<RequestHandler>(ShoppingController.prototype.clearWishlist),

    async function ShoppingController_clearWishlist(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ShoppingController();

        await templateService.apiHandler({
          methodName: 'clearWishlist',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/reviews',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ReviewController),
    ...fetchMiddlewares<RequestHandler>(ReviewController.prototype.createReview),

    async function ReviewController_createReview(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            comment: { dataType: 'string' },
            rating: { dataType: 'integer' },
            productId: { dataType: 'integer' },
            userId: { dataType: 'integer' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ReviewController();

        await templateService.apiHandler({
          methodName: 'createReview',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/reviews/:reviewId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ReviewController),
    ...fetchMiddlewares<RequestHandler>(ReviewController.prototype.updateReview),

    async function ReviewController_updateReview(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        reviewId: { in: 'path', name: 'reviewId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            comment: { dataType: 'string' },
            rating: { dataType: 'integer' },
            productId: { dataType: 'integer' },
            userId: { dataType: 'integer' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ReviewController();

        await templateService.apiHandler({
          methodName: 'updateReview',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/reviews/:reviewId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ReviewController),
    ...fetchMiddlewares<RequestHandler>(ReviewController.prototype.deleteReview),

    async function ReviewController_deleteReview(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        reviewId: { in: 'path', name: 'reviewId', required: true, dataType: 'string' },
        query: {
          in: 'queries',
          name: 'query',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { userId: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ReviewController();

        await templateService.apiHandler({
          methodName: 'deleteReview',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/reviews/:reviewId',
    ...fetchMiddlewares<RequestHandler>(ReviewController),
    ...fetchMiddlewares<RequestHandler>(ReviewController.prototype.getReview),

    async function ReviewController_getReview(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        reviewId: { in: 'path', name: 'reviewId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ReviewController();

        await templateService.apiHandler({
          methodName: 'getReview',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/reviews',
    ...fetchMiddlewares<RequestHandler>(ReviewController),
    ...fetchMiddlewares<RequestHandler>(ReviewController.prototype.listReviews),

    async function ReviewController_listReviews(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        page: { default: 1, in: 'query', name: 'page', dataType: 'integer' },
        limit: { default: 10, in: 'query', name: 'limit', dataType: 'integer' },
        productId: { in: 'query', name: 'productId', required: true, dataType: 'integer' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ReviewController();

        await templateService.apiHandler({
          methodName: 'listReviews',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/products/:productId',
    ...fetchMiddlewares<RequestHandler>(ProductController),
    ...fetchMiddlewares<RequestHandler>(ProductController.prototype.get),

    async function ProductController_get(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        productId: { in: 'path', name: 'productId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ProductController();

        await templateService.apiHandler({
          methodName: 'get',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/products',
    ...fetchMiddlewares<RequestHandler>(ProductController),
    ...fetchMiddlewares<RequestHandler>(ProductController.prototype.list),

    async function ProductController_list(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        page: { default: 1, in: 'query', name: 'page', dataType: 'integer' },
        limit: { default: 10, in: 'query', name: 'limit', dataType: 'integer' },
        search: { in: 'query', name: 'search', dataType: 'string' },
        categoryId: { in: 'query', name: 'categoryId', dataType: 'integer' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ProductController();

        await templateService.apiHandler({
          methodName: 'list',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/products',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    upload.fields([{ name: 'image', maxCount: 1 }]),
    ...fetchMiddlewares<RequestHandler>(ProductController),
    ...fetchMiddlewares<RequestHandler>(ProductController.prototype.create),

    async function ProductController_create(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        categoryId: { in: 'formData', name: 'categoryId', required: true, dataType: 'string' },
        arName: { in: 'formData', name: 'arName', required: true, dataType: 'string' },
        enName: { in: 'formData', name: 'enName', required: true, dataType: 'string' },
        arDescription: {
          in: 'formData',
          name: 'arDescription',
          required: true,
          dataType: 'string',
        },
        enDescription: {
          in: 'formData',
          name: 'enDescription',
          required: true,
          dataType: 'string',
        },
        price: { in: 'formData', name: 'price', required: true, dataType: 'string' },
        image: { in: 'formData', name: 'image', required: true, dataType: 'file' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ProductController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/products/:productId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    upload.fields([{ name: 'image', maxCount: 1 }]),
    ...fetchMiddlewares<RequestHandler>(ProductController),
    ...fetchMiddlewares<RequestHandler>(ProductController.prototype.update),

    async function ProductController_update(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        productId: { in: 'path', name: 'productId', required: true, dataType: 'string' },
        categoryId: { in: 'formData', name: 'categoryId', required: true, dataType: 'string' },
        arName: { in: 'formData', name: 'arName', required: true, dataType: 'string' },
        enName: { in: 'formData', name: 'enName', required: true, dataType: 'string' },
        arDescription: {
          in: 'formData',
          name: 'arDescription',
          required: true,
          dataType: 'string',
        },
        enDescription: {
          in: 'formData',
          name: 'enDescription',
          required: true,
          dataType: 'string',
        },
        price: { in: 'formData', name: 'price', required: true, dataType: 'string' },
        image: { in: 'formData', name: 'image', dataType: 'file' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ProductController();

        await templateService.apiHandler({
          methodName: 'update',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/products/:productId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ProductController),
    ...fetchMiddlewares<RequestHandler>(ProductController.prototype.delete),

    async function ProductController_delete(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        productId: { in: 'path', name: 'productId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ProductController();

        await templateService.apiHandler({
          methodName: 'delete',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/payments/:transactionId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(PaymentController),
    ...fetchMiddlewares<RequestHandler>(PaymentController.prototype.get),

    async function PaymentController_get(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        transactionId: { in: 'path', name: 'transactionId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new PaymentController();

        await templateService.apiHandler({
          methodName: 'get',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/payments/void',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(PaymentController),
    ...fetchMiddlewares<RequestHandler>(PaymentController.prototype.void),

    async function PaymentController_void(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { transactionId: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new PaymentController();

        await templateService.apiHandler({
          methodName: 'void',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/payments/refund',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(PaymentController),
    ...fetchMiddlewares<RequestHandler>(PaymentController.prototype.refund),

    async function PaymentController_refund(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            amount: { dataType: 'integer' },
            transactionId: { dataType: 'string' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new PaymentController();

        await templateService.apiHandler({
          methodName: 'refund',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/orders',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(OrderController),
    ...fetchMiddlewares<RequestHandler>(OrderController.prototype.create),

    async function OrderController_create(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            addressId: { dataType: 'integer' },
            note: { dataType: 'string' },
            paymentMethod: {
              dataType: 'union',
              subSchemas: [
                { dataType: 'enum', enums: ['CARD'] },
                { dataType: 'enum', enums: ['CASH'] },
              ],
            },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new OrderController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/orders/:orderId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(OrderController),
    ...fetchMiddlewares<RequestHandler>(OrderController.prototype.get),

    async function OrderController_get(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        orderId: { in: 'path', name: 'orderId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new OrderController();

        await templateService.apiHandler({
          methodName: 'get',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/orders',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(OrderController),
    ...fetchMiddlewares<RequestHandler>(OrderController.prototype.list),

    async function OrderController_list(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        page: { default: 1, in: 'query', name: 'page', dataType: 'integer' },
        limit: { default: 10, in: 'query', name: 'limit', dataType: 'integer' },
        search: { in: 'query', name: 'search', dataType: 'string' },
        userId: { in: 'query', name: 'userId', dataType: 'integer' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new OrderController();

        await templateService.apiHandler({
          methodName: 'list',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/orders/:orderId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(OrderController),
    ...fetchMiddlewares<RequestHandler>(OrderController.prototype.delete),

    async function OrderController_delete(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        orderId: { in: 'path', name: 'orderId', required: true, dataType: 'string' },
        _: {
          in: 'queries',
          name: '_',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { userId: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new OrderController();

        await templateService.apiHandler({
          methodName: 'delete',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    '/api/v1/orders/:orderId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(OrderController),
    ...fetchMiddlewares<RequestHandler>(OrderController.prototype.updateStatus),

    async function OrderController_updateStatus(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        orderId: { in: 'path', name: 'orderId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            paymentStatus: {
              dataType: 'union',
              subSchemas: [
                { dataType: 'enum', enums: ['UNPAID'] },
                { dataType: 'enum', enums: ['PAID'] },
                { dataType: 'enum', enums: ['FAILED'] },
                { dataType: 'enum', enums: ['VOIDED'] },
                { dataType: 'enum', enums: ['REFUNDED'] },
              ],
            },
            orderStatus: {
              dataType: 'union',
              subSchemas: [
                { dataType: 'enum', enums: ['PENDING'] },
                { dataType: 'enum', enums: ['FULFILLED'] },
                { dataType: 'enum', enums: ['SHIPPED'] },
                { dataType: 'enum', enums: ['DELIVERED'] },
                { dataType: 'enum', enums: ['CANCELLED'] },
              ],
            },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new OrderController();

        await templateService.apiHandler({
          methodName: 'updateStatus',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/images',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ImageController),
    ...fetchMiddlewares<RequestHandler>(ImageController.prototype.list),

    async function ImageController_list(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        query: {
          in: 'queries',
          name: 'query',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            productId: { dataType: 'integer' },
            colorId: { dataType: 'integer' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ImageController();

        await templateService.apiHandler({
          methodName: 'list',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/images',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    upload.fields([{ name: 'images' }]),
    ...fetchMiddlewares<RequestHandler>(ImageController),
    ...fetchMiddlewares<RequestHandler>(ImageController.prototype.create),

    async function ImageController_create(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        colorId: { in: 'formData', name: 'colorId', required: true, dataType: 'string' },
        productId: { in: 'formData', name: 'productId', required: true, dataType: 'string' },
        images: {
          in: 'formData',
          name: 'images',
          required: true,
          dataType: 'array',
          array: { dataType: 'file' },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ImageController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    '/api/v1/images/:imageId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ImageController),
    ...fetchMiddlewares<RequestHandler>(ImageController.prototype.update),

    async function ImageController_update(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        imageId: { in: 'path', name: 'imageId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { isPrimary: { dataType: 'boolean' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ImageController();

        await templateService.apiHandler({
          methodName: 'update',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/images/:imageId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ImageController),
    ...fetchMiddlewares<RequestHandler>(ImageController.prototype.delete),

    async function ImageController_delete(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        imageId: { in: 'path', name: 'imageId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ImageController();

        await templateService.apiHandler({
          methodName: 'delete',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/discounts/:discountId',
    ...fetchMiddlewares<RequestHandler>(DiscountController),
    ...fetchMiddlewares<RequestHandler>(DiscountController.prototype.get),

    async function DiscountController_get(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        discountId: { in: 'path', name: 'discountId', required: true, dataType: 'string' },
        queries: {
          in: 'queries',
          name: 'queries',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { limit: { dataType: 'integer' }, page: { dataType: 'integer' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DiscountController();

        await templateService.apiHandler({
          methodName: 'get',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/discounts',
    ...fetchMiddlewares<RequestHandler>(DiscountController),
    ...fetchMiddlewares<RequestHandler>(DiscountController.prototype.list),

    async function DiscountController_list(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        query: {
          in: 'queries',
          name: 'query',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            endDate: { dataType: 'string' },
            startDate: { dataType: 'string' },
            isStoreWide: { dataType: 'boolean' },
            isActive: { dataType: 'boolean' },
            limit: { dataType: 'integer' },
            page: { dataType: 'integer' },
            type: {
              dataType: 'union',
              subSchemas: [
                { dataType: 'enum', enums: ['PERCENTAGE'] },
                { dataType: 'enum', enums: ['FIXED'] },
                { dataType: 'enum', enums: ['BOGO'] },
                { dataType: 'enum', enums: ['BULK'] },
              ],
            },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DiscountController();

        await templateService.apiHandler({
          methodName: 'list',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/discounts',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DiscountController),
    ...fetchMiddlewares<RequestHandler>(DiscountController.prototype.create),

    async function DiscountController_create(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            productIds: { dataType: 'array', array: { dataType: 'integer' } },
            minQty: { dataType: 'integer' },
            description: { dataType: 'string' },
            endDate: { dataType: 'string' },
            startDate: { dataType: 'string' },
            isStoreWide: { dataType: 'boolean' },
            isActive: { dataType: 'boolean' },
            amount: { dataType: 'integer' },
            type: {
              dataType: 'union',
              subSchemas: [
                { dataType: 'enum', enums: ['PERCENTAGE'] },
                { dataType: 'enum', enums: ['FIXED'] },
                { dataType: 'enum', enums: ['BOGO'] },
                { dataType: 'enum', enums: ['BULK'] },
              ],
            },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DiscountController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/discounts/:discountId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DiscountController),
    ...fetchMiddlewares<RequestHandler>(DiscountController.prototype.update),

    async function DiscountController_update(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        discountId: { in: 'path', name: 'discountId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            productIds: { dataType: 'array', array: { dataType: 'integer' } },
            minQty: { dataType: 'integer' },
            description: { dataType: 'string' },
            endDate: { dataType: 'string' },
            startDate: { dataType: 'string' },
            isStoreWide: { dataType: 'boolean' },
            isActive: { dataType: 'boolean' },
            amount: { dataType: 'integer' },
            type: {
              dataType: 'union',
              subSchemas: [
                { dataType: 'enum', enums: ['PERCENTAGE'] },
                { dataType: 'enum', enums: ['FIXED'] },
                { dataType: 'enum', enums: ['BOGO'] },
                { dataType: 'enum', enums: ['BULK'] },
              ],
            },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DiscountController();

        await templateService.apiHandler({
          methodName: 'update',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/discounts/:discountId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DiscountController),
    ...fetchMiddlewares<RequestHandler>(DiscountController.prototype.delete),

    async function DiscountController_delete(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        discountId: { in: 'path', name: 'discountId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DiscountController();

        await templateService.apiHandler({
          methodName: 'delete',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/dashboard/overview',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DashboardController),
    ...fetchMiddlewares<RequestHandler>(DashboardController.prototype.getOverview),

    async function DashboardController_getOverview(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DashboardController();

        await templateService.apiHandler({
          methodName: 'getOverview',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/dashboard/top-products',
    ...fetchMiddlewares<RequestHandler>(DashboardController),
    ...fetchMiddlewares<RequestHandler>(DashboardController.prototype.listTopProducts),

    async function DashboardController_listTopProducts(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DashboardController();

        await templateService.apiHandler({
          methodName: 'listTopProducts',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/dashboard/sales-trends',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DashboardController),
    ...fetchMiddlewares<RequestHandler>(DashboardController.prototype.getSalesTrend),

    async function DashboardController_getSalesTrend(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DashboardController();

        await templateService.apiHandler({
          methodName: 'getSalesTrend',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/dashboard/orders-status',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DashboardController),
    ...fetchMiddlewares<RequestHandler>(DashboardController.prototype.getOrderStatus),

    async function DashboardController_getOrderStatus(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DashboardController();

        await templateService.apiHandler({
          methodName: 'getOrderStatus',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/dashboard/inventory-status',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DashboardController),
    ...fetchMiddlewares<RequestHandler>(DashboardController.prototype.getInventoryStatus),

    async function DashboardController_getInventoryStatus(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DashboardController();

        await templateService.apiHandler({
          methodName: 'getInventoryStatus',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/dashboard/customers-feedback',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DashboardController),
    ...fetchMiddlewares<RequestHandler>(DashboardController.prototype.listCustomersFeedback),

    async function DashboardController_listCustomersFeedback(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DashboardController();

        await templateService.apiHandler({
          methodName: 'listCustomersFeedback',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/dashboard/top-customers',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(DashboardController),
    ...fetchMiddlewares<RequestHandler>(DashboardController.prototype.listTopCustomers),

    async function DashboardController_listTopCustomers(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new DashboardController();

        await templateService.apiHandler({
          methodName: 'listTopCustomers',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/colors/:colorId',
    ...fetchMiddlewares<RequestHandler>(ColorController),
    ...fetchMiddlewares<RequestHandler>(ColorController.prototype.get),

    async function ColorController_get(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        colorId: { in: 'path', name: 'colorId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ColorController();

        await templateService.apiHandler({
          methodName: 'get',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/colors',
    ...fetchMiddlewares<RequestHandler>(ColorController),
    ...fetchMiddlewares<RequestHandler>(ColorController.prototype.lists),

    async function ColorController_lists(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ColorController();

        await templateService.apiHandler({
          methodName: 'lists',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/colors',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ColorController),
    ...fetchMiddlewares<RequestHandler>(ColorController.prototype.create),

    async function ColorController_create(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            enName: { dataType: 'string' },
            arName: { dataType: 'string' },
            code: { dataType: 'string' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ColorController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/colors/:colorId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ColorController),
    ...fetchMiddlewares<RequestHandler>(ColorController.prototype.update),

    async function ColorController_update(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        colorId: { in: 'path', name: 'colorId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            enName: { dataType: 'string' },
            arName: { dataType: 'string' },
            code: { dataType: 'string' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ColorController();

        await templateService.apiHandler({
          methodName: 'update',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/colors/:colorId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(ColorController),
    ...fetchMiddlewares<RequestHandler>(ColorController.prototype.delete),

    async function ColorController_delete(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        colorId: { in: 'path', name: 'colorId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new ColorController();

        await templateService.apiHandler({
          methodName: 'delete',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/categories/:categoryId',
    ...fetchMiddlewares<RequestHandler>(CategoryController),
    ...fetchMiddlewares<RequestHandler>(CategoryController.prototype.get),

    async function CategoryController_get(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        categoryId: { in: 'path', name: 'categoryId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new CategoryController();

        await templateService.apiHandler({
          methodName: 'get',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/categories',
    ...fetchMiddlewares<RequestHandler>(CategoryController),
    ...fetchMiddlewares<RequestHandler>(CategoryController.prototype.list),

    async function CategoryController_list(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new CategoryController();

        await templateService.apiHandler({
          methodName: 'list',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/categories',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(CategoryController),
    ...fetchMiddlewares<RequestHandler>(CategoryController.prototype.create),

    async function CategoryController_create(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { enName: { dataType: 'string' }, arName: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new CategoryController();

        await templateService.apiHandler({
          methodName: 'create',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/categories/:categoryId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(CategoryController),
    ...fetchMiddlewares<RequestHandler>(CategoryController.prototype.update),

    async function CategoryController_update(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        categoryId: { in: 'path', name: 'categoryId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { enName: { dataType: 'string' }, arName: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new CategoryController();

        await templateService.apiHandler({
          methodName: 'update',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/categories/:categoryId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(CategoryController),
    ...fetchMiddlewares<RequestHandler>(CategoryController.prototype.delete),

    async function CategoryController_delete(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        categoryId: { in: 'path', name: 'categoryId', required: true, dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new CategoryController();

        await templateService.apiHandler({
          methodName: 'delete',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/auth/google',
    ...fetchMiddlewares<RequestHandler>(GoogleOAuthController),
    ...fetchMiddlewares<RequestHandler>(GoogleOAuthController.prototype.googleAuth),

    async function GoogleOAuthController_googleAuth(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        redirectUrl: { in: 'query', name: 'redirectUrl', dataType: 'string' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new GoogleOAuthController();

        await templateService.apiHandler({
          methodName: 'googleAuth',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/auth/google/callback',
    ...fetchMiddlewares<RequestHandler>(GoogleOAuthController),
    ...fetchMiddlewares<RequestHandler>(GoogleOAuthController.prototype.googleCallback),

    async function GoogleOAuthController_googleCallback(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new GoogleOAuthController();

        await templateService.apiHandler({
          methodName: 'googleCallback',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/auth/login',
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.login),

    async function AuthController_login(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { sign: { dataType: 'string' }, password: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'login',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/auth/register',
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.register),

    async function AuthController_register(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            password: { dataType: 'string' },
            lastName: { dataType: 'string' },
            firstName: { dataType: 'string' },
            phone: { dataType: 'string' },
            email: { dataType: 'string' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'register',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/auth/refresh',
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.refresh),

    async function AuthController_refresh(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { token: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'refresh',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/auth/verify-email',
    authenticateMiddleware([{ JWT_VERIFY: [] }]),
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.verifyEmail),

    async function AuthController_verifyEmail(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'verifyEmail',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/auth/forgot-password',
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.forgotPassword),

    async function AuthController_forgotPassword(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { redirectUrl: { dataType: 'string' }, email: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'forgotPassword',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/auth/reset-password',
    authenticateMiddleware([{ JWT_RESET: [] }]),
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.resetPassword),

    async function AuthController_resetPassword(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            confirmNewPassword: { dataType: 'string' },
            newPassword: { dataType: 'string' },
          },
        },
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'resetPassword',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.patch(
    '/api/v1/auth/change-password',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.changePassword),

    async function AuthController_changePassword(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            oldPassword: { dataType: 'string' },
            newPassword: { dataType: 'string' },
          },
        },
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'changePassword',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/auth/resend-email-verification',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(AuthController),
    ...fetchMiddlewares<RequestHandler>(AuthController.prototype.resendVerificationEmail),

    async function AuthController_resendVerificationEmail(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: { email: { dataType: 'string' } },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AuthController();

        await templateService.apiHandler({
          methodName: 'resendVerificationEmail',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    '/api/v1/addresses',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(AddressController),
    ...fetchMiddlewares<RequestHandler>(AddressController.prototype.listUserAddress),

    async function AddressController_listUserAddress(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        userId: { in: 'query', name: 'userId', required: true, dataType: 'integer' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AddressController();

        await templateService.apiHandler({
          methodName: 'listUserAddress',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    '/api/v1/addresses',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(AddressController),
    ...fetchMiddlewares<RequestHandler>(AddressController.prototype.createUserAddress),

    async function AddressController_createUserAddress(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            address: { dataType: 'string' },
            floor: { dataType: 'integer' },
            building: { dataType: 'string' },
            country: { dataType: 'string' },
            street: { dataType: 'string' },
            city: { dataType: 'string' },
            state: { dataType: 'string' },
            lastName: { dataType: 'string' },
            firstName: { dataType: 'string' },
            phone: { dataType: 'string' },
            userId: { dataType: 'integer' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AddressController();

        await templateService.apiHandler({
          methodName: 'createUserAddress',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    '/api/v1/addresses/:addressId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(AddressController),
    ...fetchMiddlewares<RequestHandler>(AddressController.prototype.updateUserAddress),

    async function AddressController_updateUserAddress(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        addressId: { in: 'path', name: 'addressId', required: true, dataType: 'string' },
        body: {
          in: 'body',
          name: 'body',
          required: true,
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            address: { dataType: 'string' },
            floor: { dataType: 'integer' },
            building: { dataType: 'string' },
            country: { dataType: 'string' },
            street: { dataType: 'string' },
            city: { dataType: 'string' },
            state: { dataType: 'string' },
            lastName: { dataType: 'string' },
            firstName: { dataType: 'string' },
            phone: { dataType: 'string' },
            userId: { dataType: 'integer' },
          },
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AddressController();

        await templateService.apiHandler({
          methodName: 'updateUserAddress',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    '/api/v1/addresses/:addressId',
    authenticateMiddleware([{ JWT_SECRET: [] }]),
    ...fetchMiddlewares<RequestHandler>(AddressController),
    ...fetchMiddlewares<RequestHandler>(AddressController.prototype.deleteUserAddress),

    async function AddressController_deleteUserAddress(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        addressId: { in: 'path', name: 'addressId', required: true, dataType: 'string' },
        userId: { in: 'query', name: 'userId', required: true, dataType: 'integer' },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new AddressController();

        await templateService.apiHandler({
          methodName: 'deleteUserAddress',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(request: any, response: any, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              expressAuthenticationRecasted(request, name, secMethod[name], response).catch(
                pushAndRethrow
              )
            );
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then(users => {
              return users[0];
            })
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              expressAuthenticationRecasted(request, name, secMethod[name], response).catch(
                pushAndRethrow
              )
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request['user'] = await Promise.any(secMethodOrPromises);

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }

        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
