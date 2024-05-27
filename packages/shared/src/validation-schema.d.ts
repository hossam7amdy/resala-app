import { z } from 'zod';

import { ROLE } from './enums.js';

export declare const DefaultQuerySchema: z.ZodObject<
  {
    query: z.ZodObject<
      {
        page: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        limit: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        query: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
        deleted: z.ZodEffects<
          z.ZodOptional<z.ZodEnum<['true', 'false']>>,
          boolean,
          'true' | 'false' | undefined
        >;
      },
      'strip',
      z.ZodTypeAny,
      {
        query: string;
        page: number;
        limit: number;
        deleted: boolean;
      },
      {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
        deleted?: 'true' | 'false' | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    query: {
      query: string;
      page: number;
      limit: number;
      deleted: boolean;
    };
  },
  {
    query: {
      query?: string | undefined;
      page?: number | undefined;
      limit?: number | undefined;
      deleted?: 'true' | 'false' | undefined;
    };
  }
>;
export declare const LoginSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        sign: z.ZodString;
        password: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        password: string;
        sign: string;
      },
      {
        password: string;
        sign: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      password: string;
      sign: string;
    };
  },
  {
    body: {
      password: string;
      sign: string;
    };
  }
>;
export declare const RegisterSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
      },
      {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      password: string;
    };
  },
  {
    body: {
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      password: string;
    };
  }
>;
export declare const VerifyEmailSchema: z.ZodObject<
  {
    query: z.ZodObject<
      {
        email: z.ZodString;
        token: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        email: string;
        token: string;
      },
      {
        email: string;
        token: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    query: {
      email: string;
      token: string;
    };
  },
  {
    query: {
      email: string;
      token: string;
    };
  }
>;
export declare const ResetPasswordSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        email: z.ZodString;
        code: z.ZodString;
        password: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        email: string;
        code: string;
        password: string;
      },
      {
        email: string;
        code: string;
        password: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      email: string;
      code: string;
      password: string;
    };
  },
  {
    body: {
      email: string;
      code: string;
      password: string;
    };
  }
>;
export declare const ChangePasswordSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        oldPassword: z.ZodString;
        newPassword: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        oldPassword: string;
        newPassword: string;
      },
      {
        oldPassword: string;
        newPassword: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      oldPassword: string;
      newPassword: string;
    };
  },
  {
    body: {
      oldPassword: string;
      newPassword: string;
    };
  }
>;
export declare const ForgotPasswordSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        email: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        email: string;
      },
      {
        email: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      email: string;
    };
  },
  {
    body: {
      email: string;
    };
  }
>;
export declare const UpdateProfileSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        phone: string;
        firstName: string;
        lastName: string;
      },
      {
        phone: string;
        firstName: string;
        lastName: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      phone: string;
      firstName: string;
      lastName: string;
    };
  },
  {
    body: {
      phone: string;
      firstName: string;
      lastName: string;
    };
  }
>;
export declare const AdminGetUserSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        userId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        userId: number;
      },
      {
        userId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      userId: number;
    };
  },
  {
    params: {
      userId: number;
    };
  }
>;
export declare const AdminUpdateUserSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        userId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        userId: number;
      },
      {
        userId: number;
      }
    >;
    body: z.ZodObject<
      z.objectUtil.extendShape<
        {
          firstName: z.ZodString;
          lastName: z.ZodString;
          phone: z.ZodString;
        },
        {
          role: z.ZodEnum<[ROLE.ADMIN, ROLE.MODERATOR, ROLE.CUSTOMER]>;
          isVerified: z.ZodOptional<z.ZodBoolean>;
          deletedAt: z.ZodOptional<z.ZodDate>;
        }
      >,
      'strip',
      z.ZodTypeAny,
      {
        phone: string;
        firstName: string;
        lastName: string;
        role: ROLE;
        isVerified?: boolean | undefined;
        deletedAt?: Date | undefined;
      },
      {
        phone: string;
        firstName: string;
        lastName: string;
        role: ROLE;
        isVerified?: boolean | undefined;
        deletedAt?: Date | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      userId: number;
    };
    body: {
      phone: string;
      firstName: string;
      lastName: string;
      role: ROLE;
      isVerified?: boolean | undefined;
      deletedAt?: Date | undefined;
    };
  },
  {
    params: {
      userId: number;
    };
    body: {
      phone: string;
      firstName: string;
      lastName: string;
      role: ROLE;
      isVerified?: boolean | undefined;
      deletedAt?: Date | undefined;
    };
  }
