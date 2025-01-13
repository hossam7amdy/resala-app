import type { Env } from '@/types';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

import { AnnouncementBarSchema } from '../../application/schema/AnnouncementBarSchema';
import type { DeleteAnnouncementSection } from '../../application/use-cases/DeleteAnnouncementSection';
import { ROUTE_PATH, ROUTE_TAGS } from '../common/constants';

export class DeleteAnnouncementController {
  constructor(private _handler: DeleteAnnouncementSection) {}

  delete() {
    return new OpenAPIHono<Env>().openapi(
      createRoute({
        tags: ROUTE_TAGS,
        method: 'delete',
        path: ROUTE_PATH(true),
        request: {
          params: AnnouncementBarSchema.pick({
            id: true,
          }),
        },
        responses: {
          200: {
            description: 'Announcement section deleted',
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
        const announcement = await this._handler.execute({ id });
        return c.json({ data: announcement }, 200);
      }
    );
  }
}
