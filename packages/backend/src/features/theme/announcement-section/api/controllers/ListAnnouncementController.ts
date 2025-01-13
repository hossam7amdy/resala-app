import type { Env } from '@/types';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

import { AnnouncementBarSchema } from '../../application/schema/AnnouncementBarSchema';
import type { ListAnnouncementSections } from '../../application/use-cases/ListAnnouncementSections';
import { ROUTE_PATH, ROUTE_TAGS } from '../common/constants';

export class ListAnnouncementController {
  constructor(private _handler: ListAnnouncementSections) {}

  list() {
    return new OpenAPIHono<Env>().openapi(
      createRoute({
        tags: ROUTE_TAGS,
        method: 'get',
        path: ROUTE_PATH(),
        responses: {
          200: {
            description: 'Announcement section created',
            content: {
              'application/json': {
                schema: z.object({
                  data: AnnouncementBarSchema.array(),
                }),
              },
            },
          },
        },
      }),
      async c => {
        const language = c.req.header('Accept-Language') || 'en';
        const announcement = await this._handler.execute({ language });
        return c.json({ data: announcement }, 200);
      }
    );
  }
}
