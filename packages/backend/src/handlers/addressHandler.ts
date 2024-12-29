import { addressService } from '@/features';
import type { Env } from '@/types';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  AddressSchema,
  CreateAddressSchema,
  DeleteAddressSchema,
  UpdateAddressSchema,
} from '@resala/shared';

const createAddressRoute = createRoute({
  tags: ['Address'],
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateAddressSchema.shape.body,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            data: z.object(AddressSchema.shape).openapi('Address'),
          }),
        },
      },
      description: 'Address created successfully',
    },
  },
});
const updateAddressRoute = createRoute({
  tags: ['Address'],
  method: 'put',
  path: '/{id}',
  request: {
    params: UpdateAddressSchema.shape.params,
    body: {
      content: {
        'application/json': {
          schema: UpdateAddressSchema.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: AddressSchema,
          }),
        },
      },
      description: 'Address updated successfully',
    },
  },
});
const listAddressRoute = createRoute({
  tags: ['Address'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: z.array(AddressSchema),
          }),
        },
      },
      description: 'List of addresses',
    },
  },
});
const getAddressRoute = createRoute({
  tags: ['Address'],
  method: 'get',
  path: '/{id}',
  request: {
    params: UpdateAddressSchema.shape.params,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: AddressSchema,
          }),
        },
      },
      description: 'Address details',
    },
  },
});
const deleteAddressRoute = createRoute({
  tags: ['Address'],
  method: 'delete',
  path: '/{id}',
  request: {
    params: DeleteAddressSchema.shape.params,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: AddressSchema,
          }),
        },
      },
      description: 'Address deleted successfully',
    },
  },
});

const addressHandler = new OpenAPIHono<Env>()
  .openapi(createAddressRoute, async c => {
    const userId = c.var.user.id;
    const body = c.req.valid('json');
    const address = await addressService.create({ userId, ...body });
    return c.json({ data: address }, 201);
  })
  .openapi(updateAddressRoute, async c => {
    const userId = c.var.user.id;
    const addressId = c.req.param('id');
    const body = c.req.valid('json');
    const address = await addressService.update(addressId, { userId, ...body });
    return c.json({ success: true, data: address });
  })
  .openapi(listAddressRoute, async c => {
    const userId = c.var.user.id;
    const addresses = await addressService.list(userId);
    return c.json({ data: addresses });
  })
  .openapi(getAddressRoute, async c => {
    const userId = c.var.user.id;
    const addressId = c.req.param('id');
    const address = await addressService.find(addressId, { userId });
    return c.json({ data: address });
  })
  .openapi(deleteAddressRoute, async c => {
    const userId = c.var.user.id;
    const addressId = c.req.param('id');
    const address = await addressService.delete(addressId, { userId });
    return c.json({ success: true, data: address });
  });

export { addressHandler };
