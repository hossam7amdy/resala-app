import { categoryService } from '@/features';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { CategorySchema } from '@resala/shared';

const listCategoriesRoute = createRoute({
  tags: ['Category'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: z.array(CategorySchema),
          }),
        },
      },
      description: 'List of categories',
    },
  },
});
const getCategoryRoute = createRoute({
  tags: ['Category'],
  method: 'get',
  path: '/{id}',
  request: {
    params: CategorySchema.pick({ id: true }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            data: CategorySchema,
          }),
        },
      },
      description: 'Category details',
    },
  },
});

const categoryHandler = new OpenAPIHono()
  .openapi(getCategoryRoute, async c => {
    const categoryId = c.req.param('id');
    const category = await categoryService.find(categoryId);
    return c.json({ success: true, data: category });
  })
  .openapi(listCategoriesRoute, async c => {
    const categories = await categoryService.list();
    return c.json({ success: true, data: categories });
  });

export { categoryHandler };