>;
export declare const AdminDeleteUserSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        userId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        userId: number;
      },
      {
        userId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      userId: number;
    };
  },
  {
    params: {
      userId: number;
    };
  }
>;
export declare const CreateAddressSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        state: z.ZodString;
        city: z.ZodString;
        street: z.ZodString;
        country: z.ZodOptional<z.ZodString>;
        building: z.ZodOptional<z.ZodString>;
        floor: z.ZodOptional<z.ZodNumber>;
        address: z.ZodOptional<z.ZodString>;
      },
      'strip',
      z.ZodTypeAny,
      {
        phone: string;
        firstName: string;
        lastName: string;
        state: string;
        city: string;
        street: string;
        country?: string | undefined;
        building?: string | undefined;
        floor?: number | undefined;
        address?: string | undefined;
      },
      {
        phone: string;
        firstName: string;
        lastName: string;
        state: string;
        city: string;
        street: string;
        country?: string | undefined;
        building?: string | undefined;
        floor?: number | undefined;
        address?: string | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      phone: string;
      firstName: string;
      lastName: string;
      state: string;
      city: string;
      street: string;
      country?: string | undefined;
      building?: string | undefined;
      floor?: number | undefined;
      address?: string | undefined;
    };
  },
  {
    body: {
      phone: string;
      firstName: string;
      lastName: string;
      state: string;
      city: string;
      street: string;
      country?: string | undefined;
      building?: string | undefined;
      floor?: number | undefined;
      address?: string | undefined;
    };
  }
>;
export declare const UpdateAddressSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        addressId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        addressId: number;
      },
      {
        addressId: number;
      }
    >;
    body: z.ZodObject<
      {
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        state: z.ZodString;
        city: z.ZodString;
        street: z.ZodString;
        country: z.ZodOptional<z.ZodString>;
        building: z.ZodOptional<z.ZodString>;
        floor: z.ZodOptional<z.ZodNumber>;
        address: z.ZodOptional<z.ZodString>;
      },
      'strip',
      z.ZodTypeAny,
      {
        phone: string;
        firstName: string;
        lastName: string;
        state: string;
        city: string;
        street: string;
        country?: string | undefined;
        building?: string | undefined;
        floor?: number | undefined;
        address?: string | undefined;
      },
      {
        phone: string;
        firstName: string;
        lastName: string;
        state: string;
        city: string;
        street: string;
        country?: string | undefined;
        building?: string | undefined;
        floor?: number | undefined;
        address?: string | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      addressId: number;
    };
    body: {
      phone: string;
      firstName: string;
      lastName: string;
      state: string;
      city: string;
      street: string;
      country?: string | undefined;
      building?: string | undefined;
      floor?: number | undefined;
      address?: string | undefined;
    };
  },
  {
    params: {
      addressId: number;
    };
    body: {
      phone: string;
      firstName: string;
      lastName: string;
      state: string;
      city: string;
      street: string;
      country?: string | undefined;
      building?: string | undefined;
      floor?: number | undefined;
      address?: string | undefined;
    };
  }
>;
export declare const DeleteAddressSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        addressId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        addressId: number;
      },
      {
        addressId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      addressId: number;
    };
  },
  {
    params: {
      addressId: number;
    };
  }
>;
export declare const CreateCategorySchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        categoryId: z.ZodOptional<z.ZodNumber>;
        arName: z.ZodString;
        enName: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
      },
      {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      arName: string;
      enName: string;
      categoryId?: number | undefined;
    };
  },
  {
    body: {
      arName: string;
      enName: string;
      categoryId?: number | undefined;
    };
  }
>;
export declare const UpdateCategorySchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        categoryId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        categoryId: number;
      },
      {
        categoryId: number;
      }
    >;
    body: z.ZodObject<
      z.objectUtil.extendShape<
        {
          categoryId: z.ZodOptional<z.ZodNumber>;
          arName: z.ZodString;
          enName: z.ZodString;
        },
        {
          deletedAt: z.ZodOptional<z.ZodDate>;
        }
      >,
      'strip',
      z.ZodTypeAny,
      {
        arName: string;
        enName: string;
        deletedAt?: Date | undefined;
        categoryId?: number | undefined;
      },
      {
        arName: string;
        enName: string;
        deletedAt?: Date | undefined;
        categoryId?: number | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      categoryId: number;
    };
    body: {
      arName: string;
      enName: string;
      deletedAt?: Date | undefined;
      categoryId?: number | undefined;
    };
  },
  {
    params: {
      categoryId: number;
    };
    body: {
      arName: string;
      enName: string;
      deletedAt?: Date | undefined;
      categoryId?: number | undefined;
    };
  }
