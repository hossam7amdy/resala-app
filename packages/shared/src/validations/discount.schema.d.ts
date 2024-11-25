import { z } from 'zod';

export declare const CreateDiscountSchema: z.ZodObject<
  {
    body: z.ZodEffects<
      z.ZodEffects<
        z.ZodEffects<
          z.ZodEffects<
            z.ZodEffects<
              z.ZodObject<
                {
                  type: z.ZodEnum<['PERCENTAGE', 'FIXED', 'BOGO', 'BULK']>;
                  amount: z.ZodNumber;
                  description: z.ZodOptional<z.ZodString>;
                  minQty: z.ZodOptional<z.ZodNumber>;
                  isActive: z.ZodOptional<z.ZodBoolean>;
                  isStoreWide: z.ZodOptional<z.ZodBoolean>;
                  startDate: z.ZodEffects<
                    z.ZodOptional<z.ZodDate>,
                    string | undefined,
                    Date | undefined
                  >;
                  endDate: z.ZodEffects<
                    z.ZodOptional<z.ZodDate>,
                    string | undefined,
                    Date | undefined
                  >;
                  productIds: z.ZodOptional<z.ZodArray<z.ZodNumber, 'many'>>;
                },
                'strip',
                z.ZodTypeAny,
                {
                  type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
                  amount: number;
                  description?: string | undefined;
                  minQty?: number | undefined;
                  isActive?: boolean | undefined;
                  isStoreWide?: boolean | undefined;
                  startDate?: string | undefined;
                  endDate?: string | undefined;
                  productIds?: number[] | undefined;
                },
                {
                  type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
                  amount: number;
                  description?: string | undefined;
                  minQty?: number | undefined;
                  isActive?: boolean | undefined;
                  isStoreWide?: boolean | undefined;
                  startDate?: Date | undefined;
                  endDate?: Date | undefined;
                  productIds?: number[] | undefined;
                }
              >,
              {
                type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
                amount: number;
                description?: string | undefined;
                minQty?: number | undefined;
                isActive?: boolean | undefined;
                isStoreWide?: boolean | undefined;
                startDate?: string | undefined;
                endDate?: string | undefined;
                productIds?: number[] | undefined;
              },
              {
                type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
                amount: number;
                description?: string | undefined;
                minQty?: number | undefined;
                isActive?: boolean | undefined;
                isStoreWide?: boolean | undefined;
                startDate?: Date | undefined;
                endDate?: Date | undefined;
                productIds?: number[] | undefined;
              }
            >,
            {
              type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
              amount: number;
              description?: string | undefined;
              minQty?: number | undefined;
              isActive?: boolean | undefined;
              isStoreWide?: boolean | undefined;
              startDate?: string | undefined;
              endDate?: string | undefined;
              productIds?: number[] | undefined;
            },
            {
              type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
              amount: number;
              description?: string | undefined;
              minQty?: number | undefined;
              isActive?: boolean | undefined;
              isStoreWide?: boolean | undefined;
              startDate?: Date | undefined;
              endDate?: Date | undefined;
              productIds?: number[] | undefined;
            }
          >,
          {
            type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
            amount: number;
            description?: string | undefined;
            minQty?: number | undefined;
            isActive?: boolean | undefined;
            isStoreWide?: boolean | undefined;
            startDate?: string | undefined;
            endDate?: string | undefined;
            productIds?: number[] | undefined;
          },
          {
            type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
            amount: number;
            description?: string | undefined;
            minQty?: number | undefined;
            isActive?: boolean | undefined;
            isStoreWide?: boolean | undefined;
            startDate?: Date | undefined;
            endDate?: Date | undefined;
            productIds?: number[] | undefined;
          }
        >,
        {
          type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
          amount: number;
          description?: string | undefined;
          minQty?: number | undefined;
          isActive?: boolean | undefined;
          isStoreWide?: boolean | undefined;
          startDate?: string | undefined;
          endDate?: string | undefined;
          productIds?: number[] | undefined;
        },
        {
          type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
          amount: number;
          description?: string | undefined;
          minQty?: number | undefined;
          isActive?: boolean | undefined;
          isStoreWide?: boolean | undefined;
          startDate?: Date | undefined;
          endDate?: Date | undefined;
          productIds?: number[] | undefined;
        }
      >,
      {
        type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
        amount: number;
        description?: string | undefined;
        minQty?: number | undefined;
        isActive?: boolean | undefined;
        isStoreWide?: boolean | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        productIds?: number[] | undefined;
      },
      {
        type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
        amount: number;
        description?: string | undefined;
        minQty?: number | undefined;
        isActive?: boolean | undefined;
        isStoreWide?: boolean | undefined;
        startDate?: Date | undefined;
        endDate?: Date | undefined;
        productIds?: number[] | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    body: {
      type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
      amount: number;
      description?: string | undefined;
      minQty?: number | undefined;
      isActive?: boolean | undefined;
      isStoreWide?: boolean | undefined;
      startDate?: string | undefined;
      endDate?: string | undefined;
      productIds?: number[] | undefined;
    };
  },
  {
    body: {
      type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
      amount: number;
      description?: string | undefined;
      minQty?: number | undefined;
      isActive?: boolean | undefined;
      isStoreWide?: boolean | undefined;
      startDate?: Date | undefined;
      endDate?: Date | undefined;
      productIds?: number[] | undefined;
    };
  }
>;
export declare const UpdateDiscountSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        discountId: z.ZodEffects<z.ZodNumber, string, number>;
      },
      'strip',
      z.ZodTypeAny,
      {
        discountId: string;
      },
      {
        discountId: number;
      }
    >;
    body: z.ZodEffects<
      z.ZodEffects<
        z.ZodEffects<
          z.ZodEffects<
            z.ZodEffects<
              z.ZodObject<
                {
                  type: z.ZodEnum<['PERCENTAGE', 'FIXED', 'BOGO', 'BULK']>;
                  amount: z.ZodNumber;
                  description: z.ZodOptional<z.ZodString>;
                  minQty: z.ZodOptional<z.ZodNumber>;
                  isActive: z.ZodOptional<z.ZodBoolean>;
                  isStoreWide: z.ZodOptional<z.ZodBoolean>;
                  startDate: z.ZodEffects<
                    z.ZodOptional<z.ZodDate>,
                    string | undefined,
                    Date | undefined
                  >;
                  endDate: z.ZodEffects<
                    z.ZodOptional<z.ZodDate>,
                    string | undefined,
                    Date | undefined
                  >;
                  productIds: z.ZodOptional<z.ZodArray<z.ZodNumber, 'many'>>;
                },
                'strip',
                z.ZodTypeAny,
                {
                  type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
                  amount: number;
                  description?: string | undefined;
                  minQty?: number | undefined;
                  isActive?: boolean | undefined;
                  isStoreWide?: boolean | undefined;
                  startDate?: string | undefined;
                  endDate?: string | undefined;
                  productIds?: number[] | undefined;
                },
                {
                  type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
                  amount: number;
                  description?: string | undefined;
                  minQty?: number | undefined;
                  isActive?: boolean | undefined;
                  isStoreWide?: boolean | undefined;
                  startDate?: Date | undefined;
                  endDate?: Date | undefined;
                  productIds?: number[] | undefined;
                }
              >,
              {
                type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
                amount: number;
                description?: string | undefined;
                minQty?: number | undefined;
                isActive?: boolean | undefined;
                isStoreWide?: boolean | undefined;
                startDate?: string | undefined;
                endDate?: string | undefined;
                productIds?: number[] | undefined;
              },
              {
                type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
                amount: number;
                description?: string | undefined;
                minQty?: number | undefined;
                isActive?: boolean | undefined;
                isStoreWide?: boolean | undefined;
                startDate?: Date | undefined;
                endDate?: Date | undefined;
                productIds?: number[] | undefined;
              }
            >,
            {
              type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
              amount: number;
              description?: string | undefined;
              minQty?: number | undefined;
              isActive?: boolean | undefined;
              isStoreWide?: boolean | undefined;
              startDate?: string | undefined;
              endDate?: string | undefined;
              productIds?: number[] | undefined;
            },
            {
              type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
              amount: number;
              description?: string | undefined;
              minQty?: number | undefined;
              isActive?: boolean | undefined;
              isStoreWide?: boolean | undefined;
              startDate?: Date | undefined;
              endDate?: Date | undefined;
              productIds?: number[] | undefined;
            }
          >,
          {
            type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
            amount: number;
            description?: string | undefined;
            minQty?: number | undefined;
            isActive?: boolean | undefined;
            isStoreWide?: boolean | undefined;
            startDate?: string | undefined;
            endDate?: string | undefined;
            productIds?: number[] | undefined;
          },
          {
            type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
            amount: number;
            description?: string | undefined;
            minQty?: number | undefined;
            isActive?: boolean | undefined;
            isStoreWide?: boolean | undefined;
            startDate?: Date | undefined;
            endDate?: Date | undefined;
            productIds?: number[] | undefined;
          }
        >,
        {
          type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
          amount: number;
          description?: string | undefined;
          minQty?: number | undefined;
          isActive?: boolean | undefined;
          isStoreWide?: boolean | undefined;
          startDate?: string | undefined;
          endDate?: string | undefined;
          productIds?: number[] | undefined;
        },
        {
          type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
          amount: number;
          description?: string | undefined;
          minQty?: number | undefined;
          isActive?: boolean | undefined;
          isStoreWide?: boolean | undefined;
          startDate?: Date | undefined;
          endDate?: Date | undefined;
          productIds?: number[] | undefined;
        }
      >,
      {
        type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
        amount: number;
        description?: string | undefined;
        minQty?: number | undefined;
        isActive?: boolean | undefined;
        isStoreWide?: boolean | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        productIds?: number[] | undefined;
      },
      {
        type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
        amount: number;
        description?: string | undefined;
        minQty?: number | undefined;
        isActive?: boolean | undefined;
        isStoreWide?: boolean | undefined;
        startDate?: Date | undefined;
        endDate?: Date | undefined;
        productIds?: number[] | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      discountId: string;
    };
    body: {
      type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
      amount: number;
      description?: string | undefined;
      minQty?: number | undefined;
      isActive?: boolean | undefined;
      isStoreWide?: boolean | undefined;
      startDate?: string | undefined;
      endDate?: string | undefined;
      productIds?: number[] | undefined;
    };
  },
  {
    params: {
      discountId: number;
    };
    body: {
      type: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK';
      amount: number;
      description?: string | undefined;
      minQty?: number | undefined;
      isActive?: boolean | undefined;
      isStoreWide?: boolean | undefined;
      startDate?: Date | undefined;
      endDate?: Date | undefined;
      productIds?: number[] | undefined;
    };
  }
