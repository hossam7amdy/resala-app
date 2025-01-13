import type { Env } from '@/types';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

import { AnnouncementBarSchema } from '../../application/schema/AnnouncementBarSchema';
import type { GetAnnouncementSection } from '../../application/use-cases/GetAnnouncementSection';
import { ROUTE_PATH, ROUTE_TAGS } from '../common/constants';

export class GetAnnouncementController {
  constructor(private _handler: GetAnnouncementSection) {}

  get() {
    return new OpenAPIHono<Env>().openapi(
      createRoute({
        tags: ROUTE_TAGS,
        method: 'get',
        path: ROUTE_PATH(true),
        request: {
          params: AnnouncementBarSchema.pick({
            id: true,
          }),
        },
        responses: {
          200: {
            description: 'Announcement section created',
            content: {
              'application/json': {
                schema: z.object({
                  data: AnnouncementBarSchema,
                }),
              },
            },
          },
        },
      }),
      async c => {
        const { id } = c.req.valid('param');
        const language = c.req.header('Accept-Language') || 'en';
        const announcement = await this._handler.execute({ id, language });
        return c.json({ data: announcement }, 200);
      }
    );
  }
}
