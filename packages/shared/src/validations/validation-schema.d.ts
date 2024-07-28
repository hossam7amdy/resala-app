import { z } from 'zod';
import { OrderStatus, PaymentMethod, PaymentStatus, Role } from '../enums/index.js';
export declare const DefaultQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        limit: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        query: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        page: number;
        limit: number;
    }, {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        query: string;
        page: number;
        limit: number;
    };
}, {
    query: {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    };
}>;
export declare const LoginSchema: z.ZodObject<{
    body: z.ZodObject<{
        sign: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        password: string;
        sign: string;
    }, {
        password: string;
        sign: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        password: string;
        sign: string;
    };
}, {
    body: {
        password: string;
        sign: string;
    };
}>;
export declare const RegisterSchema: z.ZodObject<{
    body: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
    }, {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
    };
}, {
    body: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
    };
}>;
export declare const RefreshTokenSchema: z.ZodObject<{
    body: z.ZodObject<{
        token: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token: string;
    }, {
        token: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        token: string;
    };
}, {
    body: {
        token: string;
    };
}>;
export declare const VerifyEmailSchema: z.ZodObject<{
    query: z.ZodObject<{
        email: z.ZodString;
        token: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        token: string;
    }, {
        email: string;
        token: string;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        email: string;
        token: string;
    };
}, {
    query: {
        email: string;
        token: string;
    };
}>;
export declare const ResetPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        code: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        code: string;
        password: string;
    }, {
        email: string;
        code: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        code: string;
        password: string;
    };
}, {
    body: {
        email: string;
        code: string;
        password: string;
    };
}>;
export declare const ChangePasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        oldPassword: z.ZodString;
        newPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        oldPassword: string;
        newPassword: string;
    }, {
        oldPassword: string;
        newPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        oldPassword: string;
        newPassword: string;
    };
}, {
    body: {
        oldPassword: string;
        newPassword: string;
    };
}>;
export declare const ForgotPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
    }, {
        email: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
    };
}, {
    body: {
        email: string;
    };
}>;
export declare const GetUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: number;
    };
}, {
    params: {
        userId: number;
    };
}>;
export declare const UpdateUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
    body: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        role: z.ZodOptional<z.ZodEnum<[Role.ADMIN, Role.MODERATOR, Role.CUSTOMER]>>;
        isVerified: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        firstName: string;
        lastName: string;
        isVerified?: boolean | undefined;
        role?: Role | undefined;
    }, {
        phone: string;
        firstName: string;
        lastName: string;
        isVerified?: boolean | undefined;
        role?: Role | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: number;
    };
    body: {
        phone: string;
        firstName: string;
        lastName: string;
        isVerified?: boolean | undefined;
        role?: Role | undefined;
    };
}, {
    params: {
        userId: number;
    };
    body: {
        phone: string;
        firstName: string;
        lastName: string;
        isVerified?: boolean | undefined;
        role?: Role | undefined;
    };
}>;
export declare const DeleteUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: number;
    };
}, {
    params: {
        userId: number;
    };
}>;
export declare const CreateAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
    body: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: number;
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
}, {
    params: {
        userId: number;
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
}>;
export declare const ListAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: number;
    };
}, {
    params: {
        userId: number;
    };
}>;
export declare const UpdateAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodNumber;
        addressId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: number;
        addressId: number;
    }, {
        userId: number;
        addressId: number;
    }>;
    body: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: number;
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
}, {
    params: {
        userId: number;
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
}>;
export declare const DeleteAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodNumber;
        addressId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: number;
        addressId: number;
    }, {
        userId: number;
        addressId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: number;
        addressId: number;
    };
}, {
    params: {
        userId: number;
        addressId: number;
    };
}>;
export declare const CreateCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        arName: z.ZodString;
        enName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        arName: string;
        enName: string;
    }, {
        arName: string;
        enName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        arName: string;
        enName: string;
    };
}, {
    body: {
        arName: string;
        enName: string;
    };
}>;
export declare const UpdateCategorySchema: z.ZodObject<{
    params: z.ZodObject<{
        categoryId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        categoryId: number;
    }, {
        categoryId: number;
    }>;
    body: z.ZodObject<{
        arName: z.ZodString;
        enName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        arName: string;
        enName: string;
    }, {
        arName: string;
        enName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        categoryId: number;
    };
    body: {
        arName: string;
        enName: string;
    };
}, {
    params: {
        categoryId: number;
    };
    body: {
        arName: string;
        enName: string;
    };
}>;
export declare const GetCategorySchema: z.ZodObject<{
    params: z.ZodObject<{
        categoryId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        categoryId: number;
    }, {
        categoryId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        categoryId: number;
    };
}, {
    params: {
        categoryId: number;
    };
}>;
export declare const DeleteCategorySchema: z.ZodObject<{
    params: z.ZodObject<{
        categoryId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        categoryId: number;
    }, {
        categoryId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        categoryId: number;
    };
}, {
    params: {
        categoryId: number;
    };
}>;
export declare const CreateProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        categoryId: z.ZodNumber;
        arName: z.ZodString;
        enName: z.ZodString;
        arDescription: z.ZodString;
        enDescription: z.ZodString;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        arName: string;
        enName: string;
        categoryId: number;
        arDescription: string;
        enDescription: string;
        price: number;
    }, {
        arName: string;
        enName: string;
        categoryId: number;
        arDescription: string;
        enDescription: string;
        price: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        arName: string;
        enName: string;
        categoryId: number;
        arDescription: string;
        enDescription: string;
        price: number;
    };
}, {
    body: {
        arName: string;
        enName: string;
        categoryId: number;
        arDescription: string;
        enDescription: string;
        price: number;
    };
}>;
export declare const UpdateProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
    body: z.ZodObject<{
        categoryId: z.ZodNumber;
        arName: z.ZodString;
        enName: z.ZodString;
        arDescription: z.ZodString;
        enDescription: z.ZodString;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        arName: string;
        enName: string;
        categoryId: number;
        arDescription: string;
        enDescription: string;
        price: number;
    }, {
        arName: string;
        enName: string;
        categoryId: number;
        arDescription: string;
        enDescription: string;
        price: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: number;
    };
    body: {
        arName: string;
        enName: string;
        categoryId: number;
        arDescription: string;
        enDescription: string;
        price: number;
    };
}, {
    params: {
        productId: number;
    };
    body: {
        arName: string;
        enName: string;
        categoryId: number;
        arDescription: string;
        enDescription: string;
        price: number;
    };
}>;
export declare const GetProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: number;
    };
}, {
    params: {
        productId: number;
    };
}>;
export declare const DeleteProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: number;
    };
}, {
    params: {
        productId: number;
    };
}>;
export declare const CreateStockSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodNumber;
        colorId: z.ZodNumber;
        sizeId: z.ZodNumber;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
    }, {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
    };
}, {
    body: {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
    };
}>;
export declare const UpdateStockSchema: z.ZodObject<{
    params: z.ZodObject<{
        stockId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stockId: number;
    }, {
        stockId: number;
    }>;
    body: z.ZodObject<{
        productId: z.ZodNumber;
        colorId: z.ZodNumber;
        sizeId: z.ZodNumber;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
    }, {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        stockId: number;
    };
    body: {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
    };
}, {
    params: {
        stockId: number;
    };
    body: {
        productId: number;
        colorId: number;
        sizeId: number;
        quantity: number;
    };
}>;
export declare const DeleteStockSchema: z.ZodObject<{
    params: z.ZodObject<{
        stockId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stockId: number;
    }, {
        stockId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        stockId: number;
    };
}, {
    params: {
        stockId: number;
    };
}>;
export declare const CreateColorSchema: z.ZodObject<{
    body: z.ZodObject<{
        arName: z.ZodString;
        enName: z.ZodString;
        code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        arName: string;
        enName: string;
    }, {
        code: string;
        arName: string;
        enName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        code: string;
        arName: string;
        enName: string;
    };
}, {
    body: {
        code: string;
        arName: string;
        enName: string;
    };
}>;
export declare const UpdateColorSchema: z.ZodObject<{
    params: z.ZodObject<{
        colorId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        colorId: number;
    }, {
        colorId: number;
    }>;
    body: z.ZodObject<{
        arName: z.ZodString;
        enName: z.ZodString;
        code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        arName: string;
        enName: string;
    }, {
        code: string;
        arName: string;
        enName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        colorId: number;
    };
    body: {
        code: string;
        arName: string;
        enName: string;
    };
}, {
    params: {
        colorId: number;
    };
    body: {
        code: string;
        arName: string;
        enName: string;
    };
}>;
export declare const DeleteColorSchema: z.ZodObject<{
    params: z.ZodObject<{
        colorId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        colorId: number;
    }, {
        colorId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        colorId: number;
    };
}, {
    params: {
        colorId: number;
    };
}>;
export declare const CreateSizeSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
    };
}, {
    body: {
        name: string;
    };
}>;
export declare const UpdateSizeSchema: z.ZodObject<{
    params: z.ZodObject<{
        sizeId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sizeId: number;
    }, {
        sizeId: number;
    }>;
    body: z.ZodObject<{
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        sizeId: number;
    };
    body: {
        name: string;
    };
}, {
    params: {
        sizeId: number;
    };
    body: {
        name: string;
    };
}>;
export declare const DeleteSizeSchema: z.ZodObject<{
    params: z.ZodObject<{
        sizeId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        sizeId: number;
    }, {
        sizeId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        sizeId: number;
    };
}, {
    params: {
        sizeId: number;
    };
}>;
export declare const FindImagesSchema: z.ZodObject<{
    query: z.ZodObject<{
        productId: z.ZodNumber;
        colorId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
        colorId: number;
    }, {
        productId: number;
        colorId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        productId: number;
        colorId: number;
    };
}, {
    query: {
        productId: number;
        colorId: number;
    };
}>;
export declare const CreateImageSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodNumber;
        colorId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
        colorId: number;
    }, {
        productId: number;
        colorId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        productId: number;
        colorId: number;
    };
}, {
    body: {
        productId: number;
        colorId: number;
    };
}>;
export declare const PatchImageSchema: z.ZodObject<{
    params: z.ZodObject<{
        imageId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        imageId: number;
    }, {
        imageId: number;
    }>;
    body: z.ZodObject<{
        isPrimary: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isPrimary?: boolean | undefined;
    }, {
        isPrimary?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        imageId: number;
    };
    body: {
        isPrimary?: boolean | undefined;
    };
}, {
    params: {
        imageId: number;
    };
    body: {
        isPrimary?: boolean | undefined;
    };
}>;
export declare const DeleteImageSchema: z.ZodObject<{
    params: z.ZodObject<{
        imageId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        imageId: number;
    }, {
        imageId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        imageId: number;
    };
}, {
    params: {
        imageId: number;
    };
}>;
export declare const CreateCartSchema: z.ZodObject<{
    body: z.ZodObject<{
        stockId: z.ZodNumber;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        stockId: number;
    }, {
        quantity: number;
        stockId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        quantity: number;
        stockId: number;
    };
}, {
    body: {
        quantity: number;
        stockId: number;
    };
}>;
export declare const DeleteCartSchema: z.ZodObject<{
    params: z.ZodObject<{
        stockId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stockId: number;
    }, {
        stockId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        stockId: number;
    };
}, {
    params: {
        stockId: number;
    };
}>;
export declare const CreateWishlistSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        productId: number;
    };
}, {
    body: {
        productId: number;
    };
}>;
export declare const DeleteWishlistSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: number;
    };
}, {
    params: {
        productId: number;
    };
}>;
export declare const CreateOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        paymentMethod: z.ZodEnum<[PaymentMethod.CARD, PaymentMethod.CASH]>;
        note: z.ZodOptional<z.ZodString>;
        addressId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        addressId: number;
        paymentMethod: PaymentMethod;
        note?: string | undefined;
    }, {
        addressId: number;
        paymentMethod: PaymentMethod;
        note?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        addressId: number;
        paymentMethod: PaymentMethod;
        note?: string | undefined;
    };
}, {
    body: {
        addressId: number;
        paymentMethod: PaymentMethod;
        note?: string | undefined;
    };
}>;
export declare const GetOrderSchema: z.ZodObject<{
    params: z.ZodObject<{
        orderId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        orderId: number;
    }, {
        orderId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        orderId: number;
    };
}, {
    params: {
        orderId: number;
    };
}>;
export declare const ListOrdersSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        limit: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        query: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        page: number;
        limit: number;
    }, {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        query: string;
        page: number;
        limit: number;
    };
}, {
    query: {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    };
}>;
export declare const UpdateOrderStatusSchema: z.ZodObject<{
    params: z.ZodObject<{
        orderId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        orderId: number;
    }, {
        orderId: number;
    }>;
    body: z.ZodObject<{
        orderStatus: z.ZodEnum<[OrderStatus.PENDING, OrderStatus.FULFILLED, OrderStatus.SHIPPED, OrderStatus.DELIVERED, OrderStatus.CANCELLED]>;
        paymentStatus: z.ZodEnum<[PaymentStatus.UNPAID, PaymentStatus.PAID, PaymentStatus.FAILED, PaymentStatus.VOIDED, PaymentStatus.REFUNDED]>;
    }, "strip", z.ZodTypeAny, {
        orderStatus: OrderStatus;
        paymentStatus: PaymentStatus;
    }, {
        orderStatus: OrderStatus;
        paymentStatus: PaymentStatus;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        orderId: number;
    };
    body: {
        orderStatus: OrderStatus;
        paymentStatus: PaymentStatus;
    };
}, {
    params: {
        orderId: number;
    };
    body: {
        orderStatus: OrderStatus;
        paymentStatus: PaymentStatus;
    };
}>;
export declare const DeleteOrderSchema: z.ZodObject<{
    params: z.ZodObject<{
        orderId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        orderId: number;
    }, {
        orderId: number;
    }>;
    query: z.ZodObject<{
        userId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        orderId: number;
    };
    query: {
        userId: number;
    };
}, {
    params: {
        orderId: number;
    };
    query: {
        userId: number;
    };
}>;
export declare const GetPaymentSchema: z.ZodObject<{
    params: z.ZodObject<{
        transactionId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        transactionId: number;
    }, {
        transactionId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        transactionId: number;
    };
}, {
    params: {
        transactionId: number;
    };
}>;
export declare const VoidPaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        transactionId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        transactionId: number;
    }, {
        transactionId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        transactionId: number;
    };
}, {
    body: {
        transactionId: number;
    };
}>;
export declare const RefundPaymentSchema: z.ZodObject<z.objectUtil.extendShape<{
    body: z.ZodObject<{
        transactionId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        transactionId: number;
    }, {
        transactionId: number;
    }>;
}, {
    body: z.ZodObject<{
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        amount: number;
    }, {
        amount: number;
    }>;
}>, "strip", z.ZodTypeAny, {
    body: {
        amount: number;
    };
}, {
    body: {
        amount: number;
    };
}>;
export declare const CreateReviewSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodNumber;
        rating: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        productId: number;
        rating: number;
        comment?: string | undefined;
    }, {
        productId: number;
        rating: number;
        comment?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        productId: number;
        rating: number;
        comment?: string | undefined;
    };
}, {
    body: {
        productId: number;
        rating: number;
        comment?: string | undefined;
    };
}>;
export declare const GetReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        reviewId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        reviewId: number;
    }, {
        reviewId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        reviewId: number;
    };
}, {
    params: {
        reviewId: number;
    };
}>;
export declare const ListProductReviewsSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
    query: z.ZodObject<{
        page: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        limit: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        query: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        page: number;
        limit: number;
    }, {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: number;
    };
    query: {
        query: string;
        page: number;
        limit: number;
    };
}, {
    params: {
        productId: number;
    };
    query: {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    };
}>;
export declare const ListReviewsSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        limit: z.ZodEffects<z.ZodOptional<z.ZodNumber>, number, number | undefined>;
        query: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    }, "strip", z.ZodTypeAny, {
        query: string;
        page: number;
        limit: number;
    }, {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        query: string;
        page: number;
        limit: number;
    };
}, {
    query: {
        query?: string | undefined;
        page?: number | undefined;
        limit?: number | undefined;
    };
}>;
export declare const UpdateReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        reviewId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        reviewId: number;
    }, {
        reviewId: number;
    }>;
    body: z.ZodObject<{
        productId: z.ZodNumber;
        rating: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        productId: number;
        rating: number;
        comment?: string | undefined;
    }, {
        productId: number;
        rating: number;
        comment?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        reviewId: number;
    };
    body: {
        productId: number;
        rating: number;
        comment?: string | undefined;
    };
}, {
    params: {
        reviewId: number;
    };
    body: {
        productId: number;
        rating: number;
        comment?: string | undefined;
    };
}>;
export declare const DeleteReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        reviewId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        reviewId: number;
    }, {
        reviewId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        reviewId: number;
    };
}, {
    params: {
        reviewId: number;
    };
}>;