>;
export declare const GetCategorySchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        categoryId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        categoryId: number;
      },
      {
        categoryId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      categoryId: number;
    };
  },
  {
    params: {
      categoryId: number;
    };
  }
>;
export declare const DeleteCategorySchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        categoryId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        categoryId: number;
      },
      {
        categoryId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      categoryId: number;
    };
  },
  {
    params: {
      categoryId: number;
    };
  }
>;
export declare const CreateProductSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        id: z.ZodOptional<z.ZodNumber>;
        categoryId: z.ZodNumber;
        arName: z.ZodString;
        enName: z.ZodString;
        arDescription: z.ZodString;
        enDescription: z.ZodString;
        price: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        id?: number | undefined;
      },
      {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        id?: number | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      categoryId: number;
      arName: string;
      enName: string;
      arDescription: string;
      enDescription: string;
      price: number;
      id?: number | undefined;
    };
  },
  {
    body: {
      categoryId: number;
      arName: string;
      enName: string;
      arDescription: string;
      enDescription: string;
      price: number;
      id?: number | undefined;
    };
  }
>;
export declare const UpdateProductSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        productId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
      },
      {
        productId: number;
      }
    >;
    body: z.ZodObject<
      z.objectUtil.extendShape<
        {
          id: z.ZodOptional<z.ZodNumber>;
          categoryId: z.ZodNumber;
          arName: z.ZodString;
          enName: z.ZodString;
          arDescription: z.ZodString;
          enDescription: z.ZodString;
          price: z.ZodNumber;
        },
        {
          deletedAt: z.ZodOptional<z.ZodDate>;
        }
      >,
      'strip',
      z.ZodTypeAny,
      {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        deletedAt?: Date | undefined;
        id?: number | undefined;
      },
      {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        deletedAt?: Date | undefined;
        id?: number | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      productId: number;
    };
    body: {
      categoryId: number;
      arName: string;
      enName: string;
      arDescription: string;
      enDescription: string;
      price: number;
      deletedAt?: Date | undefined;
      id?: number | undefined;
    };
  },
  {
    params: {
      productId: number;
    };
    body: {
      categoryId: number;
      arName: string;
      enName: string;
      arDescription: string;
      enDescription: string;
      price: number;
      deletedAt?: Date | undefined;
      id?: number | undefined;
    };
  }
>;
export declare const DeleteProductSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        productId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
      },
      {
        productId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      productId: number;
    };
  },
  {
    params: {
      productId: number;
    };
  }
>;
export declare const GetProductImages: z.ZodObject<
  {
    params: z.ZodObject<
      {
        productId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
      },
      {
        productId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      productId: number;
    };
  },
  {
    params: {
      productId: number;
    };
  }
>;
export declare const CreateProductImageSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        productId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
      },
      {
        productId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      productId: number;
    };
  },
  {
    body: {
      productId: number;
    };
  }
>;
export declare const DeleteProductImageSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        productId: z.ZodNumber;
        imageId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
        imageId: number;
      },
      {
        productId: number;
        imageId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      productId: number;
      imageId: number;
    };
  },
  {
    params: {
      productId: number;
      imageId: number;
    };
  }
>;
export declare const CreateStockSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        productId: z.ZodNumber;
        colorId: z.ZodNumber;
        sizeId: z.ZodNumber;
        quantity: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
      },
      {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      productId: number;
      colorId: number;
      sizeId: number;
      quantity: number;
    };
  },
  {
    body: {
      productId: number;
      colorId: number;
      sizeId: number;
      quantity: number;
    };
  }
>;
export declare const UpdateStockSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        stockId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        stockId: number;
      },
      {
        stockId: number;
      }
    >;
    body: z.ZodObject<
      {
        productId: z.ZodNumber;
        colorId: z.ZodNumber;
        sizeId: z.ZodNumber;
        quantity: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
      },
      {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      stockId: number;
    };
    body: {
      productId: number;
      colorId: number;
      sizeId: number;
      quantity: number;
    };
  },
  {
    params: {
      stockId: number;
    };
    body: {
      productId: number;
      colorId: number;
      sizeId: number;
      quantity: number;
    };
  }
>;
export declare const DeleteStockSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        stockId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        stockId: number;
      },
      {
        stockId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      stockId: number;
    };
  },
  {
    params: {
      stockId: number;
    };
  }
>;
export declare const CreateColorSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        arName: z.ZodString;
        enName: z.ZodString;
        code: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        code: string;
        arName: string;
        enName: string;
      },
      {
        code: string;
        arName: string;
        enName: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      code: string;
      arName: string;
      enName: string;
    };
  },
  {
    body: {
      code: string;
      arName: string;
      enName: string;
    };
  }
