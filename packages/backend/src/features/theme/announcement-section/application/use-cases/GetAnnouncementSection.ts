import { NotFoundError } from '@/exceptions';

import type { IAnnouncementRepository } from '../../domain/contracts/IAnnouncementRepository';
import type { AnnouncementItemTranslation } from '../../domain/models/AnnouncementItemTranslation';
import type { AnnouncementDto } from '../dto/AnnouncementDto';

export interface IGetAnnouncementSectionDto {
  id: string;
  language: string;
  includeTranslations?: boolean;
}

export class GetAnnouncementSection {
  constructor(private announcementRepo: IAnnouncementRepository) {}

  async execute(input: IGetAnnouncementSectionDto): Promise<AnnouncementDto> {
    const announcement = await this.announcementRepo.findById(input.id);

    if (!announcement) {
      throw new NotFoundError('Announcement not found');
    }

    return {
      id: announcement.id,
      name: announcement.name,
      isActive: announcement.isActive,
      createdAt: announcement.createdAt,
      updatedAt: announcement.updatedAt,
      items: announcement.items.map(it => ({
        ...it,
        text: this._getTranslation(it.translations, input.language).text,
        translations: input.includeTranslations ? it.translations : [],
      })),
    };
  }

  private _getTranslation(translations: AnnouncementItemTranslation[], language: string) {
    const translation = translations?.find(t => t.langCode === language);

    if (!translation) {
      return translations.at(0)!;
    }

    return translation;
  }
}
