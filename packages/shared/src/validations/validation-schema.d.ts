import { z } from 'zod';
export declare const OffsetPageParamsSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page?: number | undefined;
    limit?: number | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
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
export declare const GoogleLoginSchema: z.ZodObject<{
    query: z.ZodObject<{
        redirectUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        redirectUrl?: string | undefined;
    }, {
        redirectUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        redirectUrl?: string | undefined;
    };
}, {
    query: {
        redirectUrl?: string | undefined;
    };
}>;
export declare const RegisterSchema: z.ZodObject<{
    body: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        redirectUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
        redirectUrl?: string | undefined;
    }, {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
        redirectUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
        redirectUrl?: string | undefined;
    };
}, {
    body: {
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        password: string;
        redirectUrl?: string | undefined;
    };
}>;
export declare const ResendVerificationSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        redirectUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        redirectUrl?: string | undefined;
    }, {
        email: string;
        redirectUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        redirectUrl?: string | undefined;
    };
}, {
    body: {
        email: string;
        redirectUrl?: string | undefined;
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
    body: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
}, "strip", z.ZodTypeAny, {
    body: {};
}, {
    body: {};
}>;
export declare const ResetPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        newPassword: z.ZodString;
        confirmNewPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        newPassword: string;
        confirmNewPassword: string;
    }, {
        newPassword: string;
        confirmNewPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        newPassword: string;
        confirmNewPassword: string;
    };
}, {
    body: {
        newPassword: string;
        confirmNewPassword: string;
    };
}>;
export declare const ChangePasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        oldPassword: z.ZodString;
        newPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        newPassword: string;
        oldPassword: string;
    }, {
        newPassword: string;
        oldPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        newPassword: string;
        oldPassword: string;
    };
}, {
    body: {
        newPassword: string;
        oldPassword: string;
    };
}>;
export declare const ForgotPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        redirectUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        redirectUrl?: string | undefined;
    }, {
        email: string;
        redirectUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        redirectUrl?: string | undefined;
    };
}, {
    body: {
        email: string;
        redirectUrl?: string | undefined;
    };
}>;
export declare const GetUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: string;
    };
}, {
    params: {
        userId: number;
    };
}>;
export declare const ListUsersSchema: z.ZodObject<{
    query: z.ZodObject<z.objectUtil.extendShape<{
        page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, {
        search: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    }>, "strip", z.ZodTypeAny, {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
    }, {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
    };
}, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
    };
}>;
export declare const UpdateUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: number;
    }>;
    body: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodString;
        role: z.ZodOptional<z.ZodEnum<["ADMIN", "MODERATOR", "CUSTOMER"]>>;
        isVerified: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        firstName: string;
        lastName: string;
        isVerified?: boolean | undefined;
        role?: "ADMIN" | "CUSTOMER" | "MODERATOR" | undefined;
    }, {
        phone: string;
        firstName: string;
        lastName: string;
        isVerified?: boolean | undefined;
        role?: "ADMIN" | "CUSTOMER" | "MODERATOR" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: string;
    };
    body: {
        phone: string;
        firstName: string;
        lastName: string;
        isVerified?: boolean | undefined;
        role?: "ADMIN" | "CUSTOMER" | "MODERATOR" | undefined;
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
        role?: "ADMIN" | "CUSTOMER" | "MODERATOR" | undefined;
    };
}>;
export declare const DeleteUserSchema: z.ZodObject<{
    params: z.ZodObject<{
        userId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        userId: string;
    };
}, {
    params: {
        userId: number;
    };
}>;
export declare const CreateAddressSchema: z.ZodObject<{
    body: z.ZodObject<{
        userId: z.ZodNumber;
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
        userId: number;
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
        userId: number;
        state: string;
        city: string;
        street: string;
        country?: string | undefined;
        building?: string | undefined;
        floor?: number | undefined;
        address?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        phone: string;
        firstName: string;
        lastName: string;
        userId: number;
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
        userId: number;
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
    query: z.ZodObject<{
        userId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        userId: string;
    };
}, {
    query: {
        userId: number;
    };
}>;
export declare const UpdateAddressSchema: z.ZodObject<{
    params: z.ZodObject<{
        addressId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        addressId: string;
    }, {
        addressId: number;
    }>;
    body: z.ZodObject<{
        userId: z.ZodNumber;
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
        userId: number;
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
        userId: number;
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
        addressId: string;
    };
    body: {
        phone: string;
        firstName: string;
        lastName: string;
        userId: number;
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
        userId: number;
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
        addressId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        addressId: string;
    }, {
        addressId: number;
    }>;
    query: z.ZodObject<{
        userId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        addressId: string;
    };
    query: {
        userId: string;
    };
}, {
    params: {
        addressId: number;
    };
    query: {
        userId: number;
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
        categoryId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        categoryId: string;
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
        categoryId: string;
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
        categoryId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        categoryId: string;
    }, {
        categoryId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        categoryId: string;
    };
}, {
    params: {
        categoryId: number;
    };
}>;
export declare const DeleteCategorySchema: z.ZodObject<{
    params: z.ZodObject<{
        categoryId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        categoryId: string;
    }, {
        categoryId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        categoryId: string;
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
        productId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
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
        productId: string;
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
        productId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
    }, {
        productId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: string;
    };
}, {
    params: {
        productId: number;
    };
}>;
export declare const ListProductsSchema: z.ZodObject<{
    query: z.ZodObject<z.objectUtil.extendShape<{
        page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, {
        search: z.ZodOptional<z.ZodString>;
        categoryId: z.ZodOptional<z.ZodNumber>;
    }>, "strip", z.ZodTypeAny, {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        categoryId?: number | undefined;
    }, {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        categoryId?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        categoryId?: number | undefined;
    };
}, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        categoryId?: number | undefined;
    };
}>;
export declare const DeleteProductSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
    }, {
        productId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: string;
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
        stockId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        stockId: string;
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
        stockId: string;
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
        stockId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        stockId: string;
    }, {
        stockId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        stockId: string;
    };
}, {
    params: {
        stockId: number;
    };
}>;
export declare const ListStocksSchema: z.ZodObject<{
    query: z.ZodObject<z.objectUtil.extendShape<{
        page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, {
        search: z.ZodOptional<z.ZodString>;
        productId: z.ZodOptional<z.ZodNumber>;
    }>, "strip", z.ZodTypeAny, {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        productId?: number | undefined;
    }, {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        productId?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        productId?: number | undefined;
    };
}, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        productId?: number | undefined;
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
        colorId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        colorId: string;
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
        colorId: string;
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
        colorId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        colorId: string;
    }, {
        colorId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        colorId: string;
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
        sizeId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        sizeId: string;
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
        sizeId: string;
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
        sizeId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        sizeId: string;
    }, {
        sizeId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        sizeId: string;
    };
}, {
    params: {
        sizeId: number;
    };
}>;
export declare const ListImagesSchema: z.ZodObject<{
    query: z.ZodObject<{
        productId: z.ZodOptional<z.ZodNumber>;
        colorId: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        productId?: number | undefined;
        colorId?: number | undefined;
    }, {
        productId?: number | undefined;
        colorId?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        productId?: number | undefined;
        colorId?: number | undefined;
    };
}, {
    query: {
        productId?: number | undefined;
        colorId?: number | undefined;
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
export declare const UpdateImageSchema: z.ZodObject<{
    params: z.ZodObject<{
        imageId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        imageId: string;
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
        imageId: string;
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
        imageId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        imageId: string;
    }, {
        imageId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        imageId: string;
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
        stockId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        stockId: string;
    }, {
        stockId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        stockId: string;
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
        productId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
    }, {
        productId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        productId: string;
    };
}, {
    params: {
        productId: number;
    };
}>;
export declare const CreateOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        paymentMethod: z.ZodEnum<["CARD", "CASH"]>;
        note: z.ZodOptional<z.ZodString>;
        addressId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        addressId: number;
        paymentMethod: "CASH" | "CARD";
        note?: string | undefined;
    }, {
        addressId: number;
        paymentMethod: "CASH" | "CARD";
        note?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        addressId: number;
        paymentMethod: "CASH" | "CARD";
        note?: string | undefined;
    };
}, {
    body: {
        addressId: number;
        paymentMethod: "CASH" | "CARD";
        note?: string | undefined;
    };
}>;
export declare const GetOrderSchema: z.ZodObject<{
    params: z.ZodObject<{
        orderId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        orderId: string;
    }, {
        orderId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        orderId: string;
    };
}, {
    params: {
        orderId: number;
    };
}>;
export declare const ListOrdersSchema: z.ZodObject<{
    query: z.ZodObject<z.objectUtil.extendShape<{
        page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, {
        userId: z.ZodOptional<z.ZodNumber>;
        search: z.ZodOptional<z.ZodString>;
    }>, "strip", z.ZodTypeAny, {
        page?: number | undefined;
        limit?: number | undefined;
        userId?: number | undefined;
        search?: string | undefined;
    }, {
        page?: number | undefined;
        limit?: number | undefined;
        userId?: number | undefined;
        search?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        userId?: number | undefined;
        search?: string | undefined;
    };
}, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        userId?: number | undefined;
        search?: string | undefined;
    };
}>;
export declare const UpdateOrderStatusSchema: z.ZodObject<{
    params: z.ZodObject<{
        orderId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        orderId: string;
    }, {
        orderId: number;
    }>;
    body: z.ZodObject<{
        orderStatus: z.ZodEnum<["PENDING", "FULFILLED", "SHIPPED", "DELIVERED", "CANCELLED"]>;
        paymentStatus: z.ZodEnum<["UNPAID", "PAID", "FAILED", "VOIDED", "REFUNDED"]>;
    }, "strip", z.ZodTypeAny, {
        orderStatus: "PENDING" | "FULFILLED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
        paymentStatus: "UNPAID" | "PAID" | "FAILED" | "VOIDED" | "REFUNDED";
    }, {
        orderStatus: "PENDING" | "FULFILLED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
        paymentStatus: "UNPAID" | "PAID" | "FAILED" | "VOIDED" | "REFUNDED";
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        orderId: string;
    };
    body: {
        orderStatus: "PENDING" | "FULFILLED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
        paymentStatus: "UNPAID" | "PAID" | "FAILED" | "VOIDED" | "REFUNDED";
    };
}, {
    params: {
        orderId: number;
    };
    body: {
        orderStatus: "PENDING" | "FULFILLED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
        paymentStatus: "UNPAID" | "PAID" | "FAILED" | "VOIDED" | "REFUNDED";
    };
}>;
export declare const DeleteOrderSchema: z.ZodObject<{
    params: z.ZodObject<{
        orderId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        orderId: string;
    }, {
        orderId: number;
    }>;
    query: z.ZodObject<{
        userId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        orderId: string;
    };
    query: {
        userId: string;
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
        transactionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        transactionId: string;
    }, {
        transactionId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        transactionId: string;
    };
}, {
    params: {
        transactionId: string;
    };
}>;
export declare const VoidPaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        transactionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        transactionId: string;
    }, {
        transactionId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        transactionId: string;
    };
}, {
    body: {
        transactionId: string;
    };
}>;
export declare const RefundPaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        transactionId: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        transactionId: string;
        amount: number;
    }, {
        transactionId: string;
        amount: number;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        transactionId: string;
        amount: number;
    };
}, {
    body: {
        transactionId: string;
        amount: number;
    };
}>;
export declare const CreateReviewSchema: z.ZodObject<{
    body: z.ZodObject<{
        userId: z.ZodNumber;
        productId: z.ZodNumber;
        rating: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId: number;
        productId: number;
        rating: number;
        comment?: string | undefined;
    }, {
        userId: number;
        productId: number;
        rating: number;
        comment?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        userId: number;
        productId: number;
        rating: number;
        comment?: string | undefined;
    };
}, {
    body: {
        userId: number;
        productId: number;
        rating: number;
        comment?: string | undefined;
    };
}>;
export declare const GetReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        reviewId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        reviewId: string;
    }, {
        reviewId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        reviewId: string;
    };
}, {
    params: {
        reviewId: number;
    };
}>;
export declare const ListReviewsSchema: z.ZodObject<{
    query: z.ZodObject<z.objectUtil.extendShape<{
        page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, {
        productId: z.ZodOptional<z.ZodNumber>;
    }>, "strip", z.ZodTypeAny, {
        page?: number | undefined;
        limit?: number | undefined;
        productId?: number | undefined;
    }, {
        page?: number | undefined;
        limit?: number | undefined;
        productId?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        productId?: number | undefined;
    };
}, {
    query: {
        page?: number | undefined;
        limit?: number | undefined;
        productId?: number | undefined;
    };
}>;
export declare const UpdateReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        reviewId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        reviewId: string;
    }, {
        reviewId: number;
    }>;
    body: z.ZodObject<{
        userId: z.ZodNumber;
        productId: z.ZodNumber;
        rating: z.ZodNumber;
        comment: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId: number;
        productId: number;
        rating: number;
        comment?: string | undefined;
    }, {
        userId: number;
        productId: number;
        rating: number;
        comment?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        reviewId: string;
    };
    body: {
        userId: number;
        productId: number;
        rating: number;
        comment?: string | undefined;
    };
}, {
    params: {
        reviewId: number;
    };
    body: {
        userId: number;
        productId: number;
        rating: number;
        comment?: string | undefined;
    };
}>;
export declare const DeleteReviewSchema: z.ZodObject<{
    params: z.ZodObject<{
        reviewId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        reviewId: string;
    }, {
        reviewId: number;
    }>;
    query: z.ZodObject<{
        userId: z.ZodEffects<z.ZodNumber, string, number>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: number;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        reviewId: string;
    };
    query: {
        userId: string;
    };
}, {
    params: {
        reviewId: number;
    };
    query: {
        userId: number;
    };
}>;
