import type { Env } from '@/types';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

import { AnnouncementBarSchema } from '../../application/schema/AnnouncementBarSchema';
import type { CreateAnnouncementSection } from '../../application/use-cases/CreateAnnouncementSection';
import { ROUTE_PATH, ROUTE_TAGS } from '../common/constants';

export class CreateAnnouncementController {
  constructor(private _handler: CreateAnnouncementSection) {}

  create() {
    return new OpenAPIHono<Env>().openapi(
      createRoute({
        tags: ROUTE_TAGS,
        method: 'post',
        path: ROUTE_PATH(),
        request: {
          body: {
            content: {
              'application/json': {
                schema: AnnouncementBarSchema.pick({
                  name: true,
                  items: true,
                }),
              },
            },
          },
        },
        responses: {
          201: {
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
        const body = c.req.valid('json');
        const announcement = await this._handler.execute(body);
        return c.json({ data: announcement }, 201);
      }
    );
  }
}
