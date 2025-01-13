import type { Env } from '@/types';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

import { AnnouncementBarSchema } from '../../application/schema/AnnouncementBarSchema';
import type { UpdateAnnouncementSection } from '../../application/use-cases/UpdateAnnouncementSection';
import { ROUTE_PATH, ROUTE_TAGS } from '../common/constants';

export class UpdateAnnouncementController {
  constructor(private _handler: UpdateAnnouncementSection) {}

  update() {
    return new OpenAPIHono<Env>().openapi(
      createRoute({
        tags: ROUTE_TAGS,
        method: 'put',
        path: ROUTE_PATH(true),
        request: {
          params: AnnouncementBarSchema.pick({ id: true }),
          body: {
            content: {
              'application/json': {
                schema: AnnouncementBarSchema.pick({
                  name: true,
                  items: true,
                  isActive: true,
                }),
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Announcement section created',
            content: {
              'application/json': {
                schema: z.object({
                  data: AnnouncementBarSchema.pick({ id: true }),
                }),
              },
            },
          },
        },
      }),
      async c => {
        const { id } = c.req.valid('param');
        const body = c.req.valid('json');
        const announcement = await this._handler.execute({ id, ...body });
        return c.json({ data: announcement }, 200);
      }
    );
  }
}