>;
export declare const UpdateColorSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        colorId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        colorId: number;
      },
      {
        colorId: number;
      }
    >;
    body: z.ZodObject<
      {
        arName: z.ZodString;
        enName: z.ZodString;
        code: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        code: string;
        arName: string;
        enName: string;
      },
      {
        code: string;
        arName: string;
        enName: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      colorId: number;
    };
    body: {
      code: string;
      arName: string;
      enName: string;
    };
  },
  {
    params: {
      colorId: number;
    };
    body: {
      code: string;
      arName: string;
      enName: string;
    };
  }
>;
export declare const DeleteColorSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        colorId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        colorId: number;
      },
      {
        colorId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      colorId: number;
    };
  },
  {
    params: {
      colorId: number;
    };
  }
>;
export declare const CreateSizeSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        name: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        name: string;
      },
      {
        name: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      name: string;
    };
  },
  {
    body: {
      name: string;
    };
  }
>;
export declare const UpdateSizeSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        sizeId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        sizeId: number;
      },
      {
        sizeId: number;
      }
    >;
    body: z.ZodObject<
      {
        name: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        name: string;
      },
      {
        name: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      sizeId: number;
    };
    body: {
      name: string;
    };
  },
  {
    params: {
      sizeId: number;
    };
    body: {
      name: string;
    };
  }
>;
export declare const DeleteSizeSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        sizeId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        sizeId: number;
      },
      {
        sizeId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      sizeId: number;
    };
  },
  {
    params: {
      sizeId: number;
    };
  }
>;
export declare const CreateCartSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        stockId: z.ZodNumber;
        quantity: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        quantity: number;
        stockId: number;
      },
      {
        quantity: number;
        stockId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      quantity: number;
      stockId: number;
    };
  },
  {
    body: {
      quantity: number;
      stockId: number;
    };
  }
>;
export declare const DeleteCartSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        stockId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        stockId: number;
      },
      {
        stockId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      stockId: number;
    };
  },
  {
    params: {
      stockId: number;
    };
  }
>;
export declare const CreateWishlistSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        productId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
      },
      {
        productId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      productId: number;
    };
  },
  {
    body: {
      productId: number;
    };
  }
>;
export declare const DeleteWishlistSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        productId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        productId: number;
      },
      {
        productId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      productId: number;
    };
  },
  {
    params: {
      productId: number;
    };
  }
>;
export declare const CreateOrderSchema: z.ZodObject<
  {
    body: z.ZodObject<
      {
        paymentMethod: z.ZodEnum<['CARD', 'CASH']>;
        note: z.ZodOptional<z.ZodString>;
        addressId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        addressId: number;
        paymentMethod: 'CARD' | 'CASH';
        note?: string | undefined;
      },
      {
        addressId: number;
        paymentMethod: 'CARD' | 'CASH';
        note?: string | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      addressId: number;
      paymentMethod: 'CARD' | 'CASH';
      note?: string | undefined;
    };
  },
  {
    body: {
      addressId: number;
      paymentMethod: 'CARD' | 'CASH';
      note?: string | undefined;
    };
  }
>;
export declare const UpdateOrderStatusSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        orderId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        orderId: number;
      },
      {
        orderId: number;
      }
    >;
    body: z.ZodObject<
      {
        status: z.ZodEnum<['PENDING', 'FULFILLED']>;
      },
      'strip',
      z.ZodTypeAny,
      {
        status: 'PENDING' | 'FULFILLED';
      },
      {
        status: 'PENDING' | 'FULFILLED';
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      orderId: number;
    };
    body: {
      status: 'PENDING' | 'FULFILLED';
    };
  },
  {
    params: {
      orderId: number;
    };
    body: {
      status: 'PENDING' | 'FULFILLED';
    };
  }
>;
export declare const GetOrderSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        orderId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        orderId: number;
      },
      {
        orderId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      orderId: number;
    };
  },
  {
    params: {
      orderId: number;
    };
  }
>;
export declare const CreatePaymentSchema: z.ZodObject<
  {
    query: z.ZodObject<
      {
        hmac: z.ZodString;
      },
      'strip',
      z.ZodTypeAny,
      {
        hmac: string;
      },
      {
        hmac: string;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    query: {
      hmac: string;
    };
  },
  {
    query: {
      hmac: string;
    };
  }
>;
export declare const GetPaymentSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        paymentId: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        paymentId: number;
      },
      {
        paymentId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      paymentId: number;
    };
  },
  {
    params: {
      paymentId: number;
    };
  }
>;
