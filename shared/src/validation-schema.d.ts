import zod from 'zod';
import { ROLE } from './enums.js';
export declare const DefaultQuerySchema: zod.ZodObject<{
    query: zod.ZodObject<{
        page: zod.ZodEffects<zod.ZodOptional<zod.ZodNumber>, number, number | undefined>;
        limit: zod.ZodEffects<zod.ZodOptional<zod.ZodNumber>, number, number | undefined>;
        query: zod.ZodEffects<zod.ZodOptional<zod.ZodString>, string, string | undefined>;
        deleted: zod.ZodEffects<zod.ZodOptional<zod.ZodEnum<["true", "false"]>>, boolean, "true" | "false" | undefined>;
    }, "strip", zod.ZodTypeAny, {
        query: string;
        page: number;
        limit: number;
        deleted: boolean;
    }, {
        page?: number | undefined;
        limit?: number | undefined;
        query?: string | undefined;
        deleted?: "true" | "false" | undefined;
    }>;
}, "strip", zod.ZodTypeAny, {
    query: {
        query: string;
        page: number;
        limit: number;
        deleted: boolean;
    };
}, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        query?: string | undefined;
        deleted?: "true" | "false" | undefined;
    };
}>;
export declare const LoginSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        sign: zod.ZodString;
        password: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        password: string;
        sign: string;
    }, {
        password: string;
        sign: string;
    }>;
}, "strip", zod.ZodTypeAny, {
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
export declare const RegisterSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        firstName: zod.ZodString;
        lastName: zod.ZodString;
        phone: zod.ZodString;
        email: zod.ZodString;
        password: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
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
}, "strip", zod.ZodTypeAny, {
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
export declare const VerifyEmailSchema: zod.ZodObject<{
    query: zod.ZodObject<{
        email: zod.ZodString;
        token: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        email: string;
        token: string;
    }, {
        email: string;
        token: string;
    }>;
}, "strip", zod.ZodTypeAny, {
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
export declare const ResetPasswordSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        email: zod.ZodString;
        code: zod.ZodString;
        password: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        email: string;
        code: string;
        password: string;
    }, {
        email: string;
        code: string;
        password: string;
    }>;
}, "strip", zod.ZodTypeAny, {
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
export declare const ChangePasswordSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        oldPassword: zod.ZodString;
        newPassword: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        oldPassword: string;
        newPassword: string;
    }, {
        oldPassword: string;
        newPassword: string;
    }>;
}, "strip", zod.ZodTypeAny, {
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
export declare const ForgotPasswordSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        email: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        email: string;
    }, {
        email: string;
    }>;
}, "strip", zod.ZodTypeAny, {
    body: {
        email: string;
    };
}, {
    body: {
        email: string;
    };
}>;
export declare const UpdateProfileSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        firstName: zod.ZodString;
        lastName: zod.ZodString;
        phone: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        phone: string;
        firstName: string;
        lastName: string;
    }, {
        phone: string;
        firstName: string;
        lastName: string;
    }>;
}, "strip", zod.ZodTypeAny, {
    body: {
        phone: string;
        firstName: string;
        lastName: string;
    };
}, {
    body: {
        phone: string;
        firstName: string;
        lastName: string;
    };
}>;
export declare const AdminGetUserSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        userId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        userId: number;
    };
}, {
    params: {
        userId: number;
    };
}>;
export declare const AdminUpdateUserSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        userId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
    body: zod.ZodObject<{
        phone: zod.ZodString;
        firstName: zod.ZodString;
        lastName: zod.ZodString;
        role: zod.ZodEnum<[ROLE.ADMIN, ROLE.MODERATOR, ROLE.CUSTOMER]>;
    }, "strip", zod.ZodTypeAny, {
        phone: string;
        firstName: string;
        lastName: string;
        role: ROLE;
    }, {
        phone: string;
        firstName: string;
        lastName: string;
        role: ROLE;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        userId: number;
    };
    body: {
        phone: string;
        firstName: string;
        lastName: string;
        role: ROLE;
    };
}, {
    params: {
        userId: number;
    };
    body: {
        phone: string;
        firstName: string;
        lastName: string;
        role: ROLE;
    };
}>;
export declare const AdminDeleteUserSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        userId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        userId: number;
    }, {
        userId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        userId: number;
    };
}, {
    params: {
        userId: number;
    };
}>;
export declare const CreateAddressSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        firstName: zod.ZodString;
        lastName: zod.ZodString;
        phone: zod.ZodString;
        state: zod.ZodString;
        city: zod.ZodString;
        street: zod.ZodString;
        country: zod.ZodOptional<zod.ZodString>;
        building: zod.ZodOptional<zod.ZodString>;
        floor: zod.ZodOptional<zod.ZodNumber>;
        address: zod.ZodOptional<zod.ZodString>;
    }, "strip", zod.ZodTypeAny, {
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
}, "strip", zod.ZodTypeAny, {
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
export declare const UpdateAddressSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        addressId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        addressId: number;
    }, {
        addressId: number;
    }>;
    body: zod.ZodObject<{
        firstName: zod.ZodString;
        lastName: zod.ZodString;
        phone: zod.ZodString;
        state: zod.ZodString;
        city: zod.ZodString;
        street: zod.ZodString;
        country: zod.ZodOptional<zod.ZodString>;
        building: zod.ZodOptional<zod.ZodString>;
        floor: zod.ZodOptional<zod.ZodNumber>;
        address: zod.ZodOptional<zod.ZodString>;
    }, "strip", zod.ZodTypeAny, {
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
}, "strip", zod.ZodTypeAny, {
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
}, {
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
}>;
export declare const DeleteAddressSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        addressId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        addressId: number;
    }, {
        addressId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        addressId: number;
    };
}, {
    params: {
        addressId: number;
    };
}>;
export declare const CreateCategorySchema: zod.ZodObject<{
    body: zod.ZodObject<{
        categoryId: zod.ZodOptional<zod.ZodNumber>;
        arName: zod.ZodString;
        enName: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
    }, {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
    }>;
}, "strip", zod.ZodTypeAny, {
    body: {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
    };
}, {
    body: {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
    };
}>;
export declare const UpdateCategorySchema: zod.ZodObject<{
    params: zod.ZodObject<{
        categoryId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        categoryId: number;
    }, {
        categoryId: number;
    }>;
    body: zod.ZodObject<{
        categoryId: zod.ZodOptional<zod.ZodNumber>;
        arName: zod.ZodString;
        enName: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
    }, {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        categoryId: number;
    };
    body: {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
    };
}, {
    params: {
        categoryId: number;
    };
    body: {
        arName: string;
        enName: string;
        categoryId?: number | undefined;
    };
}>;
export declare const GetCategorySchema: zod.ZodObject<{
    params: zod.ZodObject<{
        categoryId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        categoryId: number;
    }, {
        categoryId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        categoryId: number;
    };
}, {
    params: {
        categoryId: number;
    };
}>;
export declare const DeleteCategorySchema: zod.ZodObject<{
    params: zod.ZodObject<{
        categoryId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        categoryId: number;
    }, {
        categoryId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        categoryId: number;
    };
}, {
    params: {
        categoryId: number;
    };
}>;
export declare const CreateProductSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodNumber>;
        categoryId: zod.ZodNumber;
        arName: zod.ZodString;
        enName: zod.ZodString;
        arDescription: zod.ZodString;
        enDescription: zod.ZodString;
        price: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        id?: number | undefined;
    }, {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        id?: number | undefined;
    }>;
}, "strip", zod.ZodTypeAny, {
    body: {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        id?: number | undefined;
    };
}, {
    body: {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        id?: number | undefined;
    };
}>;
export declare const UpdateProductSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        productId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
    body: zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodNumber>;
        categoryId: zod.ZodNumber;
        arName: zod.ZodString;
        enName: zod.ZodString;
        arDescription: zod.ZodString;
        enDescription: zod.ZodString;
        price: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        id?: number | undefined;
    }, {
        categoryId: number;
        arName: string;
        enName: string;
        arDescription: string;
        enDescription: string;
        price: number;
        id?: number | undefined;
    }>;
}, "strip", zod.ZodTypeAny, {
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
        id?: number | undefined;
    };
}, {
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
        id?: number | undefined;
    };
}>;
export declare const DeleteProductSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        productId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        productId: number;
    };
}, {
    params: {
        productId: number;
    };
}>;
export declare const GetProductImages: zod.ZodObject<{
    params: zod.ZodObject<{
        productId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        productId: number;
    };
}, {
    params: {
        productId: number;
    };
}>;
export declare const CreateProductImageSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        productId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    body: {
        productId: number;
    };
}, {
    body: {
        productId: number;
    };
}>;
export declare const DeleteProductImageSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        productId: zod.ZodNumber;
        imageId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        productId: number;
        imageId: number;
    }, {
        productId: number;
        imageId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        productId: number;
        imageId: number;
    };
}, {
    params: {
        productId: number;
        imageId: number;
    };
}>;
export declare const CreateStockSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        productId: zod.ZodNumber;
        colorId: zod.ZodNumber;
        sizeId: zod.ZodNumber;
        quantity: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
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
}, "strip", zod.ZodTypeAny, {
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
export declare const UpdateStockSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        stockId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        stockId: number;
    }, {
        stockId: number;
    }>;
    body: zod.ZodObject<{
        productId: zod.ZodNumber;
        colorId: zod.ZodNumber;
        sizeId: zod.ZodNumber;
        quantity: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
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
}, "strip", zod.ZodTypeAny, {
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
export declare const DeleteStockSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        stockId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        stockId: number;
    }, {
        stockId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        stockId: number;
    };
}, {
    params: {
        stockId: number;
    };
}>;
export declare const CreateColorSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        arName: zod.ZodString;
        enName: zod.ZodString;
        code: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        code: string;
        arName: string;
        enName: string;
    }, {
        code: string;
        arName: string;
        enName: string;
    }>;
}, "strip", zod.ZodTypeAny, {
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
export declare const UpdateColorSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        colorId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        colorId: number;
    }, {
        colorId: number;
    }>;
    body: zod.ZodObject<{
        arName: zod.ZodString;
        enName: zod.ZodString;
        code: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        code: string;
        arName: string;
        enName: string;
    }, {
        code: string;
        arName: string;
        enName: string;
    }>;
}, "strip", zod.ZodTypeAny, {
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
export declare const DeleteColorSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        colorId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        colorId: number;
    }, {
        colorId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        colorId: number;
    };
}, {
    params: {
        colorId: number;
    };
}>;
export declare const CreateSizeSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        name: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>;
}, "strip", zod.ZodTypeAny, {
    body: {
        name: string;
    };
}, {
    body: {
        name: string;
    };
}>;
export declare const UpdateSizeSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        sizeId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        sizeId: number;
    }, {
        sizeId: number;
    }>;
    body: zod.ZodObject<{
        name: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        name: string;
    }, {
        name: string;
    }>;
}, "strip", zod.ZodTypeAny, {
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
export declare const DeleteSizeSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        sizeId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        sizeId: number;
    }, {
        sizeId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        sizeId: number;
    };
}, {
    params: {
        sizeId: number;
    };
}>;
export declare const CreateCartSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        stockId: zod.ZodNumber;
        quantity: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        quantity: number;
        stockId: number;
    }, {
        quantity: number;
        stockId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
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
export declare const DeleteCartSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        stockId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        stockId: number;
    }, {
        stockId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        stockId: number;
    };
}, {
    params: {
        stockId: number;
    };
}>;
export declare const CreateWishlistSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        productId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    body: {
        productId: number;
    };
}, {
    body: {
        productId: number;
    };
}>;
export declare const DeleteWishlistSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        productId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        productId: number;
    }, {
        productId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        productId: number;
    };
}, {
    params: {
        productId: number;
    };
}>;
export declare const CreateOrderSchema: zod.ZodObject<{
    body: zod.ZodObject<{
        paymentMethod: zod.ZodEnum<["CARD", "CASH"]>;
        note: zod.ZodOptional<zod.ZodString>;
        addressId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        addressId: number;
        paymentMethod: "CARD" | "CASH";
        note?: string | undefined;
    }, {
        addressId: number;
        paymentMethod: "CARD" | "CASH";
        note?: string | undefined;
    }>;
}, "strip", zod.ZodTypeAny, {
    body: {
        addressId: number;
        paymentMethod: "CARD" | "CASH";
        note?: string | undefined;
    };
}, {
    body: {
        addressId: number;
        paymentMethod: "CARD" | "CASH";
        note?: string | undefined;
    };
}>;
export declare const GetOrderSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        orderId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        orderId: number;
    }, {
        orderId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        orderId: number;
    };
}, {
    params: {
        orderId: number;
    };
}>;
export declare const CreatePaymentSchema: zod.ZodObject<{
    query: zod.ZodObject<{
        hmac: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        hmac: string;
    }, {
        hmac: string;
    }>;
}, "strip", zod.ZodTypeAny, {
    query: {
        hmac: string;
    };
}, {
    query: {
        hmac: string;
    };
}>;
export declare const GetPaymentSchema: zod.ZodObject<{
    params: zod.ZodObject<{
        paymentId: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        paymentId: number;
    }, {
        paymentId: number;
    }>;
}, "strip", zod.ZodTypeAny, {
    params: {
        paymentId: number;
    };
}, {
    params: {
        paymentId: number;
    };
}>;