>;
export declare const DeleteDiscountSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        discountId: z.ZodEffects<z.ZodNumber, string, number>;
      },
      'strip',
      z.ZodTypeAny,
      {
        discountId: string;
      },
      {
        discountId: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      discountId: string;
    };
  },
  {
    params: {
      discountId: number;
    };
  }
>;
export declare const ListDiscountsSchema: z.ZodObject<
  {
    query: z.ZodEffects<
      z.ZodObject<
        z.objectUtil.extendShape<
          {
            page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
          },
          {
            type: z.ZodEffects<
              z.ZodOptional<z.ZodEnum<['PERCENTAGE', 'FIXED', 'BOGO', 'BULK', '']>>,
              'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK' | undefined,
              '' | 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK' | undefined
            >;
            isActive: z.ZodEffects<
              z.ZodOptional<z.ZodString>,
              boolean | undefined,
              string | undefined
            >;
            isStoreWide: z.ZodEffects<
              z.ZodOptional<z.ZodString>,
              boolean | undefined,
              string | undefined
            >;
            startDate: z.ZodEffects<
              z.ZodOptional<z.ZodString>,
              string | undefined,
              string | undefined
            >;
            endDate: z.ZodEffects<
              z.ZodOptional<z.ZodString>,
              string | undefined,
              string | undefined
            >;
          }
        >,
        'strip',
        z.ZodTypeAny,
        {
          page?: number | undefined;
          limit?: number | undefined;
          type?: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK' | undefined;
          isActive?: boolean | undefined;
          isStoreWide?: boolean | undefined;
          startDate?: string | undefined;
          endDate?: string | undefined;
        },
        {
          page?: number | undefined;
          limit?: number | undefined;
          type?: '' | 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK' | undefined;
          isActive?: string | undefined;
          isStoreWide?: string | undefined;
          startDate?: string | undefined;
          endDate?: string | undefined;
        }
      >,
      {
        page?: number | undefined;
        limit?: number | undefined;
        type?: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK' | undefined;
        isActive?: boolean | undefined;
        isStoreWide?: boolean | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
      },
      {
        page?: number | undefined;
        limit?: number | undefined;
        type?: '' | 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK' | undefined;
        isActive?: string | undefined;
        isStoreWide?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    query: {
      page?: number | undefined;
      limit?: number | undefined;
      type?: 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK' | undefined;
      isActive?: boolean | undefined;
      isStoreWide?: boolean | undefined;
      startDate?: string | undefined;
      endDate?: string | undefined;
    };
  },
  {
    query: {
      page?: number | undefined;
      limit?: number | undefined;
      type?: '' | 'PERCENTAGE' | 'FIXED' | 'BOGO' | 'BULK' | undefined;
      isActive?: string | undefined;
      isStoreWide?: string | undefined;
      startDate?: string | undefined;
      endDate?: string | undefined;
    };
  }
>;
export declare const GetDiscountSchema: z.ZodObject<
  {
    params: z.ZodObject<
      {
        discountId: z.ZodEffects<z.ZodNumber, string, number>;
      },
      'strip',
      z.ZodTypeAny,
      {
        discountId: string;
      },
      {
        discountId: number;
      }
    >;
    query: z.ZodObject<
      {
        page: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
      },
      'strip',
      z.ZodTypeAny,
      {
        page?: number | undefined;
        limit?: number | undefined;
      },
      {
        page?: number | undefined;
        limit?: number | undefined;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    params: {
      discountId: string;
    };
    query: {
      page?: number | undefined;
      limit?: number | undefined;
    };
  },
  {
    params: {
      discountId: number;
    };
    query: {
      page?: number | undefined;
      limit?: number | undefined;
    };
  }
>;
