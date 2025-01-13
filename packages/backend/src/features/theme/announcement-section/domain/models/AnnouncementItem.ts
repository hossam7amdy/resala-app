import { BadRequestError } from '@/exceptions';

import type { AnnouncementItemTranslation } from './AnnouncementItemTranslation';

export class AnnouncementItem {
  constructor(
    public order: number,
    public link: string | null = null,
    public translations: AnnouncementItemTranslation[]
  ) {
    if (translations.length === 0) {
      throw new BadRequestError('At least one translation is required');
    }
  }
}
