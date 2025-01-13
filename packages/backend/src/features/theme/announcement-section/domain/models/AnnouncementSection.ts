import { BadRequestError } from '@/exceptions';
import { cuid } from '@/utils/cuid';

import type { AnnouncementItem } from './AnnouncementItem';

export class AnnouncementSection {
  constructor(
    public id: string,
    public name: string,
    public isActive: boolean,
    public items: AnnouncementItem[],
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static create(name: string, items: AnnouncementItem[]): AnnouncementSection {
    if (items.length === 0) {
      throw new BadRequestError('At least one announcement item is required');
    }

    return new AnnouncementSection(cuid(), name, true, items, new Date(), new Date());
  }
}
