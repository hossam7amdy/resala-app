import { NotFoundError } from '@/exceptions';

import type { IAnnouncementRepository } from '../../domain/contracts/IAnnouncementRepository';
import { AnnouncementSection } from '../../domain/models/AnnouncementSection';
import type { ICreateAnnouncementDto } from './CreateAnnouncementSection';

export interface IUpdateAnnouncementDto extends ICreateAnnouncementDto {
  id: string;
  isActive: boolean;
}

export class UpdateAnnouncementSection {
  constructor(private readonly _repository: IAnnouncementRepository) {}

  async execute(request: IUpdateAnnouncementDto): Promise<void> {
    const announcement = await this._findAnnouncementSection(request.id);

    const updatedAnnouncement = new AnnouncementSection(
      announcement.id,
      request.name || announcement.name,
      request.isActive || announcement.isActive,
      request.items || announcement.items,
      announcement.createdAt,
      new Date()
    );

    await this._repository.save(updatedAnnouncement);
  }

  private async _findAnnouncementSection(id: string): Promise<AnnouncementSection> {
    const announcement = await this._repository.findById(id);

    if (!announcement) {
      throw new NotFoundError('Announcement section not found');
    }

    return announcement;
  }
}
